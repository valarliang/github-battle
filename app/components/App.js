import React,{Component} from 'react'
import Popular from './Popular'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import Nav from './nav'
import Home from './Home'
import Battle from './battle'
import Results from './Results'

class App extends Component{
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/battle' component={Battle} />
						<Route path='/battle/results' component={Results} />
						<Route path='/popular' component={Popular} />
						<Route render={function () {
							return <p>Not Found</p>
						}} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;