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
       
       console.log(this.myEnvelope);
      
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
    
    this.envelope_Bar_Chart();

  }

  envName = ["env1", "env2", "env3", "env4", "env5", "env6"];
  envAmount = [300, 400, 100, 500, 300, 200];
  envSetAmount = [100, 500, 300, 200, 399, 234];


  envelope_Bar_Chart() {
    this.my_Bar_Chart = new Chart('bar_chart', {
      type: "bar",
      data: {
        labels: this.envName,
        datasets: [
          {
            label: 'Envelope Allowance',
            data: this.envAmount,
            backgroundColor: "#2A6735",
            borderWidth: 1,
          },
          {
            label: "Envelope Expense",
            data: this.envSetAmount,
            backgroundColor: "#C12807",
            borderWidth: 1,

          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Overall Envelopes Details",

        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        legend: {
          position: 'top'
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
