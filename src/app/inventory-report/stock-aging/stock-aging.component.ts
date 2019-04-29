import { Component, Input,OnInit,OnChanges } from '@angular/core';
import { InventoryEventService } from '../services/inventory-event-service.component';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;
@Component({
  selector: 'app-stock-aging',
  templateUrl: './stock-aging.component.html',
  styleUrls: ['./stock-aging.component.css']
})
export class StockAgingComponent implements OnInit,OnChanges {
  //stockAgingSummary: any;
  startDate: any;
  endDate: any;
  @Input() stockAgingSummary;
  @Input() stockAgingSummaryByBrand;
  @Input() stockAgingSummaryByWarehouse;
  @Input() fromMsg;
  @Input() toMsg;
  @Input() byItem;
  @Input() limit;
  constructor(private eventService : InventoryEventService) { }

  ngOnInit() {
  /*    this.eventService.on('stock-aging-reports', (data) => {
      this. stockAgingSummary = data;
    });

    this.eventService.on('from', (data) => {
      this.startDate = data;
    });

    this.eventService.on('to', (data) => {
      this.endDate = data;
    }); */
  }


  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {

      if (changes.stockAgingSummary !== undefined) {
        if (changes.stockAgingSummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockAgingDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
               'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.stockAgingSummaryByBrand !== undefined) {
        if (changes.stockAgingSummaryByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockAgingDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.stockAgingSummaryByWarehouse !== undefined) {
        if (changes.stockAgingSummaryByWarehouse.currentValue.length > 0) {

          setTimeout(() => {

            $('#stockAgingDatatable').DataTable({
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
