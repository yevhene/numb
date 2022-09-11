import { Component } from '@angular/core';
import { NumbersService } from './numbers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="nextNumber()">Next</button>

    <ul>
      <li *ngFor="let number of numbers | async">{{number}}</li>
    </ul>
  `,
})
export class AppComponent {
  numbers: Observable<number[]>;

  constructor(private numbersService: NumbersService) {
    console.log('AppComponent#constructor');
    this.numbers = this.numbersService.getNumbers();
  }

  nextNumber() {
    console.log('AppComponent#nextNumber');
    this.numbersService.nextNumber();
  }
}
