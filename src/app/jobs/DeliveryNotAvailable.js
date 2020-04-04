import Mail from '../../lib/Mail';

class DeliveryNotAvailable {
  get key() {
    return 'DeliveryNotAvailable';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'delivery-not-available',
      context: {
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        address: `${delivery.recipient.street_address}, ${delivery.recipient.number} - ${delivery.recipient.city}/${delivery.recipient.state}`,
      },
    });
  }
}

export default new DeliveryNotAvailable();
