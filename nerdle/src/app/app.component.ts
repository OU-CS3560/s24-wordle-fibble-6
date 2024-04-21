import { Component, HostListener } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { MatIcon} from '@angular/material/icon'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { equations } from './equations';
import { SuccessAlertDialogComponent } from './success-alert-dialog/success-alert-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { KermitComponent } from './kermit-component/kermit-component.component';
import {MatButtonModule} from '@angular/material/button';


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
    MatDialogModule,
    KermitComponent,
    MatButtonModule
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
        //these console logs only for convenience. should get rid of before full deploy
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
      //check to make sure all the boxes are filled to submit
      if(this.currentRowIndex===8&&this.rowIndex<9){
        let guess = this.boxes[this.rowIndex].map((item)=>{
          return item.key
        }).join('')
        console.log({guess})

        //logic for assigning a color to a box
        const correctBoxes: number[] = [];

        //mark all boxes as green if they are exactly right; all else grey
        this.boxes[this.rowIndex].forEach((item, index) =>{
          if(item.key === this.answer[index]){
            item.class = 'green';
            clonedGuess = clonedGuess.replace(item.key,'');
            correctBoxes.push(index);
          } else{
            item.class='grey';
          }
        });

        //mark boxes that are grey after last function, but that contain a correct letter as yellow
        this.boxes[this.rowIndex].forEach((item, index) =>{
          if(
            item.class === 'grey' &&
            clonedGuess.includes(item.key) &&
            !(correctBoxes.includes(index))
          ){
            item.class = 'yellow';
            clonedGuess = clonedGuess.replace(item.key,'');
          }
        });

       
        //remove at least the answer log before full deploy
        console.log(this.answer)
        console.log({boxes:this.boxes})

      }
  }

  toggleTheme(){
    document.body.classList.toggle('light-theme');
  }
}
