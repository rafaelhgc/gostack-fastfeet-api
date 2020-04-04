import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class OrderController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const { done = false } = req.query;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.send(404, { errors: ['Deliveryman not found'] });
    }

    const orders = await Delivery.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: done ? { [Op.not]: null } : null,
      },
    });

    return res.json({ orders });
  }

  async show(req, res) {
    const { deliveryman_id, order_id } = req.params;
    const delivery = await Delivery.findOne({
      where: { id: order_id, deliveryman_id, canceled_at: null },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
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
      return res.send(404, { errors: ['Delivery not found'] });
    }

    return res.json({ delivery });
  }
}

export default new OrderController();
