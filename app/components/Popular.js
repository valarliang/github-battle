import React from 'react';
import PropTypes from 'prop-types';
var api = require('../utils/api');

function SelectLanguage(props) {
	let languages=['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
	let list=languages.map(e=>(
				<li 
					style={e === props.selectedLanguage?{color:'#d0021b'}:null}
					key={e}
					onClick={props.updateLanguage.bind(null,e)}>
					{e}
				</li>
			))
	return(
		<ul className='languages'>{list}</ul>
	)
}

function RepoGrid(props) {
	let list=props.repos.map((e,i)=>(
				<li key={e.name} className='popular-item'>
					<div className='popular-rank'>#{i+1}</div>
					<ul className='space-list-item'>
						<li>
							<img 
								className='avatar' 
								src={e.owner.avatar_url}
								alt={'Avatar for ' + e.owner.login}/>
						</li>
						<li><a href={e.html_url}>{e.name}></a></li>
						<li>@{e.owner.login}</li>
						<li>{e.stargazers_count} stars</li>
					</ul>
				</li>
			));
	return(
		<ul className='popular-list'>{list}</ul>
	)
}

RepoGrid.propTypes={
	repos:PropTypes.array.isRequired,
}
SelectLanguage.propTypes={
	selectedLanguage:PropTypes.string.isRequired,
	updateLanguage:PropTypes.func.isRequired,
}

class Popular extends React.Component{
	constructor(){
		super()
		this.state={
			selectedLanguage:'All',
			repos:null
		}
		this.updateLanguage=this.updateLanguage.bind(this);
	}
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}
	updateLanguage(lang){
		this.setState({selectedLanguage:lang});
		api.fetchPopularRepos(lang).then(repos=>{
			this.setState({repos:repos});
		})
	}

	render() {
		return(
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					updateLanguage={this.updateLanguage}
				/>
				{this.state.repos
					?<RepoGrid repos={this.state.repos}/>
					:<p>Loading</p>}
			</div>
		)
	}
}

export default Popular;