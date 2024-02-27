import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  //import AppComponent here instead of declaring it
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgIf,
    NgFor
  ]
})
export class AppComponent {
  keyboard=[
    {key:"1",class:''},
    {key:"2",class:''},
    {key:"3",class:''},
    {key:"4",class:''},
    {key:"5",class:''},
    {key:"6",class:''},
    {key:"7",class:''},
    {key:"8",class:''},
    {key:"9",class:''},
    {key:"0",class:''},
    {key:"+",class:''},
    {key:"-",class:''},
    {key:"=",class:''},
    {key:"/",class:''},
    {key:"*",class:''},
    {key:"BACKSPACE",class:''},
    {key:"ENTER",class:''}
  ]
  boxes=[
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}],
    [{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''},{class:'',key:''}]
  ]
  rowIndex=0;
  //#iLoveCamelCase
  currentRowIndex=0;
  handleChange(key:any){
    console.log({key})
    this.boxes[this.rowIndex][this.currentRowIndex]={class:'',key:key};
    console.log({box:this.boxes})
  }
}
