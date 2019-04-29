import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {EventsService} from "../../shared/events/EventsService";
import {SalesSummaryComponent} from "../sales-summary/sales-summary.component";
declare var $:any;
@Component({
  selector: 'app-outlet-summary',
  templateUrl: './outlet-summary.component.html',
  styleUrls: ['./outlet-summary.component.css']
})
export class OutletSummaryComponent implements OnInit, AfterViewInit {

  constructor(private eventService: EventsService) {}

  salesReportItems;

  outletReportItems;
  outletProductReportItems;

  summary;
  summaryData;
  showProducts = false;

  outlet;

  ngOnInit(){
    this.eventService.on('outlet-sales-report', (data)=>{
      this.outletReportItems = data;
      this.summary = undefined;
      console.log(data);
    });

    this.eventService.on('outlet-product-report', (data)=>{
      this.outletProductReportItems = data;
    });

    this.eventService.on('show-product', (data)=>{
      this.showProducts = data;
    })
  }

  ngAfterViewInit(){

  }


  getSalesReportItems(report){
    return report['report']['reports'];
  }

  getUserSalesSummary(report){
    if(this.summary && report['outletName'] === this.outlet) return this.summary;

    let summary = [];
    let sampleDay = this.getSalesReportItems(report)[0];
    for(let i=0; i<sampleDay.reportItems.length; i++){
      let data = {name: sampleDay.reportItems[i].title, summary:this.getProductSummary(report, i), currency:sampleDay.reportItems[i].currency,  percentage:sampleDay.reportItems[i].percentage};
      summary.push(data);
    }
    this.summaryData = summary;
    summary.filter(sum => sum.name==='Margin')[0]['summary'] = this.calculateMargin();
    this.summary = summary;
    this.outlet = report['outletName'];
    return summary;
  }

  calculateMargin(){
    let summaryData = this.summaryData;
    let revenue = summaryData.filter(summary => summary.name ==='Revenue')[0]['summary'];
    let cog = summaryData.filter(summary => summary.name ==='Cost of Goods')[0]['summary'];
    let margin = ((revenue-cog)/revenue)*100;
    if(isNaN(margin)) return 0;
    return margin;
  }

  getProductSummary(report, index){
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
        if(product.title === productName && !isNaN(product.data[measure])) total = product.data[measure];
      })
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
      if(productReportItems) return productReportItems.map(p=>p['reportItems'][productIndex]['value']).reduce((a,b)=>a+b);
      return 0;
    }catch(error){
      return 0;
    }
  }

}
