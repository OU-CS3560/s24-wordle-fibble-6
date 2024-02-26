import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowser } from '@angular/platform-browser';
//import { AppComponent }  from './app.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports:[ 
    BrowserModule
],

  providers: [],
  bootstrap: []
})

export class AppModule { }
//platformBrowser().bootstrapModule(AppModule);