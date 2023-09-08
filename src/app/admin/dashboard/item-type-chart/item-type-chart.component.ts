import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { AllServicesService } from 'src/services/all-services.service';

@Component({
  selector: 'app-item-type-chart',
  templateUrl: './item-type-chart.component.html',
  styleUrls: ['./item-type-chart.component.scss']
})
export class ItemTypeChartComponent implements OnInit {


  issueTypenames: any =[];
  completedData: any = [];
  pendingData: any =[];
  labels: any;
  barreportTableData:any;
    datafile:any
  sweeterArray: any;
  public barChartLegend = true;
  public barChartPlugins = [];



  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [] = this.issueTypenames,
    datasets: [

    ]
  };



  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };





  getall(){
    this.service.getItemTypeTotal(this.datafile).subscribe((res: any) => {

      console.log("item type Chart", res);

      this.barreportTableData = res;

  this.barreportTableData.forEach((element:any) => {
    console.log(element.completed, "all data");
    this.issueTypenames.push(element.month)



  });

  console.log(this.issueTypenames, "array data");

  this.barChartData = {
    labels: [] =  this. issueTypenames,
    datasets: [
      { data: [] = this.completedData, label: 'Pending',  backgroundColor: ["orange"], hoverBackgroundColor: ["#0099ff"] },
      { data: [] = this.pendingData, label: 'Hold', backgroundColor: ["#cc3399"] , hoverBackgroundColor: ["#cc3399"]}
    ]
  }

  var skinName = this.barreportTableData.find((x:any)=>x.pending).pending;


  console.log(skinName, "DATA FIRST");



//   this.sweeterArray = this.barreportTableData.map((sweetItem:any) => {
//     return sweetItem.ticketCount

// })



  this.barreportTableData.forEach((element:any) => {

    this.completedData.push(element.pending)

    console.log(this.completedData, "completed data");
  });


  this.barreportTableData.forEach((element:any) => {

    this.pendingData.push(element.hold)

    console.log(this.pendingData, "Hold data");
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
