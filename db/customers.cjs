const client = require('./client.cjs');

const createCustomers = async (customerName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO customers (name)
      VALUES ( '${customerName}')
      RETURNING id;
      `);

    const customer = rows[0];
    return customer;
  } catch (err) {
    console.log(err);
  }
}

const getAllCustomers = async() => {
  const { rows: hungryCustomers } = await client.query(`
    SELECT * FROM customers;
    `)

    return hungryCustomers;
}
module.exports = { createCustomers,
  getAllCustomers };