module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'restrictions',
      [
        {
          day_of_week: 0, // Sunday
          start_at: '06:00',
          end_at: '12:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          day_of_week: 1, // Monday
          start_at: '06:00',
          end_at: '20:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          day_of_week: 2, // Tuesday
          start_at: '06:00',
          end_at: '20:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          day_of_week: 3, // Wednesday
          start_at: '06:00',
          end_at: '20:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          day_of_week: 4, // Thursday
          start_at: '06:00',
          end_at: '20:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          day_of_week: 5, // Friday
          start_at: '06:00',
          end_at: '20:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          day_of_week: 6, // Saturday
          start_at: '06:00',
          end_at: '12:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
