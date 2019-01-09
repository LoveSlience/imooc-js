import React from 'react';
import {connect} from 'react-redux';

class TodoList extends React.Component {
	constructor(props) {
		super(props)
	}
	handleInputChange(e) {
		console.log(e.target.value)
	}
	render() {
		return (
				<div>
					<div>
						<input 
							value = {this.props.inputValue} 
							onChange={this.props.changeInputValue}/>
						<button onClick={this.props.handleClick}>提交</button>
					</div>
					<ul>
						{
							this.props.list.map((item, index) => {
								return (<li key={index} onClick={() => {
									this.props.handleDelete(index)
								}}>{item}</li>)
							})
						}
					</ul>
				</div>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		inputValue: state.inputValue,
		list: state.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeInputValue(e) {
			const action = {
				type: 'change_input_value',
				value: e.target.value
			}
			dispatch(action);
		},
		handleClick() {
			const action = {
				type: 'add_item'
			}
			dispatch(action)
		},
		handleDelete(index) {
			const action = {
				type: 'delete_item',
				index: index
			}
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);











