# Why it works?

## Run
```bash
ng serve
```

## Demo
![Demo](./demo/demo.gif)

## Code

### [Component](./src/app/app.component.ts)
```typescript
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
```

### [Service](./src/app/numbers.service.ts)
```typescript
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
```

## Question
**Why it works?**
1. When component initalized, it gets `Observable<number[]>` wrapped around
array of numbers `[1, 2, 3]`, created with `of()`;
2. When user clicks the button, new number is added to the array and it becomes
`[1, 2, 3, 4]`;
3. New number rendered. **But why?** Observable should know nothing about array
changes. And it knows nothing. See other example:

## Other example

### [Code](./demo/other_example.js)
```javascript
import { of } from 'rxjs';

const arr = [1, 2, 3];
const obs = of(arr);

console.log('Before subscribe');
obs.subscribe(console.log);
console.log('After subscribe');

console.log('Before push');
arr.push(4);
console.log('After push');
```

### Result
```bash
$ node demo/other_example.js
```

```
Before subscribe
[ 1, 2, 3 ]
After subscribe
Before push
After push
```
