import React from 'react'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview'
import Link from 'react-router-dom'
import {Loading} from './Loading'
const api=require('../utils/api');

function Profile(props) {
	let {login,avatar_url,name,location,company,followers,following,public_repos,blog}=props.info;
	return (
		<PlayerPreview avatar={avatar_url} username={login}>
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
		</PlayerPreview>
	)
}

Profile.propTypes={
	info:PropTypes.object.isRequired,
}

function Player(props) {
	let {label,score,profile}=props;
	return (
		<div style={{textAlign:'center'}} >
			<h1>{label}</h1>
			<h3>{score}</h3>
			<Profile info={profile} />
		</div>
	)
}

Player.propTypes={
	label:PropTypes.string.isRequired,
	score:PropTypes.number.isRequired,
	profile:PropTypes.object.isRequired,
}

class Results extends React.Component{
	constructor(){
		super()
		this.state={
			winner:null,
			loser:null,
			loading:true,
			error:null
		}
	}
	componentDidMount() {
		let players=queryString.parse(this.props.location.search);
		api.battle([players.playerOneName,players.playerTwoName])
		.then(players=>{
			if (players===null) {
				this.setState({
					loading:false,
					error:'Looks like there was an error.Check out both users exist on Github.'
				});
			}
			this.setState({
				winner:players[0],
				loser:players[1],
				loading:false,
				error:null
			});
		})
	}

	render() {
		let {winner,loser,loading,error}=this.state;
		if (loading) {
			return <Loading />
		}
		if (error) {
			return(
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}
		return (
			<div className='row'>
				<Player
					label='Winner'
					score={winner.score}
					profile={winner.profile} />
				<Player
					label='Loser'
					score={loser.score}
					profile={loser.profile} />
			</div>
		);
	}
}

export default Results;