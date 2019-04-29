import { Component, Input, OnInit, OnChanges  } from '@angular/core';
import { InventoryEventService } from '../services/inventory-event-service.component';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

@Component({
  selector: 'app-stock-availability',
  templateUrl: './stock-availability.component.html',
  styleUrls: ['./stock-availability.component.css']
})
export class StockAvailabilityComponent implements OnInit , OnChanges{
  stockAvailabilitySummary: any;
   @Input() availabilitySummary;
   @Input() availabilitySummaryByBrand;
   @Input() availabilitySummaryByWarehouse;
   @Input() byItem;
   @Input() limit;
  constructor(private eventService : InventoryEventService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {

      if (changes.availabilitySummary !== undefined) {
        if (changes.availabilitySummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#availabilityDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                 'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.availabilitySummaryByBrand !== undefined) {
        if (changes.availabilitySummaryByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#availabilityDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                 'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.availabilitySummaryByWarehouse !== undefined) {
        if (changes.availabilitySummaryByWarehouse.currentValue.length > 0) {

          setTimeout(() => {

            $('#availabilityDatatable').DataTable({
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
