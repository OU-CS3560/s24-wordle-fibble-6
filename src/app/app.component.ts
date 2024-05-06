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

  /**
   * @brief - places the cursor on the next line of the grid
   * @param key - a chosen key from the keyboard
   */
  enterChange(key:any){
    if(key.toUpperCase() === 'ENTER'){
      if(this.currentRowIndex == 8){
        //check if guess is valid equation
        if(this.isEquation()){

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
              title: 'Success',
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
      }else{
        //this is where a incorrect dialog would go
      }
    }
    }
    
  }

  /**
   * @brief Listens to keyEvents to detect for certain keystrokes made by the user
   * 
   * @param event - a keyboard event made by the user
   * 
   * @see enterChange
   * @see regularChange
   */
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
  /**
   * @brief -listens for delete keyboard stroke
   * @param event - keyboard event of type delete
   * @see deleteChange
   */
  @HostListener('window:keydown', ['$event'])
  onDelete(event: KeyboardEvent){
    const key = event.key
    if(key === 'Backspace'){
      this.deleteChange(key)
    }
  }
  isEquation(): boolean{
    const numbers: string[] = ["0","1","2","3","4","5","6","7","8","9"];
    const symbols: string[] = ["+","-","/","*","="];
    var index = 1;
    //integers
    var num_count = 3;
    var num1;
    var num2;
    var num3;
    var num4;
    //strings
    var symbol_count = 2;
    var symbol1;
    var symbol2;
    var symbol3;
    //checks first and last
    if(isNaN(Number(+this.boxes[this.rowIndex][0].key)) || isNaN(Number(+this.boxes[this.rowIndex][7].key))){
    return false;
    }
    //construct varibales
    //get first number and proceeding symbol
    if(numbers.includes(this.boxes[this.rowIndex][1].key)){
      if(numbers.includes(this.boxes[this.rowIndex][2].key)){
        num1 = (+this.boxes[this.rowIndex][0].key * 100) + (+this.boxes[this.rowIndex][1].key * 10) + (+this.boxes[this.rowIndex][2].key)
        //can't have numbers larger than 3 digits 
        if(numbers.includes(this.boxes[this.rowIndex][3].key)){
          return false;
        }
        symbol1 = this.boxes[this.rowIndex][3].key
        index = 4
      }else{
      num1 = (+this.boxes[this.rowIndex][0].key * 10) + (+this.boxes[this.rowIndex][1].key)
      symbol1 = this.boxes[this.rowIndex][2].key
      index = 3
      }
    }else{
      num1 = +this.boxes[this.rowIndex][0].key;
      symbol1 = this.boxes[this.rowIndex][1].key;
      index = 2
    }
    console.log(num1);
    console.log(symbol1);
    //check there are not two symbols in a row
    if(symbols.includes(this.boxes[this.rowIndex][index].key)){
      return false;
    }
    if(numbers.includes(this.boxes[this.rowIndex][index + 1].key)){
      if(numbers.includes(this.boxes[this.rowIndex][index + 2].key)){
        num2 = (+this.boxes[this.rowIndex][index].key * 100) + (+this.boxes[this.rowIndex][index + 1].key * 10) + (+this.boxes[this.rowIndex][index + 2].key)
        if(numbers.includes(this.boxes[this.rowIndex][index + 3].key)){
          return false;
        }
        symbol2 = this.boxes[this.rowIndex][index + 3].key
        index += 4
      }else{
      num2 = (+this.boxes[this.rowIndex][index].key * 10) + (+this.boxes[this.rowIndex][index + 1].key)
      symbol2 = this.boxes[this.rowIndex][index + 2].key
      index += 3
      }
    }else{
      num2 = +this.boxes[this.rowIndex][index].key;
      symbol2 = this.boxes[this.rowIndex][index + 1].key;
      index += 2
    }
    console.log(num2)
    console.log(symbol2)
    //check there are not two symbols in a row
    if(symbols.includes(this.boxes[this.rowIndex][index].key)){
      return false;
    }
    //start checking that the index has not exceeded 7
    if(index + 1 <= 7 && numbers.includes(this.boxes[this.rowIndex][index + 1].key)){
      if(index + 2 <= 7 && numbers.includes(this.boxes[this.rowIndex][index + 2].key)){
        num3 = (+this.boxes[this.rowIndex][index].key * 100) + (+this.boxes[this.rowIndex][index + 1].key * 10) + (+this.boxes[this.rowIndex][index + 2].key)
        if(index + 3 <= 7 && numbers.includes(this.boxes[this.rowIndex][index + 3].key)){
          return false
        }
        if(index + 3 <= 7){
        symbol3 = this.boxes[this.rowIndex][index + 3].key
        symbol_count++;
        }
        index += 4
      }else{
      num3 = (+this.boxes[this.rowIndex][index].key * 10) + (+this.boxes[this.rowIndex][index + 1].key)
      if(index + 2 <= 7){
      symbol3 = this.boxes[this.rowIndex][index + 2].key
      symbol_count++
      }
      index += 3
      }
    }else{
      num3 = +this.boxes[this.rowIndex][index].key
      if(index + 1 <= 7){
      symbol3 = this.boxes[this.rowIndex][index + 1].key
      symbol_count++
      }
      index += 2
    }
    console.log(num3)
    if(index <=7){
    console.log(symbol3)
    }
    //get last number if there is one
    // if there is a fourth number it is either a one or two digit number
    if(index <= 7){
      if(index == 6){
        num4 = (+this.boxes[this.rowIndex][index].key * 10) + (+this.boxes[this.rowIndex][index + 1].key)
      }else{
        num4 = (+this.boxes[this.rowIndex][index].key)
      }
      num_count++;
      console.log(num4);
    }
    //at this point all the symbols and numbers are in variables
    //check if equal sign is in the right spot then check if equation is valid
    if(symbol_count == 2){
      if(symbol2 == "=" && eval(num1.toString() + symbol1 + num2.toString()) == num3){
        return true;
      }else{
        return false;
      }
    }else if(symbol_count == 3){
      if(symbol3 == "=" && eval(num1.toString() + symbol1 + num2.toString() + symbol2 + num3.toString()) == num4){
        return true;
      }else{
        return false;
      }
    }
    return true;
  }
  /**
   * @brief - the keystrokes made and planted into the grid it submitted to be checked if it is the correct guess
   */
  sumbitData(){

      const answerLetterCount: Record<string, number> = {};
      for (const letter of this.answer) {
        if (!answerLetterCount[letter]) {
          answerLetterCount[letter] = 0;
        }
        answerLetterCount[letter]++;
      }
      //check if valid equation
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

  /**
   * @brief - toggles the class between light and dark mode, declared in the styles.scss file
   * dark mode is default theme
   */
  toggleTheme(){
    document.body.classList.toggle('light-theme');
  }
}
