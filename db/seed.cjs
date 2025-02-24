const client = require('./client.cjs');
const { createCustomers } = require('./customers.cjs');
const { createRestaurants } = require('./restaurants.cjs')


const dropTables = async () => {
  try {
    //talk to the database with client.query
    await client.query(` 
      DROP TABLE IF EXISTS customers;
      DROP TABLE IF EXISTS restaurants;
      `);
  } catch (err) {
    console.log(err)
  }
};

const createTables = async () => {
  try {
    //talk to the database with client.query
    await client.query(`
      CREATE TABLE restaurants (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL UNIQUE);

      CREATE TABLE customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL
      );
      `);
  } catch (err) {
    console.log(err)
  }
};



const syncAndSeed = async () => {
  try {

    console.log(`connecting to DB`);
    client.connect();
    console.log(`DB CONNECTED`);

    console.log(`dropping tables`);
    await dropTables();
    console.log(`TABLES DROPPED`)

    console.log(`creating tables`);
    await createTables();
    console.log(`TABLES CREATED`);

    console.log(`creating restaurants`);
    const Cheddars = await createRestaurants('Cheddars');
    const Outback = await createRestaurants('Outback');
    const Houligans = await createRestaurants('Houligans');
    const Johnnys = await createRestaurants('Johnnys');
    const Paradise = await createRestaurants('Paradise');
    console.log(`RESTAURANTS CREATED`);

    console.log(`creating customers`);
    await createCustomers('Ivy');
    await createCustomers('ZZ Top');
    await createCustomers('Wellington');
    await createCustomers('Myrtle');
    await createCustomers('Sally');
    await createCustomers('Melissa');
    await createCustomers('Venus');
    await createCustomers('Apollo');
    await createCustomers('Phil');
    console.log(`CUSTOMERS CREATED`);

    console.log(`disconnecting from DB`);
    client.end();
    console.log(`DB DISCONNECTED`);


  } catch (error) {
    console.log(error);
  };[]
}
syncAndSeed();
