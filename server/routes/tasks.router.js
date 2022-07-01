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

// POST request to the database
router.post('/', (req, res) => {
  const newTask = req.body;
// Command to the db as soon as the new data hits the database
  const queryText = `
      INSERT INTO "tasks" ("tasks")
      VALUES ($1);
      `;
  pool.query(queryText, [newTask.tasks])
      .then((result) => {
      res.sendStatus(201);
  })
  .catch((error) => {
      console.log( 'Error POSTing to db:', error);
      res.sendStatus(500);
  });
});

//Updates a task to show that it has been completed
router.put('/:id', (req, res) => {
  let taskId = req.params.id;
  let status = req.body.completed;
  let queryText;
  
  if(status !== true){
    queryText = 'UPDATE "tasks" SET "completed" = True WHERE "id" = $1;';
  } else {
    res.sendStatus(500);
  }
  pool.query(queryText, [taskId])
  .then((dbResponse) => {
    res.send(dbResponse);
  })
  .catch((error) =>{
    console.log(`Error in update query PUT: ${error}`);
    res.sendStatus(500);
  })
});









// export router
module.exports = router;