import { numString } from "mrv-utils";
import { API, ASSET, BASE_URL, LOCAL_HOST } from "../../../config/env.config";
// all 
const baseUrl = BASE_URL// "https://w.bankon.click/";
export const localhost = LOCAL_HOST// "https://localhost:3002/";
const api = API// 'api/'
const asset = ASSET//'asset/'

export const csvUrler = (nameOrCode: numString) => `${baseUrl}${asset}data/report/${nameOrCode}.csv`
// https://w.bankon.click/asset/data/reportu/royal_kmn.csv

export default `${localhost}api/`;