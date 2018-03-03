import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class PlayerInput extends React.Component{
	constructor(){
		super();
		this.state={
			username:''
		};
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}
	handleSubmit(){
		let {id,onSubmit}=this.props;
		onSubmit(id,this.state.username);
	}
	handleChange(ev){
		this.setState({username:ev.target.value})
	}
	render(){
		let {label}=this.props;
		return(
			<form onSubmit={this.handleSubmit} className="column">
				<label htmlFor="username" className="header">{label}</label>
				<input
					type="text"
					id="username"
					placeholder="github username"
					value={this.state.username}
					onChange={this.handleChange}
					autoComplete='off' />
				<button 
					className="button" 
					type="submit"
					disabled={!this.state.username}>
					Submit
				</button>
			</form>
		)
	}
}
PlayerInput.propTypes={
	id:PropTypes.string.isRequired,
	onSubmit:PropTypes.func.isRequired,
	label:PropTypes.string.isRequired,
}
PlayerInput.defaultProps={
	label:'Username',
}

function PlayerPreview(props) {
	let {avatar,username,handleReset,id}=props;
	return (
		<div className="column">
			<div>
				<img 
					src={avatar} 
					alt={'Avatar for'+username} 
					className="avatar"/>
				<h2>@{username}</h2>
			</div>
			<button 
				className="reset" 
				onClick={handleReset.bind(null,id)}>
					Reset
			</button>
		</div>
	)
}

PlayerPreview.propTypes={
	avatar:PropTypes.string.isRequired,
	username:PropTypes.string.isRequired,
	id:PropTypes.string.isRequired,
	handleReset:PropTypes.func.isRequired,
}

class Battle extends React.Component{
	constructor(){
		super();
		this.state={
			playerOneName:'',
			playerTwoName:'',
			playerOneImg:null,
			playerTwoImg:null
		};
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleReset=this.handleReset.bind(this);
	}
	handleSubmit(id,name){
		this.setState(function () {
			let newState={};
			newState[id+'Name']=name;
			newState[id+'Img']='https://github.com/'+name+'.png?size=200';
			return newState;
		})
	}
	handleReset(id){
		this.setState(function () {
			let newState={};
			newState[id+'Name']='';
			newState[id+'Img']=null;
			return newState;
		})
	}
	render() {
		let {playerOneName,playerTwoName,playerOneImg,playerTwoImg}=this.state;
		let {match}=this.props;
		return(
			<div>
				<div className='row'>
					{!playerOneName 
						? <PlayerInput 
						id='playerOne'
						label='Player One'
						onSubmit={this.handleSubmit} />
						:<PlayerPreview
							avatar={playerOneImg}
							username={playerOneName}
							handleReset={this.handleReset}
							id='playerOne' />}
					{!playerTwoName 
						? <PlayerInput 
						id='playerTwo'
						label='Player Two'
						onSubmit={this.handleSubmit} />
						:<PlayerPreview
							avatar={playerTwoImg}
							username={playerTwoName}
							handleReset={this.handleReset}
							id='playerTwo' />}
				</div>
				{playerOneName && playerTwoName &&
					<Link
						className='button'
						to={{
							pathname:match.url+'/results',
							search:'?playerOneName='+playerOneName+'&playerTwoName='+playerTwoName
						}}>
							Battle
						</Link>}
						
			</div>
		)
	}
}

export default Battle;