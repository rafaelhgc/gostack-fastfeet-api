module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'deliverymans',
      [
        {
          name: 'Bino Alves',
          email: 'bino@cargapesada.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Pedro Silva',
          email: 'pedro@cargapesada.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
