/*
 * Title: The Todo model implementation
 * Description: Implements APIs for performing CRUD operations
 * on MongoDB.
 * APIs can be invoked by route handlers. 
 */

// Import mongoose module
const mongoose = require('mongoose');

// Connect to MongoDB database 'todo=db'
mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error: Unable to connect to MongoDB", err));

// Create Course Schema

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60
    },
    description: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60
    },
    category: {
        type:String,
        required:true,
        minlength:4,
        maxlength:60
    },
    dbprior :{
        type:String,
        required:true,
        minlength:2,
        maxlength:60
    },
    date: { type: Date, default: Date.now },
    report: {
        type:String,
        required:true,
        minlength:4,
        maxlength:60
    }
});

// Create a model from the Schema (Course is a model (Class))
const Todo = mongoose.model('Todo', todoSchema);

/* Get All Todos 
 * IN: None. TODO: Add filter params
 * OUT: Courses collection in JSON format
 */
async function getAllTodos() {
    try {
        const todos = await Todo.find();
        return todos;
    }
    catch (err) {
        console.log("Error: Unable to query database");
        throw err;
    }
}

/* Get Todo by ID
 * IN: id (Todo object ID)
 * OUT: Single Todo object
 */
async function getTodoById(id) {
    try {
        const todo = await Todo.findById(id);
        return todo;
    }
    catch (err) {
        console.log("Error: Unable to query database");
        throw err;
    }
}

/* Create a Todo
 * IN: Course object
 * Output: Course Object, including object id
 */
async function createTodo(todoInfo) {
    // Instantiate the Course. Here Todo represents a document object
    const todo = new Todo(todoInfo);

    // Validate and save the document
    try {
        // Use validate method to validate a document
        var result = await todo.validate(); 
        result = await todo.save();
        return result;
    }
    catch (err) {
        console.log("Error: Could not save document");
        throw err;
    }
}



/* Update a Todo by ID
 * IN: Course object, including object id
 * OUT: Updated Todo object
 */
async function updateTodo(todoInfo) {
    console.log(todoInfo._id);
    const id = todoInfo._id;
    // find the document - findById()
    try {
        debugger;
        // let todo = await Todo.findById(id);
        let todo = await Todo.findById(id);
        console.log("dbid:"+todo.id);
        if (!todo) {
            console.log("Error: Cannot find todo with ID: ", id);
            throw new Error("Todo not found");
        }

        // Modify its properties
        todo.set(todoInfo);
        var ObjectId = require('mongodb').ObjectID;
        
        // save the document - save()
        const result = await todo.save({"_id:":ObjectId(todo.id),
           "name:":todo.name,
           "description:":todo.description,
            "category:":todo.category,
            "dbprior:":todo.dbprior,
            "report":todo.report}); 
        return result;
    }
    catch(err) {
        console.log("Error: Cannot save todo with ID: ", id);
        throw err;
    }
}


/* Delete a todo by ID
 * IN: id (todo object ID)
 */
async function deleteTodo(todoInfo){
    const id = todoInfo;
    // find the document - findById()
    try {
        let todo = await Todo.findById(id);
        if (!todo) {
            console.log("Error: Cannot find todo with ID: ", id);
            throw new Error("Todo not found");
        }
         console.log("sumit-id",id);
        // Modify its properties
     
        const result = await Todo.findByIdAndRemove(id);
    
        return result;
    }
    catch(err) {
        console.log("Error: Cannot delete todo with ID: ", id);
        throw err;
    }

}

module.exports.createTodo   = createTodo;
module.exports.getAllTodos  = getAllTodos;
module.exports.getTodoById  = getTodoById;
module.exports.updateTodo   = updateTodo;
module.exports.deleteTodo   = deleteTodo;

