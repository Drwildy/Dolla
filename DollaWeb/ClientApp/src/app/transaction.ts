
export class Transaction {
  id: number;
  username: string;
  type: string;
  transferFromId: number;
  transferToId: number;
  transferAmount: number;
  transactionDate: Date;
}
