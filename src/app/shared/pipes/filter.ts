import {PipeTransform, Injectable, Pipe} from "@angular/core";
@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field : string, value : string): any[] {
    if (!items) return [];
    if(!value) return items;
    return items.filter(it => it[field].indexOf(value) !== -1);
  }
}
