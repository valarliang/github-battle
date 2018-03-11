import React, { Component } from 'react';
import PropTypes from 'prop-types';

let styles={
	content:{
		textAlign:'center',
		fontSize:'35px'
	}
}

export class Loading extends Component {
	static propTypes={
		text:PropTypes.string.isRequired,
		style:PropTypes.object.isRequired,
	}
	static defaultProps={
		text:'Loading',
		speed:300,
		style:styles.content,
	}
	state={
		text:this.props.text,
		style:this.props.style,
	}
	componentDidMount() {
		let {text,speed}=this.props;
		let ending=text+'...';
		this.interval=setInterval(()=>{
			this.state.text===ending
			?this.setState({text:this.props.text})
			:this.setState(({text})=>({text:text+'.'}))   //{text}=prevState
		},speed)
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render() {
		let {style,text}=this.state;
		return (
			<p style={style}>{text}</p>
		);
	}
}
