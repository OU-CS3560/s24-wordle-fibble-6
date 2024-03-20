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
  answer = '11+11=22';
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
    if(key == 'BACKSPACE'){
      if(this.currentRowIndex > 0){
        this.currentRowIndex = this.currentRowIndex - 1;
        this.boxes[this.rowIndex][this.currentRowIndex] = {class: '', key: ''};
      }
    }
  }


  enterChange(key:any){
    if(key == 'ENTER'){
      this.sumbitData()
      if(this.currentRowIndex == 8){
        this.currentRowIndex = 0;
        this.rowIndex = this.rowIndex + 1;
      }
      return
    }
  }

  sumbitData(){
  let clonedGuess = this.answer;
    console.log('enter key pressed');
    if(this.currentRowIndex===8&&this.rowIndex<9){
      let guess = this.boxes[this.rowIndex].map((item)=>{
        return item.key
      }).join('')
      console.log({guess})
      if(this.answer===guess){
        alert("passed")
        return
      }
      //colors
      this.boxes[this.rowIndex].map((item,index)=>{
        if(item.key===this.answer[index]){
          item.class = 'green';
          clonedGuess = clonedGuess.replace(item.key,'')
        }
      })

      this.boxes[this.rowIndex].map((item,index)=>{
        if(clonedGuess.includes(item.key)){
          item.class='yellow'
        }
      })

      this.boxes[this.rowIndex].map((item)=>{
        if(item.class===''){
        item.class='grey'
        }
      })

      console.log({boxes:this.boxes})
    }
  }
}
