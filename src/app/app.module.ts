import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { BusyModule } from 'angular2-busy';


//@@@@@@@@@@@@@@@@@@ POS SALES REPORT COMPONENTS @@@@@@@@@@@@@@@@@@@
import { AppComponent } from './app.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import {routing} from "./app.routing";
import {CrudService} from "./shared/services/CrudService";
import {ReportService} from "./shared/services/ReportService";
import {NCurrencyPipe} from "./shared/pipes/ncurrency";
import {NumberPipe} from "./shared/pipes/number";
import {PercentagePipe} from "./shared/pipes/percentage";
import {EventsService} from "./shared/events/EventsService";
import {SalesSummaryComponent} from "./sales-report/sales-summary/sales-summary.component";
import {UserSummaryComponent} from "./sales-report/user-sumamry/user-summary.component";
import {CustomerSummaryComponent} from "./sales-report/customer-sumamry/customer-summary.component";
import {OutletSummaryComponent} from "./sales-report/outlet-sumamry/outlet-summary.component";
import {DateInputComponent} from "./shared/components/date/date";
import {TimeInputComponent} from "./shared/components/time/time";

//@@@@@@@@@@@@@@@@@@ CLUSTER SALES REPORT COMPONENTS @@@@@@@@@@@@@@@@@@@
import {SalesReportClusterComponent} from './sales-report-cluster/sales-report-cluster.component';
import {SalesSummaryClusterComponent} from './sales-report-cluster/sales-summary/sales-summary.component';
import {UserSummaryClusterComponent} from './sales-report-cluster/user-summary/user-summary.component';
import {OutletSummaryClusterComponent} from './sales-report-cluster/outlet-summary/outlet-summary.component';
import {CustomerSummaryClusterComponent} from './sales-report-cluster/customer-summary/customer-summary.component';

//@@@@@@@@@@@@@@@@@@@ VENDOR REPORT COMPONENTS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import { VendorsReportComponent } from './vendors-report/vendors-report.component';
import { VendorPaymentSummaryComponent } from './vendors-report/vendor-payment-summary/vendor-payment-summary.component';
import { GrossProfitSummaryComponent } from './vendors-report/gross-profit-summary/gross-profit-summary.component';
import { BrandSummaryComponent } from './vendors-report/brand-summary/brand-summary.component';
import { VendorPerformanceSummaryComponent } from './vendors-report/vendor-performance-summary/vendor-performance-summary.component';
import { VendorReportServiceComponent } from './vendors-report/services/vendor-report-service.component';
import { VendorEventServiceComponent } from './vendors-report/services/vendor-event-service.component';
import { VendorsService } from './vendors-report/services/vendors-service.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorPageComponent } from './not-found/errorpage.component';
import { PurchaseOrderSummaryComponent } from './vendors-report/purchase_orders/purchase-order-summary.component';
import { SuppliersSummaryComponent } from './vendors-report/suppliers/suppliers-summary.component';
import { CategoryComponent } from './vendors-report/category/category.component';
import { ItemsSummaryComponent } from './vendors-report/procured-items/items-summary.component';

//import { Ng2PaginationModule } from 'ng2-pagination';   //for pagination purposes
import {NgxPaginationModule} from 'ngx-pagination';

//@@@@@@@@@@@@@@@@@@@ INVENTORY REPORT COMPONENTS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import {InventoryReportComponent} from './inventory-report/inventory-report.component';
import {BestSellingComponent} from './inventory-report/best-selling/best-selling.component';
import {ExpiryListComponent} from './inventory-report/expiry-list/expiry-list.component';
import {InventoryListingComponent} from './inventory-report/inventory-listing/inventory-listing.component';
import {MinQuantityComponent} from './inventory-report/min-quantity/min-quantity.component';
import {StockAgingComponent} from './inventory-report/stock-aging/stock-aging.component';
import {StockAvailabilityComponent} from './inventory-report/stock-availability/stock-availability.component';
import {StockMovementComponent} from './inventory-report/stock-movement/stock-movement.component';
import {StockValueComponent} from './inventory-report/stock-value/stock-value.component';
import {WorstSellingComponent} from './inventory-report/worst-selling/worst-selling.component';
import {InventoryService} from './inventory-report/services/inventory-service.component';
import {InventoryEventService} from './inventory-report/services/inventory-event-service.component';


@NgModule({
  declarations: [
    //components for POS Sales Reports
    AppComponent,
    SalesReportComponent,
    SalesSummaryComponent,
    UserSummaryComponent,
    CustomerSummaryComponent,
    OutletSummaryComponent,
    NCurrencyPipe,
    NumberPipe,
    PercentagePipe,
    InventoryReportComponent,
    DateInputComponent,
    TimeInputComponent,
    
    //components for Sales Reports
    SalesReportClusterComponent,
    SalesSummaryClusterComponent,
    UserSummaryClusterComponent,
    OutletSummaryClusterComponent,
    CustomerSummaryClusterComponent,
    
    //Components for Vendors Reports
    VendorsReportComponent,
    VendorPaymentSummaryComponent,
    GrossProfitSummaryComponent,
    BrandSummaryComponent,
    VendorPerformanceSummaryComponent,
    LoginComponent,
    LogoutComponent,
    ErrorPageComponent,
    PurchaseOrderSummaryComponent,
    SuppliersSummaryComponent,
    CategoryComponent,
    ItemsSummaryComponent,
    
    //Components for Inventory Reports
    InventoryReportComponent,
    BestSellingComponent,
    ExpiryListComponent,
    InventoryListingComponent,
    MinQuantityComponent,
    StockAgingComponent,
    StockAvailabilityComponent,
    StockMovementComponent,
    StockValueComponent,
    WorstSellingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgxPaginationModule
    //Ng2PaginationModule
    
  ],
  providers: [CrudService,
              ReportService, 
              EventsService,
              VendorReportServiceComponent,
              VendorEventServiceComponent,
              VendorsService,
              InventoryService,
              InventoryEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
