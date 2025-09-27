import { numString } from "mrv-utils";

const baseUrl = "https://w.bankon.click/";
export const localhost = "https://localhost:3002/";
const api = 'api/'
const asset = 'asset/'

export const csvUrler = (nameOrCode: numString) => `${baseUrl}${asset}data/report/${nameOrCode}.csv`
// https://w.bankon.click/asset/data/reportu/royal_kmn.csv

export default `${localhost}api/`;