import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { InventoryEventService } from '../services/inventory-event-service.component';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $: any;

@Component({
  selector: 'app-expiry-list',
  templateUrl: './expiry-list.component.html',
  styleUrls: ['./expiry-list.component.css']
})
export class ExpiryListComponent implements OnInit, OnChanges {
  //expiryListSummary: any;
  startDate: any;
  endDate: any;
  @Input() expiryListSummary;
  @Input() expiryListSummaryByBrand;
  @Input() expiryListSummaryByWarehouse;
  @Input() fromMsg;
  @Input() toMsg;
  @Input() byItem;
  @Input() limit;
  constructor(private eventService: InventoryEventService) { }

  ngOnInit() {
    /*   this.eventService.on('expiry-list-reports-by-item', (data) => {
          this.expiryListSummary = data;
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

      if (changes.expiryListSummary !== undefined) {
        if (changes.expiryListSummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#expiryListDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 300);

        }
      }

      if (changes.expiryListSummaryByBrand !== undefined) {
        if (changes.expiryListSummaryByBrand.currentValue.length > 0) {

          setTimeout(() => {

            $('#expiryListDatatable').DataTable({
              dom: 'Bfrtip',
              bRetrieve: true,
              buttons: [
                'excel', 'pdf', 'print'
              ]
            });

          }, 100);

        }
      }

      if (changes.expiryListSummaryByWarehouse !== undefined) {
        if (changes.expiryListSummaryByWarehouse.currentValue.length > 0) {

          setTimeout(() => {

            $('#expiryListDatatable').DataTable({
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
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
