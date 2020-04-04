import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliverController {
  async store(req, res) {
    const { deliveryman_id, order_id } = req.params;
    const delivery = await Delivery.findOne({
      where: {
        id: order_id,
        deliveryman_id,
        start_date: { [Op.not]: null },
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.send(404, { errors: ['Delivery not found'] });
    }

    const { filename, path } = req.file;
    const file = await File.create({ filename, path });

    delivery.update({ signature_id: file.id, end_date: new Date() });

    return res.sendStatus(202);
  }
}

export default new DeliverController();
