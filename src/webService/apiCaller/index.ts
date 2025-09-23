import axios from "axios";
import { config } from "..";
import ApiUrlService from "../ApiUrls/apiUrlService";
import { ModelApi } from "../ApiUrls/ModelApi";
import { IAxiosResponse } from "../IAxiosResponse";
// import toast from '@/src/utilities/toast';



export default async (apiModel: ModelApi,) => {
    const body = { ...apiModel?.body,/*mac: ''*/ }
    // console.log(body);
    // console.log('h',config,apiModel);


    var res: IAxiosResponse;

    try {

        if (apiModel.axiosType === 'get') {
            res = await axios.get(ApiUrlService(apiModel, body), config,);
        } else {
            switch (apiModel?.axiosType) {
                case 'post':
                    res = await axios.post(ApiUrlService(apiModel, null), body, config);
                    break;
                case 'patch':
                    res = await axios.patch(ApiUrlService(apiModel, null), body, config);
                    break;
                case 'put':
                    res = await axios.put(ApiUrlService(apiModel, null), body, config);
                    break;
                case 'delete':
                    res = await axios.delete(ApiUrlService(apiModel, null), config);
                    break;
            }
        }


    } catch (error: any) {
        // copy([JSON.stringify(error)])
        // copy

        // console.log('error', error);

        res = error?.response;

        if (res?.status) {
            // mrvTxtTest.log(res.status);
        } else {
            // mrvTxtTest.log(error);
        }
    }

    return res
}