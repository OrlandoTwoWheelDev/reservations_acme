const client = require('./client.cjs');

const createRestaurants = async(restaurantName) => {
  try{
    const { rows } = await client.query(`
      INSERT INTO restaurants (name)
      VALUES ('${restaurantName}');
      `);

      const restaurant = rows[0];
      return restaurant;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { createRestaurants };