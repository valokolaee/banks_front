
export default interface IUser {
    id?: number;
    username?: string;
    email?: string;
    passwordHash?: string;
    roleId?: number;
    clientType?: 'individual' | 'financial_entities' | 'business';
    referralCode?: string | null;
    referrer?: number | null;
    rankId?: number | null;
    logoUrl?: string | null;
    profileImage?: string | null;
    csvUrl?: string | null;
    createdAt?: Date;
token?:string
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