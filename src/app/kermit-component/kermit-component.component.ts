import { Component } from '@angular/core';

@Component({
  selector: 'app-kermit-component',
  standalone: true,
  imports: [],
  templateUrl: './kermit-component.component.html',
  styleUrl: './kermit-component.component.scss'
})
export class KermitComponent {
  kermitPaths: string[] = ["/assets/images/cozy_kermit.png", 
                          "/assets/images/detective_kermit.jpg", 
                          "/assets/images/kermie.jpg",
                          "/assets/images/log_kermit.jpeg",
                          "/assets/images/posh_kermit.png",
                          "/assets/images/professional_kermit.jpeg"];

  getImgSource(): string{
    //generate a random number to pick a random index of the kermit list
    const index: number = Math.floor(Math.random() * this.kermitPaths.length);
    const result: string = this.kermitPaths[index];

    return result;
  }
}
