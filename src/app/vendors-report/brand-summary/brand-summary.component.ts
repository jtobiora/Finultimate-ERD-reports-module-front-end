import {Component, Input, OnInit,AfterViewInit,OnChanges}  from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

@Component({
  selector: 'app-brandsummary',
  templateUrl: './brand-summary.component.html',
  styleUrls: ['./brand-summary.component.css']
  
})


export class BrandSummaryComponent implements OnChanges {
   @Input() brandSummary;
   @Input() message;
   @Input() limit;

   strLength : number = 0;

   getVendorReport(rep) {
     this.strLength = rep['report']['reports'][0].brandNames.length;
     return rep['report']['reports'];
   }

   getBrandReportList(brandRep){
      return brandRep['report']['reports'];
   }


   //This returns true if no record is available
isEmptyObject(obj){
 return (obj && (Object.keys(obj).length === 0));
}

ngOnChanges(changes: SimpleChanges) {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  if (changes) {

    if (changes.brandSummary !== undefined) {
      if (changes.brandSummary.currentValue.length > 0) {

        setTimeout(() => {
          $('#brandDatatable').DataTable({
            dom: 'Bfrtip',
            bRetrieve: true,
            buttons: [
              'excel', 'pdf', 'print'
            ]
          });

        }, 100);

      }
    }

  }
}

}