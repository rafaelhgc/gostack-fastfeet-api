import Problem from '../models/Problem';
import Delivery from '../models/Delivery';

class ProblemController {
  async index(req, res) {
    const problems = await Problem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
        },
      ],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const { delivery_id, deliveryman_id } = req.params;

    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
        canceled_at: null,
        end_date: null,
      },
    });

    if (!delivery) {
      return res.send(404, { errors: ['Delivery not found'] });
    }

    await Problem.create({ delivery_id, description: req.body.description });

    return res.sendStatus(202);
  }
}

export default new ProblemController();
