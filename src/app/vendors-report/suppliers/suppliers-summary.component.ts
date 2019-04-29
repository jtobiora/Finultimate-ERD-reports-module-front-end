import {Component, Input,OnChanges} from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers-summary.component.html',
  styleUrls: ['./suppliers-summary.component.css']
})

export class SuppliersSummaryComponent implements OnChanges{
   @Input() suppliersSummary;
   @Input() message;
   @Input() limit;

   p: number = 1;
   strLength : number = 0;

   getVendorReport(rep) {
     this.strLength = rep['report']['reports'][0].brandNames.length;
     return rep['report']['reports'];
   }

      //This returns true if no record is available
   isEmptyObject(obj){
     return (obj && (Object.keys(obj).length === 0));
   }

ngOnChanges(changes: SimpleChanges) {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  if (changes) {
    if (changes.suppliersSummary !== undefined) {
      if (changes.suppliersSummary.currentValue.length > 0) {

        setTimeout(() => {
          $('#suppliersDatatable').DataTable({
            dom: 'Bfrtip',
            bRetrieve: true,
            buttons: [
              'excel', 'pdf', 'print'
            ]
          });

        }, 500);
      }
    }
  }

}

}