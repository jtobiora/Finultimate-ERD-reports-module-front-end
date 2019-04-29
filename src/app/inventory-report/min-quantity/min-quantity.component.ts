import { Component,Input, OnInit,OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
declare var $: any;

@Component({
  selector: 'app-min-quantity',
  templateUrl: './min-quantity.component.html',
  styleUrls: ['./min-quantity.component.css']
})
export class MinQuantityComponent implements OnInit, OnChanges {
   @Input() minQtySummary;
   @Input()  minQtyByBrand;
   @Input()  minQtyByWarehouse;
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

      if (changes.minQtySummary !== undefined) {
        if (changes.minQtySummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#minQtyDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 300);

        }
      }

      if (changes.minQtyByBrand !== undefined) {
        if (changes.minQtyByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#minQtyDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.minQtyByWarehouse !== undefined) {
        if (changes.minQtyByWarehouse.currentValue.length > 0) {

          setTimeout(() => {

            $('#minQtyDatatable').DataTable({
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
