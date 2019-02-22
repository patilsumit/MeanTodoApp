import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/Todos';

import { Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CrudservicesService {

  private myURL = '/api/todos';
  uId;
  constructor(private myHttp: Http) {

  }

  getItem() {
    return this.myHttp.get(this.myURL);
  }

  // createTodo(userTodo) {
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   //let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/application/json'})};
  //   return this.myHttp.post(this.myURL, userTodo, { headers: headers });
  // }


  // updateTodo(userTodo) {
  
  //   const headers = new Headers({});

  //   return this.myHttp.put(this.myURL + '/' + userTodo._id, JSON.stringify(userTodo), { headers: headers });

  // }
   addItem(userTodo,count){
     
    //  alert(count);
     this.uId=userTodo._id;
    //  alert("sumit"+this.uId);
      if(count==0){ 
        const headers = new Headers({ 'Content-Type': 'application/json' });
        //   //let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/application/json'})};
          return this.myHttp.post(this.myURL, userTodo, { headers: headers });
      }
      else{
        const headers = new Headers({}); 
        delete userTodo._id;
        delete userTodo.datetime;

          return this.myHttp.put(this.myURL + '/' + this.uId, userTodo, { headers: headers });
      }

   }


   deleteTodo(userTodo){
     
    //  this.uId =userTodo._id;
    //  alert("sumitid"+userTodo);
     console.log(this.myURL + '/' +  userTodo);
    
     return this.myHttp.delete(this.myURL + '/' +  userTodo);
     
   }

}
