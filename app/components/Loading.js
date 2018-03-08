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
			speed:props.speed,
			style:props.style,
		}
	}
	componentDidMount() {
		let ending=this.props.text+'...';
		this.interval=setInterval(()=>{
			if (this.state.text===ending) {
				this.setState({text:this.props.text});
			}else{
				this.setState(prevState=>{
					return {text:prevState.text+'.'}
				});
			}
		},this.state.speed)
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
	speed:200,
	style:styles.content,
}