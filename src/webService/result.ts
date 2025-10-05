import { AxiosResponse } from "axios";

export default (res: AxiosResponse) => {

    const { status, statusText, data, } = res || {}

    switch (status) {
        case 200:
        case 201:
            return res?.data;

        case 401:
            return 401;
        // case 401:
        default:
            console.log(status, statusText);
            break
    }
}


