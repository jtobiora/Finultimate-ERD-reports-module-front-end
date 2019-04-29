import { Component,Input, OnInit, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;
@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.css']
})
export class BestSellingComponent implements OnInit, OnChanges {
   startDate: any;
   endDate: any;
   @Input() bestSellingListSummary;
   @Input()  bestSellingListSummaryByBrand;
   @Input()  bestSellingListSummaryByWarehouse;
   @Input() fromMsg;
   @Input() toMsg;
   @Input() byItem;
   @Input() limit;
  constructor() { }

  ngOnInit() {
  }

  
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {

      if (changes.bestSellingListSummary !== undefined) {
        if (changes.bestSellingListSummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#bestSellingDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.bestSellingListSummaryByBrand !== undefined) {
        if (changes.bestSellingListSummaryByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#bestSellingDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.bestSellingListSummaryByWarehouse !== undefined) {
        if (changes.bestSellingListSummaryByWarehouse.currentValue.length > 0) {

          setTimeout(() => {

            $('#bestSellingDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 300);

        }
      }
    }

  }
       //This returns true if no record is available
isEmptyObject(obj){
 return (obj && (Object.keys(obj).length === 0));
}

}
