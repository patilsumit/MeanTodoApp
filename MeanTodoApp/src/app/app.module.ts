import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MytodoappComponent } from './mytodoapp/mytodoapp.component';
import { environment } from '../environments/environment';
import { FilterpipePipe } from './mytodoapp/filterpipe.pipe';
import { SearchpipePipe } from './mytodoapp/searchpipe.pipe';
import {CrudservicesService} from '../app/crudservices.service';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    MytodoappComponent,
    FilterpipePipe,
    SearchpipePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { 
        path: '', 
        component: HomeComponent
      },
    ])
  
  ],
  providers: [CrudservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
