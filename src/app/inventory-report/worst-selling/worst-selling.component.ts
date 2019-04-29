import { Component, Input, OnInit,OnChanges} from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;
@Component({
  selector: 'app-worst-selling',
  templateUrl: './worst-selling.component.html',
  styleUrls: ['./worst-selling.component.css']
})
export class WorstSellingComponent implements OnInit , OnChanges {
   startDate: any;
   endDate: any;
   @Input() worstSellingListSummary;
   @Input()  worstSellingListSummaryByBrand;
   @Input()  worstSellingListSummaryByWarehouse;
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

      if (changes.worstSellingListSummary !== undefined) {
        if (changes.worstSellingListSummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#worstSellingDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                 'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.worstSellingListSummaryByBrand !== undefined) {
        if (changes.worstSellingListSummaryByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#worstSellingDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.worstSellingListSummaryByWarehouse !== undefined) {
        if (changes.worstSellingListSummaryByWarehouse.currentValue.length > 0) {
          setTimeout(() => {

            $('#worstSellingDatatable').DataTable({
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
