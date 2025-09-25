import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import IUser from '../../intrfaceces/IUser';


const initialState: IUser = {
  // email: '',
  // firstName: "",
  // lastName: "",
  // id: '',
  // shopName: '',
  // sign: ''
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,

  reducers: {
    SET_USER: (state, action: PayloadAction<IUser>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.clientType = action.payload.clientType;
      state.id = action.payload.id;
      state.logoUrl = action.payload.logoUrl;
      // state.profileImage = action.payload.profileImage;
      state.pass = action.payload.pass;
    },
    SET_USER_AVATAR: (state, action: PayloadAction<string>) => {
      
      state.profileImage = action.payload;
    },
  },
});

export const { SET_USER ,SET_USER_AVATAR} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
