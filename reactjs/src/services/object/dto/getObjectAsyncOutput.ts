export interface GetObjectAsyncOutputItem {
  name: string;
  ownerUserId: number;
  rating: number;
  text1: string;
  text2: string;
  id: number;
}

export default interface GetObjectAsyncOutput {
  items: GetObjectAsyncOutputItem[];
}
