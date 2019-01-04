import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './actionTypes.js';

const defaultState = {
	inputVal: '',
	list: []
};


export default (state = defaultState, action) => {
	if(action.type === CHANGE_INPUT_VALUE) {
		const newsState = JSON.parse(JSON.stringify(state));
		newsState.inputVal = action.value;
		return newsState;
	}
	if(action.type === ADD_TODO_ITEM) {
		const newsState = JSON.parse(JSON.stringify(state));
		newsState.list.push(newsState.inputVal);
		newsState.inputVal = '';
		return newsState;
	}
	if(action.type === DELETE_TODO_ITEM) {
		const newsState = JSON.parse(JSON.stringify(state));
		newsState.list.splice(action.index, 1);
		return newsState
	}

	return state
}