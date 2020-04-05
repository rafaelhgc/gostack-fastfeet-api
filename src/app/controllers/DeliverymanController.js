import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { q = '' } = req.query;

    const deliverymen = await Deliveryman.findAll({
      where: {
        name: {
          [Op.like]: `%${q}%`,
        },
      },
      order: ['name'],
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['filename', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'filename', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(404).send({ errors: ['Deliveryman not found'] });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!schema.isValidSync(req.body)) {
      return res.status(400).send({ errors: ['Invalid Form'] });
    }

    const existsEmail = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (existsEmail) {
      return res
        .status(400)
        .send({ errors: [`E-mail "${req.body.email}" is already in use`] });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!schema.isValidSync(req.body)) {
      return res.status(400).send({ errors: ['Invalid Form'] });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).send({ errors: ['Deliveryman not found'] });
    }

    if (deliveryman.email !== req.body.email) {
      const existsEmail = await Deliveryman.findOne({
        where: { email: req.body.email },
      });

      if (existsEmail) {
        return res
          .status(400)
          .send({ errors: [`E-mail "${req.body.email}" is already in use`] });
      }
    }

    await deliveryman.update(req.body);

    return res.sendStatus(202);
  }

  async destroy(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).send({ errors: ['Deliveryman not found'] });
    }

    await deliveryman.destroy();

    return res.sendStatus(202);
  }
}

export default new DeliverymanController();
