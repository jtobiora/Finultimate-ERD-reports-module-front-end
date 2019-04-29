import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ncurrency'
})
export class NCurrencyPipe implements PipeTransform {
  transform(price: number) {
    let nr = Math.round(price).toLocaleString();
    return "₦ "+nr;
  }
}
