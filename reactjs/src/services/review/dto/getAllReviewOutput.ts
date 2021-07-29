export interface GetAllReviewOutput {
  comment: string;
  ownerUserId: number;
  rate: number;
  objectId: number | null;
  visitDate: String;
  creationTime: string;
  activeReplyId: number;
  activeReplyMessage: String;
  objectName: string;
  id: number
}
