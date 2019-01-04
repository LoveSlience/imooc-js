import React from 'react';
import {Input, Button, List} from 'antd';
import 'antd/dist/antd.css';
import store from './store/index.js';
import {getInputChangeAction, getAddItemAction, getDeleteItemAction} from './store/actionCreators.js'

export default class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = store.getState();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleStoreChange = this.handleStoreChange.bind(this);
		this.handleBtnClick = this.handleBtnClick.bind(this);
		store.subscribe(this.handleStoreChange)
	}
	handleInputChange(e) {
		store.dispatch(getInputChangeAction(e.target.value))
	}
	handleStoreChange() {
		this.setState(() => store.getState())
	}
	handleBtnClick() {
		store.dispatch(getAddItemAction());
	}
	handleItemClick(index) {
		store.dispatch(getDeleteItemAction(index))
	}
	render() {
		return (
				<div style={{margin: '50px'}}	> 
					<Input 
						placeholder='todoinfo' 
						style={{width: '300px', margin: '10px'}} 
						value={this.state.inputVal} 
						onChange={this.handleInputChange}/>
					<Button type='primary' onClick={this.handleBtnClick}>提交</Button>
					<List
						style={{width: '400px'}}
			      bordered
			      dataSource={this.state.list}
			      renderItem={(item, index) => (<List.Item onClick = {this.handleItemClick.bind(this,index)}>{item}</List.Item>)}
			    />
				</div>
			)
	}
}