import { isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Restriction from '../models/Restriction';

class CollectController {
  async store(req, res) {
    const { deliveryman_id, order_id } = req.params;
    const delivery = await Delivery.findOne({
      where: {
        id: order_id,
        deliveryman_id,
        start_date: null,
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.send(404, { errors: ['Delivery not found'] });
    }

    const now = new Date();
    const restriction = await Restriction.findOne({
      where: { day_of_week: now.getDay() },
    });

    const end_at_arr = restriction.end_at.split(':');
    const start_at_arr = restriction.start_at.split(':');

    const start_at = new Date();
    const end_at = new Date();

    start_at.setUTCHours(start_at_arr[0]);
    start_at.setUTCMinutes(start_at_arr[1]);

    end_at.setUTCHours(end_at_arr[0]);
    end_at.setUTCMinutes(end_at_arr[1]);

    now.setUTCHours(now.getHours());

    if (!isAfter(now, start_at) || !isBefore(now, end_at)) {
      return res.status(400).send({
        error: `Periodo de coleta restrito entre ${restriction.start_at} e ${restriction.end_at}`,
      });
    }

    const orderStartedToday = await Delivery.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(now), endOfDay(now)],
        },
      },
    });

    if (orderStartedToday.length >= 5) {
      return res.send(400, {
        errors: ['You can collect 5 order per day'],
      });
    }

    delivery.update({ start_date: now });

    return res.sendStatus(202);
  }
}

export default new CollectController();
