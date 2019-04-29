import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {EventsService} from "../../shared/events/EventsService";
import {SalesSummaryClusterComponent} from "../sales-summary/sales-summary.component";
import { SimpleChanges, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var $:any;

@Component({
  selector: 'app-customer-summary-cluster',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css']
})
export class CustomerSummaryClusterComponent implements OnInit, AfterViewInit{

  constructor(private eventService: EventsService) {
  }

  
  salesReportItems;

  customerReportItems;

  customerProductReportItems;

  summary;
  summaryData;
  showProducts = false;

  customer;


  ngOnInit(){
    this.eventService.on('customer-sales-report', (data)=>{
      this.customerReportItems = data;
      this.summary = undefined;
    });

    this.eventService.on('customer-product-report', (data)=>{
      this.customerProductReportItems = data;
    });

    this.eventService.on('show-product', (data)=>{
      this.showProducts = data;
    })
  }

  ngAfterViewInit(){

  }

  getSalesReportItems(reportData){
    return reportData['report']['reports'];
  }

  getCustomerSalesSummary(report){
    // if(this.summary && report.customer['clientId'] === this.customer){
    //   return this.summary;
    // } 
    if(this.summary && report.customer['clientCode'] === this.customer){
         return this.summary;
    } 

    let summary = [];
    let sampleDay = this.getSalesReportItems(report)[0];
    for(let i=0; i < sampleDay.reportItems.length; i++){
      if(sampleDay.reportItems[i].title  === 'Basket Size'){
        let data = {name: sampleDay.reportItems[i].title, summary:this.getBasketSizeSummary(report, i), currency:sampleDay.reportItems[i].currency,  percentage:sampleDay.reportItems[i].percentage};
        summary.push(data);
      } else {
        let data = {name: sampleDay.reportItems[i].title, summary:this.getProductSummary(report, i), currency:sampleDay.reportItems[i].currency,  percentage:sampleDay.reportItems[i].percentage};
        summary.push(data);
      }
    }

    this.summaryData = summary;
    summary.filter(sum => sum.name==='Margin')[0]['summary'] = this.calculateMargin();
    this.summary = summary;
    this.customer = report.customer['clientCode'];
    return summary;
  }

  calculateMargin(){
    // let summaryData = this.summaryData;
    // let revenue = summaryData.filter(summary => summary.name ==='Revenue')[0]['summary'];
    // let cog = summaryData.filter(summary => summary.name ==='Cost of Goods')[0]['summary'];
    // let margin = ((revenue-cog)/revenue)*100;
    // if(isNaN(margin)) return 0;
    // return margin ;//{isMargin : true, value : margin};

    let summaryData = this.summaryData;
    let revenue = summaryData.filter(summary => summary.name ==='Revenue')[0]['summary'];
    let revSliced = revenue.slice(1);
    let revNoCommas = revSliced.replace(/,\s?/g, "");
    
    let cog = summaryData.filter(summary => summary.name ==='Cost of Goods')[0]['summary'];
    let marginRetrived = summaryData.filter(summary => summary.name ==='Margin')[0]['summary'];
    let cogSliced = cog.slice(1);
    let cogNoCommas = cogSliced.replace(/,\s?/g, "");

    let margin = ((revNoCommas-cogNoCommas)/revNoCommas)*100;
    if(isNaN(margin)) {
       return 0;
    }
    return '%' + margin.toFixed(2);
  }

  getProductSummary(report, index){
    let result = [];
    for(let i=0; i<this.getSalesReportItems(report).length; i++){
      let dailyReportObject = this.getSalesReportItems(report)[i];
      result.push(dailyReportObject.reportItems[index]);
    }
  
    let val = result.map(product => product.value).reduce((a,b)=> a+b);

    let amount = "₦" + Math.round(val).toLocaleString();
    return amount;

    //return result.map(product => product.value).reduce((a,b)=> a+b);
  }

  getBasketSizeSummary(report, index){
    let result = [];
    for(let i=0; i<this.getSalesReportItems(report).length; i++){
      let dailyReportObject = this.getSalesReportItems(report)[i];
      result.push(dailyReportObject.reportItems[index]);
    }

    return result.map(product => product.value).reduce((a,b)=> a+b);
  }

  getProductDetails(productName, measure, productReportItems){
    let total = 0;

    productReportItems.forEach( dailyReport => {
      dailyReport['reportItems'].forEach(product => {
        if(product.title === productName && !isNaN(product.data[measure])) {
          total = total + product.data[measure];
        }
      });
    });

    return total;
  }

  getItemSummary(index, productReportItems){
    try{
      if(productReportItems) return productReportItems[index]['reportItems'].map(product => product.value).reduce((a,b)=> a+b);
      return 0;
    }catch(error){
      return 0;
    }
  }

  getParticularProductSummary(productIndex, productReportItems){
    try{
      if(productReportItems) { 
        return productReportItems.map(p=>p['reportItems'][productIndex]['value']).reduce((a,b)=>a+b);
      }
      return 0;
    }catch(error){
      return 0;
    }
  }
  
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('In ngOnChanges');
  //   if (changes) {    
  //     if (changes.customerReportItems !== undefined) {
  //       if (changes.customerReportItems.currentValue.length > 0) {
  
  //         setTimeout(() => {
  //           $('#customerDatatable').DataTable({
  //             dom: 'Bfrtip',
  //             bRetrieve: true,
  //             buttons: [
  //               'excel', 'pdf', 'print'
  //             ]
  //           });
  //         }, 100);
  //       }
  //     }
  
  //   }
  // }


}
