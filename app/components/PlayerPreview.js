import React, { Component } from 'react';
import PropTypes from 'prop-types';

function PlayerPreview({avatar,username,children}) {
	return (
		<div className="column">
			<div>
				<img 
					src={avatar} 
					alt={'Avatar for'+username} 
					className="avatar"/>
				<h2>@{username}</h2>
			</div>
			{children}
		</div>
	)
}

PlayerPreview.propTypes={
	avatar:PropTypes.string.isRequired,
	username:PropTypes.string.isRequired,
}
export default PlayerPreview;