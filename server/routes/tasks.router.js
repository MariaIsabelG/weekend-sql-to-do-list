// declare variable for tools needed
const {query} = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Get all books
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks";';
    pool.query(queryText).then(result => {
// Sends back the results in an object
    res.send(result.rows);
    })
    .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
    });
  });












// export router
module.exports = router;