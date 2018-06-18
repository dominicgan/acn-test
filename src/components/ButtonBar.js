import React from 'react';
import '../sass/ButtonBar.css';

const ButtonBar = (props) => {
	return (
		<div className="button-container">
			<button onClick={props.handleClick} disabled={props.error.length ? 'disabled' : ''}>{props.text}</button>
		</div>
		);
};

ButtonBar.defaultProps = {
	text: 'Get Data'
};

export default ButtonBar;


