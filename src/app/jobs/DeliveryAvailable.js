import Mail from '../../lib/Mail';

class DeliveryAvailable {
  get key() {
    return 'DeliveryAvailable';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega Disponível',
      template: 'delivery-available',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        address: `${recipient.street_address}, ${recipient.number} - ${recipient.city}/${recipient.state}`,
      },
    });
  }
}

export default new DeliveryAvailable();
