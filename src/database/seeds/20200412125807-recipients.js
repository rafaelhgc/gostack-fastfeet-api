module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Adalberto Nunes',
          street_address: 'Rua Alphenas',
          number: 12,
          complement: '',
          state: 'MG',
          city: 'Belo Horizonte',
          zip_code: 13000000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Maria dos Anjos',
          street_address: 'Rua Julio Cesar do Nascimento',
          number: 100,
          complement: 'Bloco 1 AP 100',
          state: 'SP',
          city: 'Sumaré',
          zip_code: 13100000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Aline Silva',
          street_address: 'Rua Estrada Real',
          number: 500,
          complement: '',
          state: 'RJ',
          city: 'São Pedro',
          zip_code: 13200000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
