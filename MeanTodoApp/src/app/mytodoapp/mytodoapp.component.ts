import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable,Subscriber} from 'rxjs';
import {CrudservicesService} from '../crudservices.service';
import {Todo} from '../../models/Todos';
import { NgForm } from '@angular/forms';
import { tap, map, filter } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-mytodoapp',
  templateUrl: './mytodoapp.component.html',
  styleUrls: ['./mytodoapp.component.css']
})
export class MytodoappComponent implements OnInit {

  todos:any[];
  todo : Todo ={
    _id : '',
    name : '',
    category : '',
    dbprior : '',
    description : '',
    datetime : '',
    report : ''    

  };
  count;
  showForm: boolean = false;
  
  
  // itemPriority='Priority';
  searchtext='';    //Search Text BOx ngModel
  filterPr="select";  

  @ViewChild('todoForm') form:any;
  
  constructor(private service:CrudservicesService) {
     console.log('test');
   }
   
  
 
  //  onSubmit({ value, valid }: { value: Todo, valid: boolean }) {
  //   if (!valid) {
  //     console.log("Error: Invalid input in form");
  //   }
  //   else {

  //     // Invoke createNewCourse
  //     this.myTodoAdd(value);

  //     //Clear form
  //     this.form.reset();
  //   }
  // }


  myTodoAdd(todo)
   {
     console.log("todo "+this.todo._id);

    console.log("UserInput", todo.value);
    //  alert(todo.dbprior);
    
    if(!this.todo._id) {
      this.count=0;
      this.todo=todo.value;
    }
    else {
      this.count=1;
    }
    this.service.addItem(this.todo,this.count).subscribe (
      response => {
        // res.json(news.toPlainObject())
        // var newTodo = todo.toPlainObject();

        // alert("response todo"+response);
        this.todos.unshift(response.json());
      },
      error => {
        alert ("An unexpected error occurred");
        console.log(error);
      });
   }


   // Method for updating an existing post 
   updateExistingTodo(uTodo: Todo){
        // alert(uTodo._id);
        debugger;
        this.todo._id = uTodo._id;
        this.todo.name = uTodo.name;
        this.todo.dbprior=uTodo.dbprior;
        this.todo.report=uTodo.report;
        this.todo.category=uTodo.category;
        this.todo.description=uTodo.description; 

        var count=1;
    this.service.addItem(uTodo,count);
    // .subscribe (
    //   response => { 
    //     console.log(response.json());
    //   },
    //   error => {
    //       alert ("An unexpected error occurred");
    //       console.log(error);
    //   });

    }
   myTodoDelete(userTodo)
   {
     var todos=this.todos;
    //  alert(userTodo._id);
    //  this.service.deleteTodo(userTodo);
    //  console.log(userTodo._id);
    debugger;
    this.service.deleteTodo(userTodo._id).pipe( map(res => res.json()))
    .subscribe(data => {
    //   if(data.n == 1){
    //     for(var i = 0; i < todos.length; i++){
    //       if(todos[i]._id == userTodo._id){
    //         todos.splice(i, 1);
    //       }
    //     }
    //   }
    });
    this.todos = this.todos.filter(item => item._id != userTodo._id);
  
   }
   
   
  
     ngOnInit() {

     // By default populate all Courses....
     this.service.getItem().subscribe(
      response => {
        console.log(response.json());
        this.todos = response.json();
        // this.loaded = true;
      },
      error => {
        alert ("An unexpected error occurred");
        console.log(error);
        // this.loaded = false;
      }); 
  }
}

