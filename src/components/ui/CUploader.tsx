import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useRef, useState } from 'react';
import { setUserAvatar } from '../../redux/actions';
import WebService, { IWebServiceFuncs } from '../../webService';
import apis from '../../webService/ApiUrls/apis';
import { ModelApi } from '../../webService/ApiUrls/ModelApi';
import IResponse from '../../webService/ApiUrls/apis/IResponse';

const CUploader: React.FC<IUploader> = ({ numberOfItems, img, label, apiModel, callBack }) => {
    const refWebService = useRef<IWebServiceFuncs>()

    const [fileList, setFileList] = useState<UploadFile[]>([

    ]);

    const customRequest = async ({ file, onSuccess, onError, onProgress }: any) => {
        const formData = new FormData();
        formData.append('file', file);
        const result: any = await refWebService?.current?.callApi(apiModel!(formData))
        callBack && callBack(result)
        // setUserAvatar(result.data.url + '?a=' + new Date())
    };


    return (
        <ImgCrop rotationSlider >
            <Upload
                customRequest={customRequest}
                fileList={fileList}
            >
                <Button icon={<UploadOutlined />}>{label}</Button>
                <WebService ref={refWebService} />
            </Upload>
        </ImgCrop>



    );
};

export default CUploader;


export interface IUploader {
    numberOfItems?: number;
    img?: UploadFile;
    label?: string;
    apiModel?: (body: any) => ModelApi<any>
    callBack?: (res: IResponse<any>) => void
}