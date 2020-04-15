import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientsController {
  async index(req, res) {
    const { q = '' } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.like]: `%${q}%`,
        },
      },
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    res.json(recipient);
  }

  async store(req, res) {
    const { id } = await Recipient.create(req.body);

    return res.json({ recipient: id });
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.send(404, { errors: ['Recipient not found'] });
    }

    await Recipient.update(req.body, { where: { id } });

    return res.send(202);
  }

  async destroy(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(404).send({ errors: ['Recipient not found'] });
    }

    await recipient.destroy();

    return res.sendStatus(202);
  }
}

export default new RecipientsController();
