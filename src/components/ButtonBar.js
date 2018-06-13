import React from 'react';
import '../sass/ButtonBar.css';

const ButtonBar = (props) => {
	return (
		<div className="button-container">
		<button onClick={props.handleClick}>{props.text}</button>
		</div>
		);
};

ButtonBar.defaultProps = {
	text: 'button'
};

export default ButtonBar;


