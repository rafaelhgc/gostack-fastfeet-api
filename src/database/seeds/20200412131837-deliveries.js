module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'deliveries',
      [
        {
          product: 'Nike Vapor Max 2.0',
          recipient_id: 1,
          deliveryman_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'Tênis Nike Air VaporMax Flyknit 3 Feminino',
          recipient_id: 1,
          deliveryman_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'Bola Futebol Americano Nike Vapor 24/7 Oficial',
          recipient_id: 2,
          deliveryman_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'Munhequeira Nike Dri-Fit Wrist Band (1 par)',
          recipient_id: 2,
          deliveryman_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'Gorro Nike ACG Unissex',
          recipient_id: 3,
          deliveryman_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'Óculos Nike SB Flatspot',
          recipient_id: 3,
          deliveryman_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
