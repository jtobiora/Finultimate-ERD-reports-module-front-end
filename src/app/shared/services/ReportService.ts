import {Injectable} from "@angular/core";
import {CrudService} from "./CrudService";


@Injectable()
export class ReportService {

  //uploadEndpoint:string = REST_BASE_URL+'upload-service/upload';

  constructor(private crudService: CrudService) {}

  //@@@@@@@@@@@@@@@@@@@@ POS SALES REPORT CREDENTIALS @@@@@@@@@@@@@@@@@@@@@@@
  generateReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure, user: user};
    return this.crudService.post('sales-report-service/generate-report', JSON.stringify(data));
  }

  generateProductReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-product-report', JSON.stringify(data));
  }

  generateUserReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-user-report', JSON.stringify(data));
  }

  generateUserProductReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-user-product-report', JSON.stringify(data));
  }

  generateCustomerReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-customer-report', JSON.stringify(data));
  }

  generateCustomerProductReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-customer-product-report', JSON.stringify(data));
  }

  generateOutletReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-outlet-report', JSON.stringify(data));
  }

  generateOutletProductReport(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-outlet-product-report', JSON.stringify(data));
  }



  //@@@@@@@@@@@@@@@@@@@@ CLUSTER SALES REPORT CREDENTIALS @@@@@@@@@@@@@@@@@@@@@@@
  generateReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure, user : user};
    return this.crudService.post('sales-report-service/generate-report-for-sales', JSON.stringify(data));
  }

  generateProductReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    //let data = {reportGranularity: granularity, reportType: reportType, measure:measure, user : JSON.parse(user)};
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure, user : user};
    //data['user' = JSON.parse(user);
    return this.crudService.post('sales-report-service/generate-product-report-for-sales', JSON.stringify(data));
  }

  generateUserReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-user-report-for-sales', JSON.stringify(data));
  }

  generateUserProductReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-user-product-report-for-sales', JSON.stringify(data));
  }

  generateCustomerReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-customer-report-for-sales', JSON.stringify(data));
  }

  generateCustomerProductReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-customer-product-report-for-sales', JSON.stringify(data));
  }

  generateOutletReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-outlet-report-for-sales', JSON.stringify(data));
  }

  generateOutletProductReportCluster(granularity:any, reportType:string, measure:string){
    let user = localStorage.getItem('user_info');
    let data = {reportGranularity: granularity, reportType: reportType, measure:measure,user:user};
    return this.crudService.post('sales-report-service/generate-outlet-product-report-for-sales', JSON.stringify(data));
  }
  
}
