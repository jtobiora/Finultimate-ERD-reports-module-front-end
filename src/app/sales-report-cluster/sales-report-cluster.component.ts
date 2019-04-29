import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ReportService} from '../shared/services/ReportService';
import {EventsService} from '../shared/events/EventsService';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {REPORT_TYPE} from '../shared/util/constant';
import {Subscription} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {
  getHourRangeDate, getHourDate, getDayDate, getDayRangeDate, getMonthDate,
  getMonthRangeDate, getYearRangeDate, getYearDate, getTodayDate
} from '../shared/util/dateTimeUtil';
declare var $:any, pickadate:any, moment:any;

@Component({
  selector: 'app-sales-report-cluster',
  templateUrl: './sales-report-cluster.component.html',
  styleUrls: ['./sales-report-cluster.component.css']
})
export class SalesReportClusterComponent implements OnInit, AfterViewInit {
  busyA: Subscription;
  busyB: Subscription;
  reportType = 'Sales Summary';
  measure = 'Basket Size';
  measureValue = 'basket-size';

  frequencyType = 'Compare Dates';

  startDate: Date = new Date();
  endDate: Date = new Date();

  d_top_selection = 2;

  salesReportItems:any[] =[];

  generatingReport = false;

  displayReport = false;

  showProduct = false;

  reportDate;

  frequency:string;

  reportHour = '';
  reportDay = '';
  reportWeek = '';
  reportMonth = '';
  reportYear = '';

  reportStartHour = '';
  reportEndHour = '';

  reportStartDay = '';
  reportEndDay = '';

  reportStartMonth = '';
  reportEndMonth = '';

  reportStartWeek = '';
  reportEndWeek = '';

  reportStartYear = '';
  reportEndYear = '';

  years = [];
  months = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  message = '';

  reportGranularity:any;
  
  userName : string;
  logo : any;
  tenantName : string;

  constructor(private router: Router, private reportService: ReportService, private eventService: EventsService,
  private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // let userInfo = localStorage.getItem('user_info');
    // let jsonObj = JSON.parse(userInfo);
    // this.userName = jsonObj['userName'];
    // this.tenantName = jsonObj['tenantName'];
    // this.logo = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + jsonObj['tenantLogo']); 
  }

  ngAfterViewInit() {
    this.startDate.setHours(0,0,0,0);
    this.endDate.setHours(0,0,0,0);

    this.reportGranularity = getTodayDate();

    $('.start_datepicker').click(()=>{
      $('.start_datepicker').pickadate({
        formatSubmit: 'yyyy-mm-dd',
        selectYears: true,
        selectMonths: true,
        max: new Date(),
        onSet: (context) => {
          this.startDate = new Date(context.select);
        }
      });
    });

    $('.end_datepicker').click(()=>{
      $('.end_datepicker').pickadate({
        formatSubmit: 'yyyy-mm-dd',
        selectYears: true,
        selectMonths: true,
        max: new Date(),
        onSet: (context) => {
          this.endDate = new Date(context.select);
        }
      });
    });

    $('.navRow').click((e)=>{
      e.stopPropagation();
    });

    for(var i=2017; i<2031; i++){
      this.years.push(i);
    }
    for(var i=0; i<12; i++){
      this.months.push(i);
    }

    //Automatically Generate Report
    // setTimeout(()=>{
    //   this.selectReport('Sales Summary');
    // }, 200);

  }


  showBlock(){
    $('#report-panel').block({ message: 'Please Wait...' });
  }
  
  
  hideBlock(){
    $('#report-panel').unblock();
  }

  
  printReportDate(){
    let frequency = this.frequency;
    console.log(frequency);


    //************ HOUR ************//
    if(frequency === 'Hour'){
      if(!this.reportDay || !this.reportHour){
        alert('Day and Hour is required');
      }
      this.reportGranularity = getHourDate(this.reportDay, this.reportHour);
    }

    //************ HOURLY ************//
    if(frequency === 'Hourly'){
      if(!this.reportStartDay || !this.reportStartHour || !this.reportEndDay || !this.reportEndHour){
        alert('Day and Hour is required');
      }
      this.reportGranularity = getHourRangeDate(this.reportStartDay, this.reportStartHour, this.reportEndDay, this.reportEndHour);
    }




    //************ DAY ************//
    if(frequency === 'Day'){
      if(!this.reportDay){
        alert('Day is required');
      }

      this.reportGranularity = getDayDate(this.reportDay);
    }

    //************ DAILY ************//
    if(frequency === 'Daily'){
      if(!this.reportStartDay || !this.reportEndDay){
        alert('Start and End Day is required');
      }

      this.reportGranularity = getDayRangeDate(this.reportStartDay, this.reportEndDay);
    }




    //************ MONTH ************//
    if(frequency === 'Month'){
      if(!this.reportMonth || !this.reportYear){
        alert('Day and Year is required');
      }

      this.reportGranularity = getMonthDate(this.reportMonth, this.reportYear);
    }

    //************ MONTHLY ************//
    if(frequency === 'Monthly'){
      if(!this.reportStartMonth || !this.reportStartYear || !this.reportEndMonth || !this.reportEndYear){
        alert('Start and End Month and Year is required');
      }

      this.reportGranularity = getMonthRangeDate(this.reportStartMonth, this.reportStartYear, this.reportEndMonth, this.reportEndYear);
      
   }

    //************ YEAR ************//
    if(frequency === 'Year'){
      if(!this.reportYear){
        alert('Year is required');
      }

      this.reportGranularity = getYearDate(this.reportYear);
    }

    //************ YEARLY ************//
    if(frequency === 'Yearly'){
      if(!this.reportStartYear || !this.reportEndYear){
        alert('Start and End Year is required');
      }

      this.reportGranularity = getYearRangeDate(this.reportStartYear, this.reportEndYear);
    }


    console.log(this.reportGranularity);
    
    this.generateReport();

  }
  

