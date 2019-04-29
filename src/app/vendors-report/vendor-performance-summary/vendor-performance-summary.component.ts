import {Component, Input, OnChanges}  from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

@Component({
  selector: 'app-vendorperformance',
  templateUrl: './vendor-performance-summary.component.html',
  styleUrls: ['./vendor-performance-summary.css']
})


export class VendorPerformanceSummaryComponent  implements OnChanges {
   @Input() performanceSummary;
   @Input() message;
   @Input() limit;
   
   num;
   strLength : number = 0;

getPerformanceReportList(perfRep){
     //return perfRep['report']['itemReports'];
      return perfRep['report']['reports'];
}

//This returns true if no record is available
isEmptyObject(obj){
 return (obj && (Object.keys(obj).length === 0));
}

ngOnChanges(changes: SimpleChanges) {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  if (changes) {

    if (changes.performanceSummary !== undefined) {
      if (changes.performanceSummary.currentValue.length > 0) {

        setTimeout(() => {
          $('#performanceDatatable').DataTable({
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