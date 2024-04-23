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
  /**
   * @brief this array holds all possible key values that
   * can be obtained from the user
   * @memberof AppComponent
   */
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
  /**
   * @brief this array holds the color class and key value of each
   * individual box in the 6x8 "board"
   *
   * @memberof AppComponent
   */
  boxes=[
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}],
    [{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''},{class:'empty',key:''}]
  ]

  answer: string;
  isGameOver: boolean;

  constructor(private dialog: MatDialog,){
    //creating the new equation
    const randomIndex = Math.floor(Math.random() * equations.length)
    this.answer = equations[randomIndex]
    console.log('Answer: ', this.answer),
    this.isGameOver = false
  }


  rowIndex=0;
  //#iLoveCamelCase
  currentRowIndex=0;
  /**
   * @brief handles the case when a number or character (not enter or delete) is input into one of the boxes.
   * Checks that the box is valid and empty and that the game is not over before recording the value of the key in the box.
   * @param key A key representing either a number or math symbol
   */
  regularChange(key:any){
    if(this.currentRowIndex < 8 && !this.isGameOver){
      console.log({key})
      this.boxes[this.rowIndex][this.currentRowIndex]={class:'empty',key:key};
      console.log({box:this.boxes})

      //move to next box after entering a key
      this.currentRowIndex++;
    }
  }
  /**
   * @brief Checks if the key is a backspace key, and deletes the last entered character in the boxes.
   * Makes sure the array will not go out of bounds, decrements currentRowIndex, and sets the key to empty.
   * @param key A key representing the backspace operation
   */
  deleteChange(key:any){
    console.log({key})
    if(key.toUpperCase() === 'BACKSPACE'){
      if(this.currentRowIndex > 0 && !this.isGameOver){
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
          //stop ability to keep making guesses
          this.isGameOver = true;
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
    }
  }

  //Host Listener listens to the entire window for any key clicks
  @HostListener('window:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent){
    if(!this.isGameOver){
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
  }
  @HostListener('window:keydown', ['$event'])
  onDelete(event: KeyboardEvent){
    const key = event.key
    if(key === 'Backspace'){
      this.deleteChange(key)
    }
  }



  sumbitData(){
      const answerLetterCount: Record<string, number> = {};
      for (const letter of this.answer) {
        if (!answerLetterCount[letter]) {
          answerLetterCount[letter] = 0;
        }
        answerLetterCount[letter]++;
      }

      this.boxes[this.rowIndex].forEach((item, index) => {
        const keyboardKey = this.keyboard.find(k => k.key === item.key);
        //green
        if (item.key === this.answer[index]) {
          item.class = 'green'; // for tiles
          answerLetterCount[item.key]--;
          if (keyboardKey) {
            keyboardKey.class = 'key-green'; // for keyboard keys
          }
        }
        //yellow
        else if(answerLetterCount[item.key] && answerLetterCount[item.key] > 0){
          item.class = 'yellow'; // for tiles
          answerLetterCount[item.key]--;
          if (keyboardKey && keyboardKey.class !== 'key-green') {
            keyboardKey.class = 'key-yellow'; // for keyboard keys
          }
        }
        //grey
        else{
          if(keyboardKey){
            item.class = 'grey';
            keyboardKey.class = "key-grey";
          }
        }
      });
  }

  toggleTheme(){
    document.body.classList.toggle('light-theme');
  }
}
