//@@@@@@@@@@@@@@@@@@@@ POS SALES REPORT COMPONENTS @@@@@@@@@@@@@@@@
import { Routes, RouterModule } from '@angular/router';
import {SalesReportComponent} from "./sales-report/sales-report.component";
import {SalesSummaryComponent} from "./sales-report/sales-summary/sales-summary.component";
import {UserSummaryComponent} from "./sales-report/user-sumamry/user-summary.component";
import {CustomerSummaryComponent} from "./sales-report/customer-sumamry/customer-summary.component";
import {OutletSummaryComponent} from "./sales-report/outlet-sumamry/outlet-summary.component";

//@@@@@@@@@@@@@@@@@@@@ CLUSTER SALES REPORT COMPONENTS @@@@@@@@@@@@@@@@
import {SalesReportClusterComponent} from './sales-report-cluster/sales-report-cluster.component';
import {SalesSummaryClusterComponent} from './sales-report-cluster/sales-summary/sales-summary.component';
import {UserSummaryClusterComponent} from './sales-report-cluster/user-summary/user-summary.component';
import {OutletSummaryClusterComponent} from './sales-report-cluster/outlet-summary/outlet-summary.component';
import {CustomerSummaryClusterComponent} from './sales-report-cluster/customer-summary/customer-summary.component';

//@@@@@@@@@@@@@@@ VENDORS REPORT COMPONENTS @@@@@@@@@@@@@@@
import { VendorsReportComponent } from './vendors-report/vendors-report.component';
import { VendorPaymentSummaryComponent } from './vendors-report/vendor-payment-summary/vendor-payment-summary.component';
import { GrossProfitSummaryComponent } from './vendors-report/gross-profit-summary/gross-profit-summary.component';
import { BrandSummaryComponent } from './vendors-report/brand-summary/brand-summary.component';

//@@@@@@@@@@@@@@@@@@@@ INVENTORY REPORT COMPONENTS @@@@@@@@@@@@@@@@
import {InventoryReportComponent} from "./inventory-report/inventory-report.component";
import {BestSellingComponent} from './inventory-report/best-selling/best-selling.component';
import {ExpiryListComponent} from './inventory-report/expiry-list/expiry-list.component';
import {InventoryListingComponent} from './inventory-report/inventory-listing/inventory-listing.component';
import {MinQuantityComponent} from './inventory-report/min-quantity/min-quantity.component';
import {StockAgingComponent} from './inventory-report/stock-aging/stock-aging.component';
import {StockAvailabilityComponent} from './inventory-report/stock-availability/stock-availability.component';
import {StockMovementComponent} from './inventory-report/stock-movement/stock-movement.component';
import {StockValueComponent} from './inventory-report/stock-value/stock-value.component';
import {WorstSellingComponent} from './inventory-report/worst-selling/worst-selling.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ErrorPageComponent} from './not-found/errorpage.component';
import {AppComponent} from './app.component';

const appRoutes: Routes = [
     { 
      path: 
       'sales-report', component: SalesReportComponent, 
          children:[
            {path:'summary', component: SalesSummaryComponent},
            {path:'user', component: UserSummaryComponent},
            {path:'customer', component: CustomerSummaryComponent},
            {path:'outlet', component: OutletSummaryComponent},
          ] 
    },  //POS SALES REPORT COMPONENT ENDS HERE 
    { 
      path: 
       'sales-report-cluster', component: SalesReportClusterComponent, 
          children:[
            {path:'summary', component: SalesSummaryClusterComponent},
            {path:'user', component: UserSummaryClusterComponent},
            {path:'customer', component: CustomerSummaryClusterComponent},
            {path:'outlet', component: OutletSummaryClusterComponent},
          ] 
    },  //CLUSTERED SALES REPORT COMPONENT ENDS HERE 
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'logout',
      component: LogoutComponent
    },
    {
      path: 'vendors-report',
      component: VendorsReportComponent
    },
    {
      path: 'inventory-report',
      component: InventoryReportComponent
    },
    {
      path: 'error',
      component: ErrorPageComponent
    },

    { path: '**', redirectTo:'sales-report', pathMatch:'full' }
    // { 
    //   path:
    //     'inventory-report', component:InventoryReportComponent, 
    //       children:[
    //         {path:'best-selling-summary', component: BestSellingComponent},
    //         {path:'worst-selling-summary', component: WorstSellingComponent},
    //         {path:'expiry-list-summary', component: ExpiryListComponent},
    //         {path:'inventory-listing-summary', component: InventoryListingComponent},
    //         {path:'inventory-below-min-quantity-summary', component: MinQuantityComponent},
    //         {path:'stock-aging-summary', component: StockAgingComponent},
    //         {path:'stock-availability-summary', component: StockAvailabilityComponent},
    //         {path:'stock-movement-summary', component: StockMovementComponent},
    //         {path:'stock-value-summary', component: StockValueComponent}

    //   ] 
    // },   //INVENTORY REPORT COMPONENT ENDS HERE

    // {
    //   path: 'vendors-report', component: VendorsReportComponent,
    //    children:[
    //     // {path:'vendor-performance', component: StockBalanceSummaryComponent},
    //      {path:'gross-profit', component: GrossProfitSummaryComponent},
    //      {path:'vendor-payments', component: VendorPaymentSummaryComponent},
    //      {path:'brand', component: BrandSummaryComponent},
    //   ] 
    // }, // VENDORS REPORT COMPONENT ENDS HERE

   
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
