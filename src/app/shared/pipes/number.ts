import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {
  transform(price: number) {
    let nr = Math.round(price).toLocaleString();
    return nr;
  }
}
