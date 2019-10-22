
export class Transaction {
  id: number;
  applicationUserId: string;
  type: string;
  transferFromId: number;
  transferToId: number;
  transferAmount: number;
  transactionDate: Date;
}
