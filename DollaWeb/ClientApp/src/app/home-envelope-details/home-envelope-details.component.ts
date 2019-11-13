import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Envelope } from '../envelope';
import { EnvelopeService } from '../envelope.service';

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
   
  //receives query data from another component
  constructor(private route: ActivatedRoute, private envelopeService: EnvelopeService) {

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
            console.log("Edit Successful. ")
          }
        );
    } catch{
      console.log("Error Encountered")
    }

  }
   
  ngOnInit() {
  }

}
