import {Component, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var $:any;
declare var pickadate:any;

declare var moment:any;

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateInputComponent),
  multi: true
};

@Component({
  selector: 'date-input',
  styleUrls: ['./date.css'],
  template: `
          <div style="margin:8px 4px;">
            <label class="control-label">{{label}}</label>
            <div>
              <input type="text" [id]="id" class="end_datepicker" name="{{id}}" (blur)="onBlur()">
            </div>
          </div>
            
            `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DateInputComponent implements ControlValueAccessor {

  @Input() label;
  @Input() start = false;
  @Input() end = false;
  id = this.guid();

  //[(ngModel)]="value"

  date;

  //The internal data model
  private innerValue: any = new Date();

  constructor(){
    setTimeout(()=>{

      $('#'+this.id).pickadate({
        formatSubmit: 'yyyy-mm-dd',
        selectYears: true,
        selectMonths: true,
        max: new Date(),
        onSet: (context) => {
          /*
          if(this.start){
            this.value = moment(new Date(context.select)).startOf('day').format("DD MMM YYYY")
          }else if(this.end){
            this.value = moment(new Date(context.select)).endOf('day').format("DD MMM YYYY")
          }else{
            this.value = moment(new Date(context.select)).startOf('day').format("DD MMM YYYY")
          }
          */
          this.value = $('#'+this.id).val();
          //console.log(this.value);
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
