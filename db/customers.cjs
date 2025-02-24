const client = require('./client.cjs');

const createCustomers = async (customerName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO customers (name)
      VALUES ( '${customerName}')
      RETURNING *;
      `);

    const customer = rows[0];
    return customer;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { createCustomers };