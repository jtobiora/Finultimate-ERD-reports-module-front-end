import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {EventsService} from "../../shared/events/EventsService";
declare var $:any;
@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.css']
})
export class SalesSummaryComponent implements OnInit, AfterViewInit {

  @Input() salesReportItems;
  uid = '';
  firstReports;
  restReport;
  table;
  reportTitles;
  dateTitles;
  renderingReport = false;

  summaryData;
  summary;
  totalSummary;

  showProducts = false;
  productReportItems:any[] =[];

  constructor(private eventService: EventsService) {
  }


  ngAfterViewInit(){
    
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  initTable(){
    $('.generated_table').attr('id', this.uid);

    setTimeout(()=>{
      if(this.table){

      }else{
        this.table = $('#datatable').DataTable({
          "bDestroy" : true,
          "pageLength": 50,
          "aaSorting": [],
          dom: 'Bfrtip'
          , buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
          ]
        });
      }
      console.log(this.table);
    }, 50);



  }

  ngOnInit() {
    this.eventService.on('rg', (data)=>{
      this.salesReportItems = data.reports;
      this.totalSummary = data.summaries;
      this.summary = undefined;

      if(this.salesReportItems){
        this.firstReports = this.salesReportItems.map(dailyReport => dailyReport.reportItems).map(items => items[0]);
      }
    });


    this.eventService.on('pr', (data)=>{
      this.productReportItems = data.reports;
      //console.log(this.productReportItems.map(item => item.reportItems).map(item => item[0]));
      //console.log(this.getProductDetails('Wheat Bread', 'Cost of Goods'));
      //console.log(this.productReportItems);
    });

    this.eventService.on('show-product', (data)=>{
      this.showProducts = data;
    })
  }


  getItemSummary(index){
    try{
      if(this.productReportItems) return this.productReportItems[index]['reportItems'].map(product => product.value).reduce((a,b)=> a+b);
      return 0;
    }catch(error){
      return 0;
    }
  }


  getParticularProductSummary(productIndex){
    try{
      if(this.productReportItems) return this.productReportItems.map(p=>p['reportItems'][productIndex]['value']).reduce((a,b)=>a+b);
      return 0;
    }catch(error){
      return 0;
    }
  }


  getSummary(){
    if(this.summary) return this.summary;

    let summary = [];
    let sampleDay = this.salesReportItems[0];
    for(let i=0; i<sampleDay.reportItems.length; i++){
      let data = {name: sampleDay.reportItems[i].title, summary:this.getProductSummary(i), currency:sampleDay.reportItems[i].currency,  percentage:sampleDay.reportItems[i].percentage};
      summary.push(data);
    }
    this.summaryData = summary;
    summary.filter(sum => sum.name==='Margin')[0]['summary'] = this.calculateMargin();
    this.summary = summary;
    return summary;
  }

  getProductSummary(index){
    let result = [];
    for(let i=0; i<this.salesReportItems.length; i++){
      let dailyReportObject = this.salesReportItems[i];
      result.push(dailyReportObject.reportItems[index]);
    }
    return result.map(product => product.value).reduce((a,b)=> a+b);
  }

  calculateMargin(){
    let summaryData = this.summaryData;
    let revenue = summaryData.filter(summary => summary.name ==='Revenue')[0]['summary'];
    let cog = summaryData.filter(summary => summary.name ==='Cost of Goods')[0]['summary'];
    return ((revenue-cog)/revenue)*100;
  }



  getDailyTitles(){
    if(!this.dateTitles) this.dateTitles = this.salesReportItems.map(dailyReport => dailyReport.dateTitle);
    return this.dateTitles;
  }

  getDaytitle(dayIndex){
    return this.getDailyTitles()[dayIndex];
  }

  getReportTitles(){
    let reports = this.salesReportItems.map((dailyReport, index) => dailyReport.reportItems);
    let titles = [];
    if(reports.length>0){
      reports[0].forEach(report=>{
        titles.push(report.title)
      });
      return titles;
    }
    return [];
  }


  getProductDetails(productName, measure){
    let total = 0;

    this.productReportItems.forEach( dailyReport => {
      dailyReport['reportItems'].forEach(product => {
        if(product.title === productName && !isNaN(product.data[measure])) total = product.data[measure];
      })
    });

    return total;
  }






  getFirstReports(){
    return this.salesReportItems.map(dailyReport => dailyReport.reportItems).map(items => items[0]);
  }

  getRestReports(){
    this.salesReportItems.map(dailyReport => dailyReport.reportItems).map(items => items.shift());
  }

  getReportFromDailyReport(reportIndex){
    return this.salesReportItems.map(dailyReport => dailyReport.reportItems).map(items => items[reportIndex]);
  }

  getDecimal(number){
    //console.log(number);
    return number ? number.toLocaleString().split('.')[1] : '';
  }

}
