import { Component, HostListener } from '@angular/core';
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
    {key:"/",class:''},
    {key:"*",class:''},
    {key:"=",class:''},
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
  
  regularChange(key:any){
    if(this.currentRowIndex < 8){
      console.log({key})
      this.boxes[this.rowIndex][this.currentRowIndex]={class:'',key:key};
      console.log({box:this.boxes})

      //move to next box after entering a key
      this.currentRowIndex = this.currentRowIndex + 1;
    }
  }
  
  deleteChange(key:any){
    if(key == 'Backspace'){
      if(this.currentRowIndex > 0){
        this.currentRowIndex = this.currentRowIndex - 1;
        this.boxes[this.rowIndex][this.currentRowIndex] = {class: '', key: ''};
      }
    }
  }

  enterChange(key:any){
    if(key == 'Enter'){
      if(this.currentRowIndex == 8){
        this.currentRowIndex = 0;
        this.rowIndex = this.rowIndex + 1;
      }
    }
  }

  @HostListener('window:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent){
    const key = event.key
    const validKey = this.keyboard.find(k => k.key === key);


    console.log(event)
      if(event.key === 'Enter'){
        this.enterChange(event.key)
      }
      else if(validKey){
        this.regularChange(key)
      }
  }
  @HostListener('window:keydown', ['$event'])
  onDelete(event: KeyboardEvent){
    const key = event.key
    if(key === 'Backspace'){
      this.deleteChange(key)
    }
  }
}

//test omnilint
