import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/services/all-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allreportTableData: any;


  alldataArray: any = [];



    // Pie
    public pieChartOptions: ChartOptions<'pie'> = {
      responsive: false,
    };
    public pieChartLabels = [['closed'], ['completed'], ['compltedOn'], ['created'], ['hold'], ['inProgress'], ['isItemReplaced'],['notanIssue'],['pending'],['reOpened'],['ticketCount'], ];

    public pieChartDatasets = [
      {
        data: [] = this.alldataArray,
        backgroundColor: ['#6699ff', '#1aa57c', '#66ccff', '#2556cc', '#cc3399', '#ff4081', '#33cc33', '#666600', '#ffa500', '#ffa500', '#8845f5'],


      },
    ];

    public pieChartLegend = true;
    public pieChartPlugins = [];

    getall(){
      this.service.getTotal(this.datafile).subscribe((res: any) => {

        console.log("alltotal", res);

        this.allreportTableData = res;




        this.alldataArray.push(
           this.allreportTableData[1].closed,
           this.allreportTableData[1].completed,
           this.allreportTableData[1].compltedOn,
           this.allreportTableData[1].created,
           this.allreportTableData[1].hold,
           this.allreportTableData[1].inProgress,
           this.allreportTableData[1].isItemReplaced,
           this.allreportTableData[1].notanIssue,
           this.allreportTableData[1].pending,
           this.allreportTableData[1].reOpened,
           this.allreportTableData[1].ticketCount,
          //  this.allreportTableData[1].yearId,
           );

          //  this.pieChartDatasets[0].data[0] = this.alldataArray

          //  this.pieChartDatasets = [
          //   {
          //     data: [this.alldataArray],
          //   },
          // ];

        console.log(this.pieChartDatasets[0], "ALL array");


        // this.pieChartDatasets[0].push(this.allreportTableData[1])\



        // if (res.error_status == 1) {
        //   this.getallMaster()
        //   this.toastr.success(res.error_message);
        //   this.resetform()
        // } else {
        //   this.toastr.error(res.error_message);
        // }
      })
    }


    // bar


  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'closed', 'completed', 'compltedOn', 'created', 'hold', 'inProgress', 'isItemReplaced', 'notanIssue', 'pending', 'reOpened', 'Ticket Count' ],
    datasets: [
      { data: [] = this.alldataArray, label: 'All Status', backgroundColor: ["#3399ff"], hoverBackgroundColor: ["#3399ff"]
       },

    ]
  };



  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };



  constructor(private service: AllServicesService,private toastr:ToastrService) {

  }

  ngOnInit() {
    this.getall();
  }

  datafile:any





}
