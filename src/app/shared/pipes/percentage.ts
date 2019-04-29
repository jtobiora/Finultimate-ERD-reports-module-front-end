import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {
  transform(price: number) {
    let nr = (Math.round(price * 100) / 100).toLocaleString();
    return nr+"%";
  }
}
