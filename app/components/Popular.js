import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from './Loading'
const api = require('../utils/api');

function SelectLanguage(props) {
	let languages=['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
	let list=languages.map(e=>(
				<li 
					style={e === props.selectedLanguage?{color:'#d0021b'}:null}
					key={e}
					onClick={()=> props.updateLanguage(e)}>
					{e}
				</li>
			))
	return(
		<ul className='languages'>{list}</ul>
	)
}
SelectLanguage.propTypes={
	selectedLanguage:PropTypes.string.isRequired,
	updateLanguage:PropTypes.func.isRequired,
}

function RepoGrid({repos}) {
	let list=repos.map((e,i)=>(
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
		api.fetchPopularRepos(lang).then(repos=>this.setState({repos}))
	}

	render() {
		let {selectedLanguage,repos}=this.state;
		return(
			<div>
				<SelectLanguage 
					selectedLanguage={selectedLanguage}
					updateLanguage={this.updateLanguage}
				/>
				{repos
					?<RepoGrid repos={repos}/>
					:<Loading />}
			</div>
		)
	}
}

export default Popular;