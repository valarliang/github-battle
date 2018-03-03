import axios from 'axios';

module.exports={
	fetchPopularRepos(language){
		let url = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
		return axios.get(url).then(response=>response.data.items);
	}
}