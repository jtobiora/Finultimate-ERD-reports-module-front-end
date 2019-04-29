import {PipeTransform, Injectable, Pipe} from "@angular/core";
@Pipe({
  name: 'clip'
})
@Injectable()
export class ClipPipe implements PipeTransform {
  transform(value:string, length:number): string {
    if(!value) return value;
    return value.substring(0, length)+'...';
  }
}
