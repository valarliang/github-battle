import axios from 'axios';

function getProfile(username) {
	return axios.get('https://api.github.com/users/'+username).then(user=>user.data);
}
// console.log(getRepos('valarliang'))
function getRepos(username) {
	return axios.get('https://api.github.com/users/'+username+'/repos').then(repos=>repos.data);
}

function calculateScore(profile,repos) {
	let followers=profile.followers;
	let totalStars=repos.reduce((count,repo)=>count+repo.stargazers_count, 0);
	return followers*3+totalStars;
}

function getUserData(player) {
	return axios.all([getProfile(player),getRepos(player)])
	.then(data=>{
		return {
			profile:data[0],
			score:calculateScore(data[0],data[1])
		}
	})
}

function sortPlayers(players) {
	return players.sort((a,b)=>b.score-a.score);
}

module.exports={
	battle(players){
		return axios.all(players.map(getUserData)).then(sortPlayers).catch(()=>console.warn(error));
	},
	fetchPopularRepos(language){
		let url = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
		return axios.get(url).then(response=>response.data.items);
	}
}