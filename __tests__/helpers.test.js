// import format date function into helper.js file
const {format_date} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2022-02-23 16:12:03');
  
    expect(format_date(date)).toBe('2/23/2022');
  });