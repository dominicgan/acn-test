import React from 'react';

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


