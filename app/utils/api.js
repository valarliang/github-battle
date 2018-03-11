import axios from 'axios';

async function getProfile(username) {
	const {data}=await axios.get('https://api.github.com/users/'+username)
	return data;
}
// console.log(getRepos('valarliang'))
async function getRepos(username) {
	const {data}=await axios.get('https://api.github.com/users/'+username+'/repos')
	return data
}

function calculateScore({followers},repos) {
	let totalStars=repos.reduce((count,repo)=>count+repo.stargazers_count, 0);
	return followers*3+totalStars;
}

async function getUserData(player) {
	const [profile,repos]=await Promise.all([getProfile(player),getRepos(player)])
	return {profile,score:calculateScore(profile,repos)}
}

function sortPlayers(players) {
	return players.sort((a,b)=>b.score-a.score);
}

module.exports={
	battle(players){
		return Promise.all(players.map(getUserData)).then(sortPlayers).catch(()=>console.warn(error));
	},
	async fetchPopularRepos(language){
		const url = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
		const {data}=await axios.get(url);
		return data.items;
	}
}