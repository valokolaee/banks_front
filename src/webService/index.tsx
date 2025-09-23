import { AxiosRequestConfig } from 'axios';
import React, { useImperativeHandle, useState } from 'react';

import { ModelApi } from './ApiUrls/ModelApi';
import apiCaller from './apiCaller';
import result from './result';
// import Background from '../components/ui/Background';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { useAppSelector } from '../redux/hooks';
const isDemo = true;

export var config: AxiosRequestConfig = {

}




export default React.forwardRef(({ className, size = 30, donTShowSpin, }: IWebService, ref) => {
  useImperativeHandle(ref, () => { return { callApi }; });
  const token = useAppSelector((s) => s.userSlice.token)

  const [showModal, setShowModal] = useState<ModelApi | undefined>(undefined);
  // const [_prog, set_prog] = useState<BarPropTypes>({})

  config = {
    headers: { Authorization: `Bearer ${token}` },

    beforeRedirect(options, responseDetails) {

    },

    // onDownloadProgress(progressEvent) {
    //   const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //   set_prog({ progress })
    // },
    // onUploadProgress(progressEvent) {
    //   const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //   set_prog({ progress })
    // },
  }



  const callApi = async (apiModel: ModelApi) => {
    console.log(apiModel.body);

    if (!donTShowSpin) {
      setShowModal(apiModel)
    }

    var res = await apiCaller(apiModel)

    setShowModal(undefined)

    if (isDemo) {
      // return demoData(apiModel.apiUrl as apiName)
    } else {
      // console.log(apiModel.apiUrl,result(res));
    }
    return result(res);

  }

  return (
    <>{showModal &&
      <div className='absolute inset-0 m-auto text-white p-4 w-48 h-24 z-10'>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 100, color: 'gold' }} spin />} />
      </div>
    }</>
  );



});


export interface IWebServiceFuncs {

  callApi<T>(apiModel: ModelApi,): T

}
export interface IWebService {
  donTShowSpin?: boolean;
  size?: number;
  className?: string;
  relativeMode?: boolean;
  position?: TPosition

}


const className = 'absolute ce'


type TPosition = "center" | "pageFlew"
function positioner(params: TPosition) {
  switch (params) {
    case 'center':

      break;

    case 'pageFlew':
    default:

  }
}