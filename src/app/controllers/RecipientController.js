import * as yup from 'yup';
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

    res.json({ recipient });
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      street_address: yup.string().required(),
      number: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      zip_code: yup.string().required(),
    });

    if (!schema.isValidSync(req.body)) {
      return res.send(400, { errors: ['Validation Error'] });
    }

    const { id } = await Recipient.create(req.body);

    return res.json({ recipient: id });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      street_address: yup.string().required(),
      number: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      zip_code: yup.string().required(),
    });

    if (!schema.isValidSync(req.body)) {
      return res.send(400, { errors: ['Validation Error'] });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.send(404, { errors: ['Recipient not found'] });
    }

    await Recipient.update(req.body, { where: { id } });

    return res.send(202);
  }

  async destroy(req, res) {
    res.send(501);
  }
}

export default new RecipientsController();
