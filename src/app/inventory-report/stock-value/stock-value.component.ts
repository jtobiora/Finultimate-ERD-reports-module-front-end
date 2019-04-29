import { Component, Input,OnInit,OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

@Component({
  selector: 'app-stock-value',
  templateUrl: './stock-value.component.html',
  styleUrls: ['./stock-value.component.css']
})
export class StockValueComponent implements OnInit, OnChanges{
  @Input() stockValueSummary;
  @Input() stockValueSummaryByBrand;
  @Input() stockValueSummaryByWarehouse;
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

      if (changes.stockValueSummary !== undefined) {
        if (changes.stockValueSummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockValueDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.stockValueSummaryByBrand !== undefined) {
        if (changes.stockValueSummaryByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockValueDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.stockValueSummaryByWarehouse !== undefined) {
        if (changes.stockValueSummaryByWarehouse.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockValueDatatable').DataTable({
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
