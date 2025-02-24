const client = require('./client.cjs');
const { createCustomers } = require('./customers.cjs');
const { createRestaurants } = require('./restaurants.cjs');
const { createReservationsTable } = require('./reservations.cjs');


const dropTables = async () => {
  try {
    //talk to the database with client.query
    await client.query(` 
      DROP TABLE IF EXISTS customers CASCADE;
      DROP TABLE IF EXISTS restaurants CASCADE;
      DROP TABLE IF EXISTS reservations CASCADE;
      `);
  } catch (err) {
    console.log(err)
  }
};

const createTables = async () => {
  try {

    await client.query(`
      CREATE TABLE restaurants (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL UNIQUE);

      CREATE TABLE customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL);
      `);

    await client.query(`
      CREATE TABLE reservations (
      id SERIAL PRIMARY KEY,
      reservation_date DATE NOT NULL,
      party_count INTEGER NOT NULL,
      restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
      customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE
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
    console.log(`CheddarsID`, Cheddars.id) // testing the id
    console.log(`creating customers`);
    const Ivy = await createCustomers('Ivy');
    const ZZTop = await createCustomers('ZZ Top');
    const Wellington = await createCustomers('Wellington');
    const Myrtle = await createCustomers('Myrtle');
    const Sally = await createCustomers('Sally');
    const Melissa = await createCustomers('Melissa');
    const Venus = await createCustomers('Venus');
    const Apollo = await createCustomers('Apollo');
    const Phil = await createCustomers('Phil');
    console.log(`CUSTOMERS CREATED`);
    console.log(`IvyID`, Ivy.id)  // testing the id
    console.log(`creating reservation`);
    await createReservationsTable('2025-4-20', 2, Cheddars.id, Ivy.id);
    await createReservationsTable('2025-4-20', 7, Houligans.id, ZZTop.id);
    await createReservationsTable('2025-4-20', 4, Outback.id, Sally.id);
    await createReservationsTable('2025-4-20', 5, Johnnys.id, Wellington.id);
    console.log(`RESERVATION CREATED`);

    console.log(`disconnecting from DB`);
    client.end();
    console.log(`DB DISCONNECTED`);


  } catch (error) {
    console.log(error);
  };[]
}
syncAndSeed();
