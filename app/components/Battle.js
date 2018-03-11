import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

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
		let {username}=this.state;
		return(
			<form onSubmit={this.handleSubmit} className="column">
				<label htmlFor="username" className="header">{label}</label>
				<input
					type="text"
					id="username"
					placeholder="github username"
					value={username}
					onChange={this.handleChange}
					autoComplete='off' />
				<button 
					className="button" 
					type="submit"
					disabled={!username}>
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
		this.setState(()=>({
			[id+'Name']: name,
			[id+'Img']: 'https://github.com/'+name+'.png?size=200'
		}))
	}
	handleReset(id){
		this.setState(()=>({
			[id+'Name']: '',
			[id+'Img']: null
		}))
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
							username={playerOneName}>
								<button 
									className="reset" 
									onClick={()=> this.handleReset('playerOne')}>
										Reset
								</button>
						</PlayerPreview>}
					{!playerTwoName 
						? <PlayerInput 
						id='playerTwo'
						label='Player Two'
						onSubmit={this.handleSubmit} />
						:<PlayerPreview
							avatar={playerTwoImg}
							username={playerTwoName}>
								<button 
									className="reset" 
									onClick={()=> this.handleReset('playerTwo')}>
										Reset
								</button>
						</PlayerPreview>}
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