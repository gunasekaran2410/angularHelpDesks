import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { AllServicesService } from 'src/services/all-services.service';

@Component({
  selector: 'app-departmentchart',
  templateUrl: './departmentchart.component.html',
  styleUrls: ['./departmentchart.component.scss']
})
export class DepartmentchartComponent implements OnInit {


  departmentCreated: any =[];
  completedData: any = [];
  pendingData: any =[];
  labels: any;
  barreportTableData:any;
    datafile:any
  sweeterArray: any;
  public barChartLegend = true;
  public barChartPlugins = [];



  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [] = this.departmentCreated,
    datasets: [

    ]
  };



  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };





  getall(){
    this.service.getDepartmentTotal(this.datafile).subscribe((res: any) => {

      console.log("Department Chart", res);

      this.barreportTableData = res;

  this.barreportTableData.forEach((element:any) => {
    console.log(element.completed, "all data");
    this.departmentCreated.push(element.departmentCreated)



  });

  console.log(this.departmentCreated, "array data");

  this.barChartData = {
    labels: [] =  this. departmentCreated,
    datasets: [
      { data: [] = this.completedData, label: 'Completed',  backgroundColor: ["#1aa57c"], hoverBackgroundColor: ["#1aa57c"] },
      { data: [] = this.pendingData, label: 'Pending', backgroundColor: ["orange"] , hoverBackgroundColor: ["orange"]}
    ]
  }

  var skinName = this.barreportTableData.find((x:any)=>x.departmentCreated).departmentCreated;


  console.log(skinName, "DATA FIRST");



//   this.sweeterArray = this.barreportTableData.map((sweetItem:any) => {
//     return sweetItem.ticketCount

// })



  this.barreportTableData.forEach((element:any) => {

    this.completedData.push(element.completed)

    console.log(this.completedData, "completed data");
  });


  this.barreportTableData.forEach((element:any) => {

    this.pendingData.push(element.pending)

    console.log(this.pendingData, "pending data");
  });




      // this.alldataArray.push(

      //    this.barreportTableData[1].completed,

      //    this.barreportTableData[1].pending,
      //    this.barreportTableData[1].reOpened,
      //    this.barreportTableData[1].ticketCount,
      //   //  this.barreportTableData[1].yearId,
      //    );

        //  this.pieChartDatasets[0].data[0] = this.alldataArray

        //  this.pieChartDatasets = [
        //   {
        //     data: [this.alldataArray],
        //   },
        // ];

      // console.log(this.pieChartDatasets[0], "ALL array");


      // this.pieChartDatasets[0].push(this.barreportTableData[1])\



      // if (res.error_status == 1) {
      //   this.getallMaster()
      //   this.toastr.success(res.error_message);
      //   this.resetform()
      // } else {
      //   this.toastr.error(res.error_message);
      // }
    })
  }

  constructor(private service: AllServicesService) {
  }
  ngOnInit(){
    this.getall();
  }
}
