import * as Yup from 'yup';
import { Op } from 'sequelize';

import Queue from '../../lib/Queue';
import DeliveryAvailable from '../jobs/DeliveryAvailable';
import DeliveryNotAvailable from '../jobs/DeliveryNotAvailable';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { q = '' } = req.query;

    const deliveries = await Delivery.findAll({
      where: {
        product: {
          [Op.like]: `%${q}%`,
        },
      },
      order: [['createdAt', 'ASC']],
      attributes: [
        'id',
        'status',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'state', 'city'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street_address',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['filename', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.sendStatus(404).send({ errors: ['Delivery not foun'] });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!schema.isValidSync(req.body)) {
      return res.status(400).send({ errors: ['Invalid Form'] });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(400).send({ errors: ['Recipient not found'] });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman) {
      return res.status(400).send({ errors: ['Deliveryman not found'] });
    }

    const delivery = await Delivery.create(req.body);

    Queue.add(DeliveryAvailable.key, {
      delivery,
      deliveryman,
      recipient,
    });

    return res.json({ delivery });
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street_address',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['filename', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.sendStatus(404).send({ errors: ['Delivery not found'] });
    }

    if (!schema.isValidSync(req.body)) {
      return res.status(400).send({ errors: ['Invalid Form'] });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(400).send({ errors: ['Recipient not found'] });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman) {
      return res.status(400).send({ errors: ['Deliveryman not found'] });
    }

    const sameDeliveryman = delivery.deliveryman.id === req.body.deliveryman_id;

    if (!sameDeliveryman) {
      Queue.add(DeliveryNotAvailable.key, { delivery });
    }

    await delivery.update(req.body);

    return res.sendStatus(202);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street_address',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
      ],
    });

    if (!delivery) {
      return res.sendStatus(404).send({ errors: ['Delivery not found'] });
    }

    const canceled_at = new Date();
    await delivery.update({ canceled_at });

    Queue.add(DeliveryNotAvailable.key, { delivery });

    return res.sendStatus(202);
  }
}

export default new DeliveryController();
