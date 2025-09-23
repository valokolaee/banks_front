import { numString } from 'mrv-utils';
import axType from './axType';

export interface ModelApi<T = any> {
  folderUrl?:string
  axiosType: axType;
  apiUrl?: numString;
  apiUrl2?: string;
  desc?: string;
  body?: T
}


 
