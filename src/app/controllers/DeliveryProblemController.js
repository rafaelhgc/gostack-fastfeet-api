import Problem from '../models/Problem';

class DeliveryProblemController {
  async index(req, res) {
    const { delivery_id } = req.params;
    const problems = await Problem.findAll({
      where: { delivery_id },
      attributes: ['id', 'description', 'created_at'],
    });

    return res.json({ problems });
  }
}

export default new DeliveryProblemController();
