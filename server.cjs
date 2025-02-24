const express = require('express');
const client = require('./db/client.cjs');
const app = express();
app.use(express.json());
client.connect();

const getAllCustomers = async () => {
  try {
    const res = await client.query('SELECT * FROM customers');
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.error('Error querying the database', err);
    return [];
  }
};

app.get('/customers', async(req, res) => {
  const allCustomers = await getAllCustomers('./customers.cjs');
  res.json({ customers: allCustomers });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
console.log(`server is running`);