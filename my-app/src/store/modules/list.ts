import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//initialState

type initialStateType = {
	list: any;
	isConvert: boolean;
};

const initialState: initialStateType = {
	list: [],
	isConvert: false,
};

export const getList = createAsyncThunk('list/getList', async (_, thunkAPI) => {
	try {
		const getPostConfig = {
			url: '/TEST/fetest',
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
			},
		};
		axios.defaults.withCredentials = true;
		const PostDate = await axios(getPostConfig);
		const defaultList = [...PostDate.data.body.list];
		const newList = defaultList.map((prop) => {
			return { ...prop, isOpen: false };
		});
		thunkAPI.dispatch(setList(newList));
	} catch (error) {
		alert(`알 수 없는 오류: ${error}`);
	}
});

export const list = createSlice({
	name: 'list',
	initialState,
	reducers: {
		setList: (state, action) => {
			state.list = action.payload;
		},
		convertWord: (state) => {
			state.isConvert = !state.isConvert;
		},
	},
});

export const { setList, convertWord } = list.actions;
export default list.reducer;
