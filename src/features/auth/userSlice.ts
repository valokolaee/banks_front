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
      // state.CustomerId = action.payload.CustomerId;
      // state.FirstName = action.payload.FirstName;
      // state.LastName = action.payload.LastName;
      // state.TypeMosh = action.payload.TypeMosh;
      // state.ShopName = action.payload.ShopName;









    },
  },
});

export const { SET_USER } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
