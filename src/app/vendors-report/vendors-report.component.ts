import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ReportService} from "../shared/services/ReportService";
import {EventsService} from "../shared/events/EventsService";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {REPORT_TYPE, INVENTORY_REPORT_TYPE} from "../shared/util/constant";
import {getTodayDate} from "../shared/util/dateTimeUtil";
import { VendorsService } from './services/vendors-service.component';
import { VendorEventServiceComponent} from './services/vendor-event-service.component';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
declare var $:any, pickadate:any, moment:any;
@Component({
  selector: 'app-vendors-report',
  templateUrl: './vendors-report.component.html',
  styleUrls: ['./vendors-report.component.css']
})
export class VendorsReportComponent implements OnInit, AfterViewInit {
  //Vendor Summary ResultSet types
  brandProducts;
  vendorPayments;
  vendorPerformance;

  //Procurement ResultSet types
  vendorsResultSet;
  itemResultSet;
  purchaseOrderResultSet;
  categoryResultSet;

  limit : number = 10;
  rp1_hidden : boolean = false;
  rp2_hidden : boolean = true;
  strLength : number = 0;
  messageToDisplay = '';
  
  start;
  end;
  reportCheck = true;
 
  controllerVar = false;   //used to control the showing of a particular report
  reportTypeControllerVar = ''; //uses the report type to change the report to show

  reportType = 'Vendor Summary';
  measure = 'Vendor Performance';
  measureValue = 'vendor-performance';
  frequency = 'Week';
  frequencyType = 'Compare Dates';
  message = '';
  startDate: Date;
  endDate: Date;
  momentStartObj;
  momentEndObj;
  showReportPanel;
  d_top_selection = 2;
  generatingReport = false;
  displayReport = false;
  reportGranularity:any;

  userName : string;
  logo : any;
  tenantName : string;

  constructor(private vendorService : VendorsService, 
       private router: Router, 
       private vendorEventService : VendorEventServiceComponent,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let userInfo = localStorage.getItem('user_info');
    let jsonObj = JSON.parse(userInfo);
    this.userName = jsonObj['userName'];
    this.tenantName = jsonObj['tenantName'];
    this.logo = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + jsonObj['tenantLogo']);
  }

  ngAfterViewInit() {
   // this.startDate.setHours(0,0,0,0);
    //this.endDate.setHours(0,0,0,0);

    this.reportGranularity = getTodayDate();

    $('.start_datepicker').click(()=>{
      $('.start_datepicker').pickadate({
        //format: 'dddd, dd mmm, yyyy',
        formatSubmit: 'yyyy-mm-dd',
        hiddenName: true,
        onClose: function() {
           $('.start_datepicker').blur();
        },
        onSet: (context) => {
          let startDateObj = new Date(context.select);
          this.start = startDateObj;
          this.momentStartObj = moment(startDateObj);
          this.startDate = this.momentStartObj.format("Do MMM YYYY");
        }
        
      });
    });

    $('.end_datepicker').click(()=>{
      $('.end_datepicker').pickadate({
         //format: 'dddd, dd mmm, yyyy',
        formatSubmit: 'yyyy-mm-dd',
        hiddenName: true,
        onClose: function() {
           $('.end_datepicker').blur();
        },
        onSet: (context) => {
          let endDateObj = new Date(context.select);
          this.end = endDateObj;
          this.momentEndObj = moment(endDateObj);
          this.endDate = this.momentEndObj.format("Do MMM YYYY");
        }
      });
    });

    
  }
 
 setMeasure(measure, value){
    this.measure = measure;
    this.measureValue = value;
    this.showReportPanel = !this.showReportPanel;
  }

  selectReport(report){
    this.reportType = report;
    if(this.reportType === 'Vendor Summary') {
        this.rp1_hidden = false;
        this.rp2_hidden = true;
        this.measure = 'Vendor Performance';
        this.measureValue = 'vendor-performance';
    }
    if(this.reportType === 'Procurement') {
        this.rp1_hidden = true;
        this.rp2_hidden = false;
        this.measure = 'By Vendor';
        this.measureValue = 'vendors';
    }
  }

 //Called to show the content of each of the reports
 viewReport(){

    if(!this.startDate){
      alert('Please select the start date to proceed!');
      return;
    }
    
   if(!this.endDate) {
      alert('Please select the end date to proceed!');
      return;
    }

    if (this.startDate && this.endDate && this.measureValue && this.measure && this.reportType) {
            if (this.end < this.start) {
                      //stop processing of reports
                alert('The end date must be greater than the start date');
                return;
            } else {                 
               if(this.reportType === 'Vendor Summary') {
                    if (this.measureValue === 'brand') {
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'brand';
                        this.generateReport('sales-report-service/by-brand');
                    } else if(this.measureValue === 'vendor-payments') {
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'vendor-payments';
                        this.generateReport('sales-report-service/by-vendor-payments');
                    } else if(this.measureValue === 'vendor-performance') {
                        //this.delay();
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'vendor-performance';
                        this.generateReport('sales-report-service/by-vendor-performance');
                    }
               } else if (this.reportType === 'Procurement') {
                      if (this.measureValue === 'vendors') {
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'vendors';
                        this.generateReport('sales-report-service/by-vendors');
                      } else if (this.measureValue === 'item') {
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'item';
                        this.generateReport('sales-report-service/by-item');
                      } else if (this.measureValue === 'purchase order') {
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'purchase order';
                        this.generateReport('sales-report-service/by-purchase-order');
                      }else if (this.measureValue === 'item category') {
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'item category';
                        this.generateReport('sales-report-service/by-category');
                      } else if (this.measureValue === 'brand') {
                        this.controllerVar = true;
                        this.reportTypeControllerVar = 'brand';
                        this.generateReport('sales-report-service/by-brand');
                      }
                }
            }    
    }

   
 }

 getVendorReport(rep) {
  this.strLength = rep['report']['reports'][0].brandNames.length;
  return rep['report']['reports'];
}

