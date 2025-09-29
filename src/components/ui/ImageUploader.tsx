import { FileImageTwoTone } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import { localhost } from '../../webService/ApiUrls/apiUrlService/baseUrl';

 import { v4 as uuidv4 } from 'uuid';
 
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { setUserAvatar } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const FileUpload: React.FC<{ numberOfItems: number; img?: UploadFile }> = ({ numberOfItems, img }) => {
    
     const _user = useAppSelector((s) => s.userSlice)
    const [fileList, setFileList] = useState<UploadFile[]>([
     
    ]);
 

    
    const onChange: UploadProps['onChange'] = ({ file, fileList }) => {
        // console.log(file);
        
        //     if (file.status==='done') {
             setFileList(fileList);
            // }
        
        };

         const onPreview = async (file: UploadFile) => {
            let src = file.url as string;
            if (!src) {
                src = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj as FileType);
                    reader.onload = () => resolve(reader.result as string);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        };



    const customRequest = async ({ file, onSuccess, onError, onProgress }: any) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${localhost}api/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${_user.token}` },
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                onSuccess(result, file);
                console.log(result);
                
                setUserAvatar(result.data.url + '?a=' + new Date())
                message.success('File uploaded successfully');
            } else {
                onError(new Error(result.error));
                message.error(result.error);
            }
        } catch (error) {
            onError(error);
            message.error('Upload failed');
        }
    };

    return (

        <ImgCrop rotationSlider
        >
            <Upload

                    customRequest={customRequest}
                    // onChange={({ file }) => {
                    //     if (file.status === 'done') {
                    //      onChange({fileList:file.})
                    //     }
                    // }}
                // onChange={onChange}
                        // listType="text"
                        fileList={fileList}
                         onPreview={onPreview}
                    >
                {/* {fileList.length < numberOfItems && '+ Upload'} */}
                <Button icon={<FileImageTwoTone />} className=''/>
                    </Upload>
                </ImgCrop>

        // <Upload
        //     customRequest={customRequest}
        //     onChange={({ file }) => {
        //         if (file.status === 'done') {
        //             console.log('Uploaded file:', file.response.data);
        //         }
        //     }}
        // >
        //     <Button icon={<UploadOutlined />}>Click to Upload</Button>
        // </Upload>
    );
};

export default FileUpload;


 interface IPreImage{
    uid: string;
        name: string;
            status: string;
                url: string;
        }


// import React, { useState } from 'react';
// import { Upload } from 'antd';
// import type { GetProp, UploadFile, UploadProps } from 'antd';
// import ImgCrop from 'antd-img-crop';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// const ImageUploader: React.FC<{ numberOfItems: number }> = ({ numberOfItems }) => {
//     const [fileList, setFileList] = useState<UploadFile[]>([]);

//     const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
//         setFileList(newFileList);
//     };

//     const onPreview = async (file: UploadFile) => {
//         let src = file.url as string;
//         if (!src) {
//             src = await new Promise((resolve) => {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file.originFileObj as FileType);
//                 reader.onload = () => resolve(reader.result as string);
//             });
//         }
//         const image = new Image();
//         image.src = src;
//         const imgWindow = window.open(src);
//         imgWindow?.document.write(image.outerHTML);
//     };

//     return (
//         <ImgCrop rotationSlider>
//             <Upload
//                 // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//                 // customRequest={(v) => {
//                 //     onPreview({
//                 //         name:v.filename
//                 //     })
//                 //     // onchange!(v!)
//                 //     return true
                    
//                 // }}
//                 listType="picture-card"
//                 fileList={fileList}
//                 onChange={onChange}
//                 onPreview={onPreview}
//             >
//                 {fileList.length < numberOfItems && '+ Upload'}
//             </Upload>
//         </ImgCrop>
//     );
// };

// export default ImageUploader;