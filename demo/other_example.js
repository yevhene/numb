import { of } from 'rxjs';

const arr = [1, 2, 3];
const obs = of(arr);

console.log('Before subscribe');
obs.subscribe(console.log);
console.log('After subscribe');

console.log('Before push');
arr.push(4);
console.log('After push');
