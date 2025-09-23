import { ModelApi } from '../ModelApi';
import MainUrler from './MainUrler';
import QueryStringer from './QueryStringer';

import baseUrl from './baseUrl';


export default (model: ModelApi, qStrings?: any) => {
   
  var qString = '';
  if (!!qStrings) {
    qString = QueryStringer(qStrings);
  }

  const finalUrl = baseUrl + MainUrler(model) + qString;
  console.log(finalUrl);

  return finalUrl;
};
