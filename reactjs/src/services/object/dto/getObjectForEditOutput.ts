export interface Object {
  name: string;
  ownerUserId: number;
  rating: number;
  text1: string;
  text2: string;
  id: number;
}


export interface GetObjectForEditOutput {
  object: Object;
  grantedPermissionNames: string[];
}
