import {Component, OnInit, AfterViewInit} from '@angular/core';
import {InventoryService} from './services/inventory-service.component';
import {InventoryEventService} from './services/inventory-event-service.component';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {REPORT_TYPE, INVENTORY_REPORT_TYPE} from "../shared/util/constant";
declare var $:any, pickadate:any, moment:any;
@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit, AfterViewInit {
  cursorChange : boolean = true;
  startDateLabel : string = 'Expiry Start Date';
  endDateLabel : string = 'Expiry End Date';
  isDisabled : boolean = false;
  measureDisabled : boolean;
  apiMeasureEnumValue: string;
  apiReportTypeEnumValue : number;
  reportType = 'Expiry List';
  measure = 'Item';
  measureValue: String;
  startDate;
  endDate;
  momentStartObj;
  momentEndObj;
  start;
  end;
  navigationUrl : string;
  reportTypeCheck : string = '';
  measureTypeCheck : string = '';
  generatingReport = false;
  periodFrom: Date;
  periodTo: Date;
  itemNameSummary;
  brandNameSummary;
  warehouseSummary;
  hiddenBR : boolean = false;
  hiddenWH : boolean = false;
  view : boolean = false;
  limit : number = 10;

  //New Code
  startDateConvertedString;
  endDateConvertedString;
  displayReport = false;
  showProduct = false;
  userName : string;
  logo : any;
  tenantName : string;

  constructor(private router: Router, private inventoryService: InventoryService, 
    private eventService: InventoryEventService,private sanitizer: DomSanitizer) { }


  ngOnInit() {
    let userInfo = localStorage.getItem('user_info');
    let jsonObj = JSON.parse(userInfo);
    this.userName = jsonObj['userName'];
    this.tenantName = jsonObj['tenantName'];
    this.logo = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + jsonObj['tenantLogo']);
  }

  ngAfterViewInit() {
     $('.start_datepicker').click(()=>{
      $('.start_datepicker').pickadate({
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





  genReport = ()=>{
    /* if(this.measure === 'Measure') return;
    if(this.startDate && this.endDate && this.reportType){
      this.generateReport();
    } */
  };

  selectMeasure(measure, value){
    this.measure = measure;
    this.measureValue = value;

    //this.genReport(); 
  }

  selectReport(report){
    this.reportType = report;
    if(report === 'Stock Availability' || report === 'Stock Aging' || report === 'Stock Value' 
     || report === 'Below Min Qty'){
       this.isDisabled = true;
       this.measureDisabled = false;
       this.startDateLabel = null;
       this.endDateLabel = null;
       this.cursorChange = false;
       this.view = true;
       this.startDate = null;
       this.endDate = null;
       this.measure = "Item";
       this.measureValue = "item";
       this.hiddenWH = false;
       this.hiddenBR = false;
    }if(report === 'Inventory Listing'){
       this.isDisabled = true;
       this.startDateLabel = null;
       this.endDateLabel = null;
       this.measureDisabled = true;
       this.measure = "Item";
       this.measureValue = "item";
       this.hiddenWH = true;
       this.hiddenBR = true;
       this.view = true;
    }else if(report === 'Stock Movement'){
       this.measureDisabled = false;
       this.isDisabled = false;
       this.startDateLabel = 'Date From';
       this.endDateLabel = 'Date To';
       this.hiddenWH = true;
       this.hiddenBR = false;
       this.view = true;
    }else if(report === 'Expiry List' || report === 'Best Selling' || report === 'Worst Selling'){
          if(report === 'Expiry List'){
             this.startDateLabel = 'Expiry Start Date';
             this.endDateLabel = 'Expiry End Date';
          }else if(report === 'Best Selling') {
            this.startDateLabel = 'Best Selling From';
            this.endDateLabel = 'Best Selling To';
          } else if(report === 'Worst Selling') {
            this.startDateLabel = 'Worst Selling From';
            this.endDateLabel = 'Worst Selling To';
          }
      this.isDisabled = false;
      this.measureDisabled = false;
      this.cursorChange = true;
      this.hiddenWH = false;
      this.hiddenBR = false;
      this.view = true;
    }
  }


  //change the view
  navigate(url){
     this.router.navigate([url]);
  }
       
                      //When the view report button is clicked
  viewReport(){
   
    if(this.reportType === 'Stock Availability' || this.reportType === 'Stock Aging' || this.reportType === 'Stock Value' 
    || this.reportType === 'Below Min Qty'  || this.reportType === 'Inventory Listing'){
       
    } else{
        if(!this.startDate){
           alert('Please select the start date to proceed!');
              return;
        }
    
        if(!this.endDate){
           alert('Please select the end date to proceed!');
              return;
        }
    }
 
            //if the start date, end date, measurevalue and measure are all selected
    if(this.view && this.measureValue && this.measure){

        //if the end date is less than the start date
        if(this.end < this.start){
                     //stop processing of reports
                alert("The end date must be greater than the start date");
                return;
        }else{ 
             switch(this.reportType){
                  case 'Expiry List':
                     this.apiReportTypeEnumValue = 1;
                     break;
                  case 'Stock Availability':
                     this.apiReportTypeEnumValue = 2;
                     break;                
                  case 'Stock Aging':
                     this.apiReportTypeEnumValue = 3;
                     break;                      
                  case 'Stock Value':
                     this.apiReportTypeEnumValue = 4;
                     break;
                  case 'Best Selling':
                     this.apiReportTypeEnumValue = 5;
                     break;
                  case 'Worst Selling':
                     this.apiReportTypeEnumValue = 6;
                     break;                              
                  case 'Below Min Qty':
                     this.apiReportTypeEnumValue = 7;
                     break;
                  case 'Stock Movement':
                     this.apiReportTypeEnumValue = 8;
                     break;
                  case 'Inventory Listing':
                     this.navigationUrl = 'inventory-report/inventory-listing-summary';
                     this.apiReportTypeEnumValue = 9;
                     break;
                  }  
                    //navigate to the requested report page and generate the report
                      /////this.navigate(this.navigationUrl);
                      this.prepareReportProcessingParams();
              }
    }

  }


  prepareReportProcessingParams() : void{
    if(this.measure === "Item"){
       this.apiMeasureEnumValue = "item_name";
       let searchUrl = "sales-report-service/item-summary";
       this.generateReport(searchUrl);
    }else if(this.measure === "Brand"){
       this.apiMeasureEnumValue = "brand_name";
       let searchUrl = "sales-report-service/brand-summary";
       this.generateReport(searchUrl);
    }else if(this.measure === "Warehouse"){
      this.apiMeasureEnumValue = "warehouse";
      let searchUrl = "sales-report-service/warehouse-summary";
      this.generateReport(searchUrl);
    }
  }

  generateReport(urlLink){
     let processWebService = (obs: Observable<any>) => {
      pre();
      obs.subscribe(
        res => {
          success(res);
        },
        err => {
          error(err);
        }
      );
    };


    let pre = ()=>{
      this.showBlock();
    };
 
    
    //Check for the success of the data received 
    let success = (res) => {
          performChecks(res);
          this.periodFrom = this.startDate;
          this.periodTo = this.endDate;
 
          this.hideBlock();
    };

    let performChecks = (res) => {
          this.reportTypeCheck = this.reportType;
          if(this.measure === "Item"){
              this.measureTypeCheck = this.measure;
              this.itemNameSummary = res;
          }else if(this.measure === "Brand"){
              this.measureTypeCheck = this.measure;
              this.brandNameSummary = res;
          }else if(this.measure === "Warehouse"){
              this.measureTypeCheck = this.measure;
              this.warehouseSummary = res;
          }
    }

    let error = (err) => {
      alert('Unable to generate Report at the moment');
      //this.hideBlock();
    };

    // let startDtStr = this.momentStartObj.format("YYYY-MM-DD");
     //let endDtStr = this.momentEndObj.format("YYYY-MM-DD");
    //  processWebService( this.inventoryService.generateReport
    //               (urlLink,startDtStr,endDtStr,this.apiMeasureEnumValue,this.apiReportTypeEnumValue));
         
    if(this.reportType === 'Stock Availability' || this.reportType === 'Stock Aging' || this.reportType === 'Stock Value' 
    || this.reportType === 'Below Min Qty'  || this.reportType === 'Inventory Listing'){
        this.startDateConvertedString = null;
        this.endDateConvertedString = null;
    }else {
        this.startDateConvertedString =  this.momentStartObj.format("YYYY-MM-DD");
        this.endDateConvertedString = this.momentEndObj.format("YYYY-MM-DD");
    }

    processWebService( this.inventoryService.generateReport
                  (urlLink,this.startDateConvertedString,this.endDateConvertedString,
                      this.apiMeasureEnumValue,this.apiReportTypeEnumValue));
         
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

  delay(){
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
