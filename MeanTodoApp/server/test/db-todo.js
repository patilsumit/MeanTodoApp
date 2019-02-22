const { createTodo, getAllTodos, getTodoById ,updateTodo,deleteTodo} = require('../models/todoDB');

function createTodotest() {
    // Create a course document
    createTodo({
        name: "C++ Programming Language",
        description: "testdemo",
        category : "Books",
        priority: "High",
        report :"done"
        
    }).then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}
function testGetAllTodos() {
    getAllTodos()
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testGetTodoById() {
    var id = '5c5a7a7fed4f2c1ca31d5775';

    getTodoById(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
}

function testUpdateTodo() {
    const course = {
        _id: '5c6956764c2c322f0a5b1d1a', 
        name: "Java Programming Language",
        description: "testdemo",
        category : "Bookssharada",
        dbprior: "High",
        report :"done"
    };

     updateTodo(course)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

}
function testDeleteTodo(){
   var id="5c5a7157eb68bd19beebcf05";

   deleteTodo(id)
   .then((res) => console.log(res))
   .catch((err) => console.log(err.message));   

}
// createTodotest();
// testGetAllTodos();
// testGetTodoById();
// testUpdateTodo();
testDeleteTodo();


