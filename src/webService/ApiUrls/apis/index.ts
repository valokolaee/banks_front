import IUser from '../../../intrfaceces/IUser';
import { IPool } from '../../../intrfaceces/types';
import { ModelApi } from '../ModelApi';
import ILoginReq from './ILogin';
import IRegisterReq from './IRegister';

export default {

  auth: {
    folderUrl: 'auth',
    login(body: ILoginReq) { return mdlr({ axiosType: 'post', apiUrl: 'login', folderUrl: 'auth', body }) },
    // registerUser(body: IRegisterReq) { return mdlr({ axiosType: 'post', apiUrl: 'registerUser', folderUrl: 'auth', body }) },
    register(body: IRegisterReq) { return mdlr({ axiosType: 'post', apiUrl: 'register', folderUrl: 'auth', body }) },
    getMe: mdlr({ axiosType: 'get', apiUrl: 'me', folderUrl: 'auth', }),
  },

  users: {
    folderUrl: 'users',
    stats: mdlr({ axiosType: 'get', folderUrl: 'users', }),
    user(body: { userId: number; }) { return mdlr({ axiosType: 'get', body, folderUrl: this.folderUrl }) },
    investments: mdlr({ axiosType: 'get', apiUrl: 'investments', folderUrl: 'users', }),
    bank_affiliations: mdlr({ axiosType: 'get', apiUrl: 'bank-affiliations', folderUrl: 'users', }),
    referrals: mdlr({ axiosType: 'get', apiUrl: 'referrals', folderUrl: 'users', }),
    loans: mdlr({ axiosType: 'get', apiUrl: 'loans', folderUrl: 'users', }),
    profile(body: IUser) { return mdlr({ axiosType: 'put', apiUrl: 'profile', folderUrl: this.folderUrl, body }) },
    updateAvatar(body: any) { return mdlr({ axiosType: 'put', apiUrl: 'avatar', folderUrl: this.folderUrl, body }) },
  },

  pools: {
    folderUrl: 'pools',
    services(poolId: number) { return mdlr({ axiosType: 'get', apiUrl: poolId, apiUrl2: 'services', folderUrl: this.folderUrl, }) },
    getAll() { return mdlr({ axiosType: 'get', folderUrl: 'pools', }) },
    update(body:Partial <IPool>) { return mdlr({ axiosType: 'put', folderUrl: 'pools',body }) }
    
  },

  banks: {
    folderUrl: 'banks',
    getAll() { return mdlr({ axiosType: 'get', folderUrl: this.folderUrl }) },
    services(bankId: number) { return mdlr({ axiosType: 'get', apiUrl: bankId, apiUrl2: 'services', folderUrl: this.folderUrl, }) },
  }


};




export function mdlr<T = any>(model: ModelApi<T>) {
  return model;
}
