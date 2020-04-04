import { resolve } from 'path';
import nodemailer from 'nodemailer';
import expresshbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import MaikConfig from '../config/MailConfig';

class Mail {
  constructor() {
    const { host, port, secure, auth } = MaikConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth || null,
    });

    this.configureTemplates();
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...MaikConfig.default,
      ...message,
    });
  }

  configureTemplates() {
    const path = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: expresshbs.create({
          layoutsDir: resolve(path, 'layouts'),
          partialsDir: resolve(path, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath: path,
        extName: '.hbs',
      })
    );
  }
}

export default new Mail();