//generate reports for each of the criteria/ measure 
  generateReport(urlSearchCriteria) {
     let processWebService = (obs: Observable<any>)=>{
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


     let pre = ()=>{
        this.showBlock();
    };

   let success = (res) => {
      if(this.measureValue === 'brand') {
          this.brandProducts = res;
          this.messageToDisplay = this.startDate + ' - ' + this.endDate;
      }else if(this.measureValue === 'vendor-payments'){
          this.vendorPayments = res;
          this.messageToDisplay = this.startDate + ' - ' + this.endDate;
      }else if(this.measureValue === 'vendor-performance'){
          this.vendorPerformance = res;
          this.messageToDisplay = this.startDate + ' - ' + this.endDate;
      } else if(this.measureValue === 'vendors') {
          this.vendorsResultSet = res;
          this.messageToDisplay = this.startDate + ' - ' + this.endDate;
      } else if(this.measureValue === 'item') {
          this. itemResultSet = res;
          this.messageToDisplay = this.startDate + ' - ' + this.endDate;
      } else if(this.measureValue === 'purchase order') {
          this.purchaseOrderResultSet =  res;
          this.messageToDisplay = this.startDate + ' - ' + this.endDate;
      } else if(this.measureValue === 'item category') {
          this.categoryResultSet =  res;
          this.messageToDisplay = this.startDate + ' - ' + this.endDate;
      }
      
      this.hideBlock();
    };

    let error = (err)=>{
      alert('Unable to generate Report at the moment');
    };



    let startDtStr = this.momentStartObj.format("YYYY-MM-DD");
    let endDtStr = this.momentEndObj.format("YYYY-MM-DD");

    switch(this.measureValue){
      case 'brand':
          processWebService(this.vendorService.generateBrandReport(urlSearchCriteria, startDtStr,endDtStr));
          break;       
      case 'vendor-payments':
          processWebService(this.vendorService.generatePaymentReport(urlSearchCriteria, startDtStr,endDtStr));
          break;
      case 'vendor-performance':
          processWebService(this.vendorService.generatePerformanceReport(urlSearchCriteria, startDtStr,endDtStr));
          break;
      case 'vendors':
          processWebService(this.vendorService.generateProcurementReport(urlSearchCriteria, startDtStr,endDtStr));
          break;
      case 'item':
          processWebService(this.vendorService.generateProcurementReport(urlSearchCriteria, startDtStr,endDtStr));
          break;
      case 'item category':
          processWebService(this.vendorService.generateProcurementReport(urlSearchCriteria, startDtStr,endDtStr));
          break;
      case 'purchase order':
          processWebService(this.vendorService.generateProcurementReport(urlSearchCriteria, startDtStr,endDtStr));
          break;
     }
  } //end generateReport


      delay() {
            $.blockUI({
               message: '<h1>Processing...</h1>',
               centerY: false,
               centerX: false,
               css:{
                  position: 'fixed',
                  margin: 'auto',
                  border: '2px solid #a00',backgroundColor: '#ddd'
      }
    });
            setTimeout($.unblockUI, 200); 
  }

  showBlock(){
                $.blockUI({
               message: '<h1>Processing...</h1>',
               centerY: false,
               centerX: false,
               css:{
                  position: 'fixed',
                  margin: 'auto',
                  border: '2px solid #a00',backgroundColor: '#ddd'
        }
  });
  }

  hideBlock(){
     $.unblockUI();
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
