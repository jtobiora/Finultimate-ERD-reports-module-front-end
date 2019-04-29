import {Component, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var $:any;
declare var pickatime:any;
declare var moment:any;

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeInputComponent),
  multi: true
};

@Component({
  selector: 'time-input',
  styleUrls: ['./time.css'],
  template: `
            <label class="control-label">{{label}}</label>
            <div>
              <input type="text" [id]="id" class="end_datepicker"  name="{{id}}" (blur)="onBlur()">
            </div>
            `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TimeInputComponent implements ControlValueAccessor {

  @Input() label;
  @Input() day: Date = new Date();
  id = this.guid();
  date;

  //[(ngModel)]="value"

  //The internal data model
  private innerValue: any = moment();

  constructor(){

    setTimeout(()=>{
      let that = this;

      $('#'+this.id).pickatime({
        interval: 60,
        formatSubmit: 'HH:mm A',
        clear:'',
        onSet: (context) => {

          /*

          if(typeof this.day === 'string'){
            this.day = new Date(this.day);
          }
          if(!this.day) this.day = new Date();
          let dayString = this.day.getDate()+'-'+this.day.getMonth()+'-'+this.day.getFullYear();
          let result = moment(dayString, 'DD-MM-YYYY').startOf('day');
          let newResult = result.set('hour', context.select/60);
          console.log(newResult.format('DD MMM YYYY hh:mm A'));
          this.value = newResult.format('hh:mm A');
          */

          //this.value = $("#"+this.id).val();
          //console.log(this.value);
          var d = new Date();
          d.setHours(context.select/60);
          d.setMinutes(0);
          d.setMilliseconds(0);
          //console.log(moment(d).format('Do MM YYYY hh:00:00 A'));
          this.value = moment(d).format('DD MMM YYYY hh:00:00 A');
        }
      });

    }, 10);
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if(v !== this.innerValue){
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
