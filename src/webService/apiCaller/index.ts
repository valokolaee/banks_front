import axios from "axios";
import { config } from "..";
import ApiUrlService from "../ApiUrls/apiUrlService";
import { ModelApi } from "../ApiUrls/ModelApi";
import { IAxiosResponse } from "../IAxiosResponse";
import { localhost } from "../ApiUrls/apiUrlService/baseUrl";
// import toast from '@/src/utilities/toast';



export default async (apiModel: ModelApi,) => {
    const { body, axiosType } = apiModel
    // const body = { ...apiModel?.body,/*mac: ''*/ }
    // console.log('body', body);
    // console.log('h',config,apiModel);


    var res: IAxiosResponse;

    try {

        if (axiosType === 'get') {
            res = await axios.get(ApiUrlService(apiModel, body), config,);
        } else {
            switch (axiosType) {
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
                // case 'file':
                //     // const formData = new FormData();
                //     // formData.append('file', apiModel.body);
                //     // console.log('formData', formData);

                //     res = await axios({
                //         method: "post",
                //         url: `${localhost}api/users/avatar`,
                //         data: apiModel.body,
                //         headers: {
                //             ...config.headers,
                //             "Content-Type": "multipart/form-data"


                //         }

                //     })
                //     break;

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