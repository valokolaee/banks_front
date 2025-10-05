  
import IUser from '../../intrfaceces/IUser';
import { SET_USER, SET_USER_AVATAR, SET_USER_LOGO } from '../slice/userSlice';
import { appDispatch } from '../store';



export const setUserTotal = (data: IUser|undefined) => {
    appDispatch(SET_USER(data!));
         setUserAvatar(data?.profileImage!)
         setUserLogo(data?.logoUrl!)
 };
export const setUser = (data: IUser|undefined) => {
    appDispatch(SET_USER(data!));
    if (data?.profileImage) {
        setUserAvatar(data.profileImage)
    }
};

export const setUserAvatar = (data: string) => {
    appDispatch(SET_USER_AVATAR(data ));
};

export const setUserLogo = (data: string) => {
    appDispatch(SET_USER_LOGO(data ));
};

// export const setLanguage = (data: ILang | undefined) => { appDispatch(SET_LANGUAGE(data!)); };


// export const setFontFamily = (data: string) => { appDispatch(SET_FONT_FAMILY({ family: { norm: data, bold: `${data}Bold` } })); };

// export const setFontSize = (size: number) => { appDispatch(SET_FONT_SIZE({ size })); };


// export const setIsRial = (b: boolean) => { appDispatch(SET_IS_RIAL(b)); };
// export const setNumPerPage = (n: number) => { appDispatch(SET_IS_NUM_PER_PAGE(n)); };

// export const setLoginShow = () => { appDispatch(SET_LOGIN_SHOW()); };
// export const setLoginHide = () => { appDispatch(SET_LOGIN_HIDE()); };

