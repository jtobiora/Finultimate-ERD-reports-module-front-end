import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'prefix'
})
export class PrefixPipe implements PipeTransform {
  transform(title: string) {
    if(!title) return title;
    
    let split = title.split(' ');
    if(split.length !== 2) return title;
    let cleanInput = this.removeFirstLetter(split[0])+' '+this.removeFirstLetter(split[1]);
    return cleanInput;

  }
  
  
  removeFirstLetter(letter: string){
    return letter.substr(0,1).toUpperCase();
  }
}