  dateSelected(){
    
  }


  generateReport(){

    if(!this.reportType){
      alert('Report Type is required');
      return;
    }

    if(!this.measure){
      alert('Measure is required');
      return;
    }

    this.message = moment(this.reportGranularity.start).format('Do MMM YYYY hh:ss A')+' - '+moment(this.reportGranularity.end).format('Do MMM YYYY hh:ss A');

    let pre = ()=>{
      this.generatingReport = true;
      this.displayReport = false;
      this.showBlock();
    };

    let success = (res)=>{
      if(this.reportType === REPORT_TYPE.SALES_SUMMARY) this.eventService.broadcast('rg', res);
      if(this.reportType === REPORT_TYPE.USER) this.eventService.broadcast('user-sales-report', res);
      if(this.reportType === REPORT_TYPE.CUSTOMER) this.eventService.broadcast('customer-sales-report', res);
      if(this.reportType === REPORT_TYPE.OUTLET) this.eventService.broadcast('outlet-sales-report', res);
      this.generatingReport = false;
      this.displayReport = true;
      this.eventService.broadcast('show-product', this.showProduct);
      this.hideBlock();
    };

    let error = (err)=>{
      alert('Unable to generate Report at the moment');
      this.generatingReport = false;
      this.displayReport=true;
    };

    let processWebservice = (obs: Observable<any>)=>{
      pre();
      obs.subscribe(
        res =>{
          success(res);
        },
        err =>{
          error(err);
        }
      );
    };


    if(this.reportType === REPORT_TYPE.SALES_SUMMARY){
      processWebservice(this.reportService.generateReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue));

      this.reportService.generateProductReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue)
        .subscribe(
          res => {
            this.eventService.broadcast('pr', res);
          }
        );
    }

    if(this.reportType === REPORT_TYPE.USER){
      processWebservice(this.reportService.generateUserReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue));

      this.reportService.generateUserProductReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue)
        .subscribe(
          res => {
            this.eventService.broadcast('user-product-report', res);
          }
        );
    }

    if(this.reportType === REPORT_TYPE.CUSTOMER){
      processWebservice(this.reportService.generateCustomerReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue));

      this.reportService.generateCustomerProductReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue)
        .subscribe(
          res => {
            this.eventService.broadcast('customer-product-report', res);
          }
        );
    }

    if(this.reportType === REPORT_TYPE.OUTLET){
      processWebservice(this.reportService.generateOutletReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue));

      this.reportService.generateOutletProductReportCluster(this.reportGranularity, this.getReportTypeKey(this.reportType), this.measureValue)
        .subscribe(
          res => {
            this.eventService.broadcast('outlet-product-report', res);
          }
        );
    }

  }

  selectReport(report){
    this.reportType = report;
    this.navigate(this.reportType);

    setTimeout(()=>{
      this.genReport();
    }, 500);
  }

  genReport = ()=>{
    if(this.measure === 'Measure') return;
    if(this.startDate && this.endDate && this.reportType){
      this.generateReport();
    }
  };

  selectMeasure(measure, value){
    this.measure = measure;
    this.measureValue = value;

    this.genReport();
  }

  setFrequency(event, frequency){
    event.stopPropagation();
    this.frequency = frequency;
  }

  setFrequencyType(event, type, d_top=1){
    event.stopPropagation();
    this.frequencyType = type;
    this.d_top_selection = d_top;
  }

  prevent(event){
    event.stopPropagation();
  }

  getMeasureKey(measure){

    if(measure === 'Basket Size') return 'basket-size';
    if(measure === 'Basket Value') return 'basket-value';

    console.log('Moving to switch...');

    switch(measure){
      case 'Basket Size' : return 'basket-size';
      case 'Basket Value' : return 'basket-value';
      case 'Cost of Goods' : return 'cost-of-goods';
      case 'Customer Count' : return 'customer-count';
      case 'Discount' : return 'discount';
      case 'Gross Profit' : return 'gross-profit';
      case 'Item Sold' : return 'items-sold';
      case 'Margin' : return 'margin';
      case 'Return %' : return 'return';
      default: return 'basket-size';
    }
  }

  getReportTypeKey(type){
    switch (type){
      case REPORT_TYPE.SALES_SUMMARY: return 'sales-summary';
      case REPORT_TYPE.USER: return 'user';
      case REPORT_TYPE.CUSTOMER: return 'customer';
      case REPORT_TYPE.OUTLET: return 'outlet';

      default: return 'sales-summary';
    }
  }

  toggleProduct(){
    this.showProduct = !this.showProduct;
    this.eventService.broadcast('show-product', this.showProduct);
  }

  navigate(reportType){
    if(reportType === REPORT_TYPE.SALES_SUMMARY){
      this.router.navigate(['/sales-report-cluster/summary']);
    }

    if(reportType === REPORT_TYPE.USER){
      this.router.navigate(['/sales-report-cluster/user']);
    }

    if(reportType === REPORT_TYPE.CUSTOMER){
      this.router.navigate(['/sales-report-cluster/customer']);
    }

    if(reportType === REPORT_TYPE.OUTLET){
      this.router.navigate(['/sales-report-cluster/outlet']);
    }
  }

   wait(){
            $.blockUI({
               message: '<h4>Please wait...</h4>',
               centerY: false,
               centerX: false,
               css:{
                  position: 'fixed',
                  margin: 'auto 0',
                  padding: '3px',
                  font: '15px',
                  border: '1px solid #a00',backgroundColor: '#ddd'
           }
             });
               setTimeout($.unblockUI, 400); 
    }
}
