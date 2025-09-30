import { FileImageTwoTone } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useRef, useState } from 'react';
import { setUserAvatar } from '../../redux/actions';
import WebService, { IWebServiceFuncs } from '../../webService';
import apis from '../../webService/ApiUrls/apis';

const FileUpload: React.FC<{ numberOfItems: number; img?: UploadFile }> = ({ numberOfItems, img }) => {
    const refWebService = useRef<IWebServiceFuncs>()

    const [fileList, setFileList] = useState<UploadFile[]>([

    ]);

    const customRequest = async ({ file, onSuccess, onError, onProgress }: any) => {
        const formData = new FormData();
        formData.append('file', file);
        const result: any = await refWebService?.current?.callApi(apis.users.updateAvatar(formData))
        setUserAvatar(result.data.url + '?a=' + new Date())


    };


    return (
        <ImgCrop rotationSlider>
            <Upload
                customRequest={customRequest}
                fileList={fileList}
            >
                <Button icon={<FileImageTwoTone />} />
                <WebService ref={refWebService} />
            </Upload>
        </ImgCrop>



    );
};

export default FileUpload;