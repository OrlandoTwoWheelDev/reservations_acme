const client = require('./client.cjs');

const createReservationsTable = async (reservationDate, party_count, restaurant_id, customer_id) => {
  try {
    const { rows } = await client.query(`
    INSERT INTO reservations (Reservation_Date, Party_count, Restaurant_id, customer_id)
      VALUES ('${reservationDate}', '${party_count}', '${restaurant_id}', '${customer_id}')
      RETURNING id;
      `);

    const reservations = rows[0];
    return reservations;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createReservationsTable };