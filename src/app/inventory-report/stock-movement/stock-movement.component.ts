import { Component, Input, OnInit,OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;
@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.component.html',
  styleUrls: ['./stock-movement.component.css']
})
export class StockMovementComponent implements OnInit,OnChanges {
   startDate: any;
   endDate: any;
   @Input()  stockMovementSummary;
   @Input()  stockMovementSummaryByBrand;
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

      if (changes.stockMovementSummary !== undefined) {
        if (changes.stockMovementSummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockMovtDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 300);

        }
      }

      if (changes.stockMovementSummaryByBrand !== undefined) {
        if (changes.stockMovementSummaryByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockMovtDatatable').DataTable({
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

       //This returns true if no record is available
isEmptyObject(obj){
 return (obj && (Object.keys(obj).length === 0));
}

}
