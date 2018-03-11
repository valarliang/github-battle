import React, { Component } from 'react';
import PropTypes from 'prop-types';

let styles={
	content:{
		textAlign:'center',
		fontSize:'35px'
	}
}

export class Loading extends Component {
	constructor(props){
		super(props);
		this.state={
			text:props.text,
			style:props.style,
		}
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

Loading.propTypes={

}
Loading.defaultProps={
	text:'Loading',
	speed:300,
	style:styles.content,
}