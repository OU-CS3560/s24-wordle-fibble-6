import { Component, HostListener } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { MatIcon} from '@angular/material/icon'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { equations } from './equations';
import { SuccessAlertDialogComponent } from './success-alert-dialog/success-alert-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  //import AppComponent here instead of declaring it
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MatSlideToggleModule,
    MatIcon,
    NgIf,
    NgFor,
    NgClass, 
    MatDialogModule
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
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}]
  ]

  answer: string

  constructor(private dialog: MatDialog,){
    //creating the new equation
    const randomIndex = Math.floor(Math.random() * equations.length)
    this.answer = equations[randomIndex]
    console.log('Answer: ', this.answer)
  }


  rowIndex=0;
  //#iLoveCamelCase
  currentRowIndex=0;

  regularChange(key:any){
    if(this.currentRowIndex < 8){
      console.log({key})
      this.boxes[this.rowIndex][this.currentRowIndex]={class:'empty',key:key};
      console.log({box:this.boxes})

      //move to next box after entering a key
      this.currentRowIndex++;
    }
  }
  
  deleteChange(key:any){
    console.log({key})
    if(key.toUpperCase() === 'BACKSPACE'){
      if(this.currentRowIndex > 0){
        this.currentRowIndex--;
        this.boxes[this.rowIndex][this.currentRowIndex] = {class: 'empty', key: ''};
      }
    }
  }

  enterChange(key:any){
    if(key.toUpperCase() === 'ENTER'){
      if(this.currentRowIndex == 8){
        this.sumbitData();
        //insert any end game screen here
        let guess = this.boxes[this.rowIndex].map((item)=>{
          return item.key
        }).join('')
        // for some reason guess is no longer holding correct value
        console.log('guess', guess)
        console.log('answer',this.answer)
        // if end of game
        if(this.answer===guess){
        // open dialog
          this.dialog.open(SuccessAlertDialogComponent, {
            data: {
              message: 'You succesfully guessed the answer!',
            },
            position: {
              top: '10px',
              right: '10px',
            },
            hasBackdrop: false,
            minWidth: '350px',
          });
        }
        this.currentRowIndex = 0;
        this.rowIndex++;
      }
      //reloads page
      //window.location.reload()
    }
  }

  //Host Listener listens to the entire window for any key clicks
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



  sumbitData(){
    let clonedGuess = this.answer;
      console.log('enter key pressed');
      if(this.currentRowIndex===8&&this.rowIndex<9){
        let guess = this.boxes[this.rowIndex].map((item)=>{
          return item.key
        }).join('')
        console.log({guess})
        //colors
        this.boxes[this.rowIndex].map((item,index)=>{
          if(item.key===this.answer[index]){
            item.class = 'green';
            clonedGuess = clonedGuess.replace(item.key,'')
          }else if(clonedGuess.includes(item.key)){
              item.class='yellow'
          }else{
            item.class='grey'
          }
        })

        console.log(this.answer)
        console.log({boxes:this.boxes})

      }


        //need to readd the button to make it better
  // toggleTheme(): void { //not working
  //   document .body.classList.toggle('light-theme');
  // }
  }
}
