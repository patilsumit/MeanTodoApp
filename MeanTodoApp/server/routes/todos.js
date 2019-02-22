// Include the required modules
const { createTodo, getAllTodos, getTodoById ,updateTodo,deleteTodo} = require('../models/todoDB');
const express = require('express');
const Joi = require('joi'); // JSON validation

const route = express.Router();

//" /api/todos - URL"
// Route handler for get all todos
route.get('/', (req, res) => {
    // Get all todos
    getAllTodos()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to get todo\n" + err.message);
            console.log("Error: Unable to get todo\n", err);
        })
});

//API with param id
route.get('/:id', (req, res) => {
    const id = req.params.id;
    // Get the todo object using id
    getTodoById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(404);
            res.send("Error: Unable to get todo\n" + err.message);
            console.log("Error: Unable to get todo\n", err);
        })
});

/****************** END: get requests *************/

/****************** BEGIN: post requests *************/

// http://localhost/api/todo - POST - {JSON todo}
// POST API to create a new todo
route.post('/', (req, res) => {
    // Validate the todo info
    console.log("Received todo object", req.body);

    const { error } = validateCourse(req.body); //Joi

    if (error) {
        res.status(400);
        res.send(error.details[0].message); // Sending 1st error message
        console.log(error);
        return;
    }

    // Add todo to db
    createTodo(req.body) // JSON todo object
        .then((result) => {
            res.send(result); //  Send the result (new todo object) back to user
            console.log("Created a new todo: ", result.name);
        })
        .catch((err) => {
            res.status(500);
            res.send("Error: Unable to create todo\n" + err.message);
            console.log("Error: Unable to create todo\n", err);
        });
});

/****************** END: post requests *************/

/****************** BEGIN: PUT requests *************/
// Handler to update a todo using put method
route.put('/:id', (req, res) => {
    // Look up the todo. If not found return 404

    // Look up the todo. If not found return 404
    const id = req.params.id;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    // Get the todo object using id
    getTodoById(id)
        .then((result) => {
            // id is valid. Update the todo
            // Add id field to todo object
            var todo = req.body;
            
            // Validate the todo info
            const { error } = validateCourse(todo); //Joi
            todo._id = id;

            if (error) {
                res.status(400);
                res.send(error.details[0].message); // Sending 1st error message
                console.log(error);
                return;
            }
             console.log("todo-print",todo);
            // Update todo to db
            updateTodo(todo) // JSON todo object
                .then((result) => {
                    res.send(result); //  Send the result (updated todo object) back to user
                    console.log("Updated todo: ", result.name);
                })
                .catch((err) => {
                    res.status(500);
                    res.send("Error: Unable to update todo\n" + err.message);
                    console.log("Error: Unable to create todo\n", err);
                });

        })
        .catch((err) => {
            res.status(404);
            res.send("Error: Unable to get todo\n" + err.message);
            console.log("Error: Unable to get todo\n", err);
        })

});

// Handler to delete a todo using delete method
route.delete('/:id', (req, res) => {
    // Look up the todo. If not found return 404
    console.log('welcome');
    // Look up the course. If not found return 404
    var todo=req.params.id;
console.log(todo);
    deleteTodo(todo) // JSON course object
    .then((result) => {
        res.send(result); //  Send the result (updated course object) back to user
        console.log("Deleted todo: ", result.name);
    })      
    .catch((err) => {
        res.status(500);
        res.send("Error: Unable to deleted todo\n" + err.message);
        console.log("Error: Unable to create todo\n", err);
    });

});

// Validate function
function validateCourse(todo) {
    // Define schema
    const schema = {
        name: Joi.string().min(4).max(60).required(),
        description: Joi.string().min(4).max(60).required(),
        category: Joi.string().min(4).max(60).required(),
        dbprior: Joi.string().min(2).max(60).required(),
        date: Joi.date(),
        report: Joi.string().min(4).max(60).required(),
    };

    // Validate
    const result = Joi.validate(todo, schema);
  
    return result;
}

module.exports = route;
