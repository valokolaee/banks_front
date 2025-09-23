import IUser from "../../../intrfaceces/IUser";
import ILoginReq from "./ILogin";
import IResponse from "./IResponse";


export default interface IRegisterReq extends ILoginReq {
    username: string;
    clientType: 'individual' | 'financial_entities' | 'business';
}

export interface IRegisterRes extends IResponse<IUser> {
     
}

// {
//   "success": true,
//   "message": "User registered successfully",
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTc1ODAwNTM0NiwiZXhwIjoxNzU4MDA4OTQ2fQ.whsi3NMOHcWx01493pfPKVRF9UMbU3tjxJ-sf-UxOcw",
//   "user": {
//     "createdAt": {
//       "val": "CURRENT_TIMESTAMP"
//     },
//     "id": 26,
//     "username": "123",
//     "email": "123@V.COM",
//     "passwordHash": "$2a$10$74BUMD2CnqH6GpYlhBKxDO38ky0J9Ubb0h0CrPTaoQzMyDhD/a66q",
//     "clientType": "financial_entities",
//     "roleId": 1
//   }
// }