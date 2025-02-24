const express = require('express');
const app = express();
app.use(express.json());


app.get('./customers', async(req,res) => {
  console.log(`getting customers`);
  const allCustomers = await getAllCustomers();
});


const PORT = process.env.PORT || 3000;
app.prependOnceListener(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});