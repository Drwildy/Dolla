import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Envelope } from '../envelope';
import { EnvelopeService } from '../envelope.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home-envelope-details',
  templateUrl: './home-envelope-details.component.html',
  styleUrls: ['./home-envelope-details.component.css']
})
export class HomeEnvelopeDetailsComponent implements OnInit {

  public envelopeName: string;
  public envelopeAmount: number;
  public envelopeSetAmount: number;
  public envelopeIcon: string;
  public envelopeID: number; 

  public id: number; 
  public myEnvelope: Envelope;
  public editEnvIcon: string;


  my_Bar_Chart: any;
  my_Dougnnut_Chart: any;


  //receives query data from another component
  constructor(private route: ActivatedRoute, private envelopeService: EnvelopeService, private elementRef: ElementRef, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.envelopeID = params["envelopeID"]
    });
    this.id = this.envelopeID; 
    this.getEnvelopeByID();
  
  }


  getEnvelopeByID() {
    this.envelopeService.getEnvelopeById(this.id)
      .subscribe((envelope: Envelope) => {
        this.myEnvelope = envelope;
        this.my_Dougnnut_Chart_Display();
      });
  }
  goToBudget() {
    this.router.navigate(["/budget"]);
  }
  editEnvelopeIcon() {
    let editEnvelopeInfo: Envelope = this.myEnvelope;
    if (this.editEnvIcon != null) {
      editEnvelopeInfo.icon = this.editEnvIcon; 
    }
    //edit envelope through envelope service
    try {
      this.envelopeService.editEnvelope(this.id, editEnvelopeInfo)
        .subscribe(
          result => {
            this.envelopeService.dataChanged$.emit();
           
          }
        );
    } catch{
     
    }

  }
   
  ngOnInit() {
    this.chartDisplay();
  }
  // Variables for displaying charts. 
  public envelopes: Envelope[];
  public envelopesName = [];
  public envelopesAmount = [];
  public envelopesSetAmount = [];


  chartDisplay() {
    this.envelopeService.getEnvelopes()
      .subscribe((envelopes: Envelope[]) => {
        this.envelopes = envelopes;
        /* This code here will render the bar chart.
         *
         * 
        
        this.envelopesName = [];
        this.envelopesAmount = [];
        this.envelopesSetAmount = [];

        for (let env of envelopes) {
          this.envelopesName.push(env.name);
          this.envelopesAmount.push(env.amount);
          this.envelopesSetAmount.push(env.setAmount);
        }
        this.my_Bar_Chart_Display();
       */
       
      });
  }
  my_Dougnnut_Chart_Display() {
   
    this.my_Dougnnut_Chart = new Chart('doughnut_chart', {
      type: "doughnut",
      data: {
        labels: ['Total', 'Accumulated'],
        datasets: [
          {
            label: '',
            data: [this.myEnvelope.setAmount, this.myEnvelope.amount],
            backgroundColor: ['#2A6735','#C12807'],
            borderWidth: 1,
          },
        ]
      },
      options: {
        title: {
          display: false,
          text: "",
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position:"left",
          display: false,
          
        },
        responsive: true,
      }
    });
  }


  my_Bar_Chart_Display() {
    this.my_Bar_Chart = new Chart('bar_chart', {
      type: "bar",
      data: {
        labels: this.envelopesName,
        datasets: [
          {
            label: 'Envelope Allowance',
            data: this.envelopesSetAmount,
            backgroundColor: "#2A6735",
            borderWidth: 1,
          },
          {
            label: "Envelope Expense",
            data: this.envelopesAmount,
            backgroundColor: "#C12807",
            borderWidth: 1,

          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Overall Envelopes Status",
        },
        tooltips: {
          mode: 'nearest',
          intersect: true
        },
        legend: {
          display:true,
          position: 'left'
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }

    });

  }

}
