import { Injectable } from "@angular/core";

@Injectable()
export class PaymentMethod {
  id: number;
  name: string;
  createdDate: Date;
  color: string;

}
