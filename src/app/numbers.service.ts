import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  numbers: number[] = [1, 2, 3];

  getNumbers(): Observable<number[]> {
    console.log('NumbersService#getNumbers');
    return of(this.numbers);
  }

  nextNumber() {
    console.log('NumbersService#nextNumber');
    this.numbers.push(this.numbers.length + 1);
  }
}
