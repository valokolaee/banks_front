import IUser from "../../../intrfaceces/IUser";
import IResponse from "./IResponse";
 
export default interface ILoginReq {
    email: string;
    password: string
}
export interface ILoginRes extends IResponse<IUser>  {}