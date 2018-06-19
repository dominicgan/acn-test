import React from 'react';
import '../sass/ButtonBar.scss';

const ButtonBar = (props) => {
	return (
		<div className="button-container">
			<button onClick={props.handleClick}>
			{props.icon && <i className={'fa '+props.icon} aria-hidden='true'/>}
			{props.text}
			</button>
		</div>
		);
};

ButtonBar.defaultProps = {
	text: 'Get Data',
	icon: ''
};

export default ButtonBar;


