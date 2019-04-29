import { Component,Input, OnInit,OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
declare var $: any;

@Component({
  selector: 'app-inventory-listing',
  templateUrl: './inventory-listing.component.html',
  styleUrls: ['./inventory-listing.component.css']
})
export class InventoryListingComponent implements OnInit , OnChanges{
   @Input()  inventoryListingSummary;
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

      if (changes.inventoryListingSummary !== undefined) {
        if (changes.inventoryListingSummary.currentValue.length > 0) {

          setTimeout(() => {

            $('#inventoryListingDatatable').DataTable({
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


isEmptyObject(obj){
 return (obj && (Object.keys(obj).length === 0));
}

}
