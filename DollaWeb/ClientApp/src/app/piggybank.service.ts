import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Piggybank } from './piggybank';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PiggybankService {

  constructor(private http: HttpClient) { }
  addItemTest(piggybank: Piggybank) {
    console.log(piggybank);
    this.http.post('/api/Piggybanks', piggybank)
      .subscribe();
    console.log("Added Piggybank");
  }


}
