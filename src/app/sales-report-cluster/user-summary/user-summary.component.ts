import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {EventsService} from "../../shared/events/EventsService";
declare var $:any;

@Component({
  selector: 'app-user-summary-cluster',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})
export class UserSummaryClusterComponent implements OnInit, AfterViewInit {

  salesReportItems;

  userReportItems;

  userProductReportItems;

  summary;
  summaryData;
  showProducts = false;

  prevUserId;

  productReportItems:any[] =[];

  constructor(private eventService: EventsService) {
  }


  ngOnInit(){
    this.eventService.on('user-sales-report', (data)=>{
      this.userReportItems = data;
      this.summary = undefined;
    });

    this.eventService.on('user-product-report', (data)=>{
      this.userProductReportItems = data;
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
    if(this.summary && report.user.userAccountId === this.prevUserId) {
      return this.summary;
    };

    let summary = [];
    let sampleDay = this.getSalesReportItems(report)[0];
    for(let i=0; i<sampleDay.reportItems.length; i++){
      // let data = {name: sampleDay.reportItems[i].title, summary:this.getProductSummary(report, i), currency:sampleDay.reportItems[i].currency,  percentage:sampleDay.reportItems[i].percentage};
      // summary.push(data);
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
    this.prevUserId = report.user.userAccountId;
    return summary;
  }

  calculateMargin(){
    // let summaryData = this.summaryData;
    // let revenue = summaryData.filter(summary => summary.name ==='Revenue')[0]['summary'];
    // let cog = summaryData.filter(summary => summary.name ==='Cost of Goods')[0]['summary'];
    // let margin = ((revenue-cog)/revenue)*100;
    // if(isNaN(margin)) { 
    //   return 0;
    // }
    // return margin;

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
    // let result = [];
    // for(let i=0; i<this.getSalesReportItems(report).length; i++){
    //   let dailyReportObject = this.getSalesReportItems(report)[i];
    //   result.push(dailyReportObject.reportItems[index]);
    // }
    // return result.map(product => product.value).reduce((a,b)=> a+b);

    let result = [];
    for(let i=0; i<this.getSalesReportItems(report).length; i++){
      let dailyReportObject = this.getSalesReportItems(report)[i];
      result.push(dailyReportObject.reportItems[index]);
    }
  
    let val = result.map(product => product.value).reduce((a,b)=> a+b);
    let amount = "₦" + Math.round(val).toLocaleString();
    return amount;

  }


  getProductDetails(productName, measure, productReportItems){
    let total = 0;

    productReportItems.forEach( dailyReport => {
      dailyReport['reportItems'].forEach(product => {
        if(product.title === productName && !isNaN(product.data[measure])) {
          total = product.data[measure];
        }
      })
    });

    return total;
  }

  getItemSummary(index, productReportItems){
    try{
      if(productReportItems) {
        return productReportItems[index]['reportItems'].map(product => product.value).reduce((a,b)=> a+b);
      }

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

  getBasketSizeSummary(report, index){
    let result = [];
    for(let i=0; i<this.getSalesReportItems(report).length; i++){
      let dailyReportObject = this.getSalesReportItems(report)[i];
      result.push(dailyReportObject.reportItems[index]);
    }

    return result.map(product => product.value).reduce((a,b)=> a+b);
  }

}
