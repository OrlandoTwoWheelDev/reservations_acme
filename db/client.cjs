const { Client } = require('pg');

const client = new Client('postgress://orlan:FTR30@localhost:5432/acme_reservations');


module.exports = client;