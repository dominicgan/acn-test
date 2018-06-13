import React from 'react';

const Card = (props) => {
	return (
		<div className="card">
			<div className="card__id">{props.id}</div>
			<div className="card__avatar">
				<img width='100' height='100' src={props.avatar} alt={props.first_name + ' ' + props.last_name} />
			</div>
			<div className="card__person">
			<span className="first-name">{props.first_name}</span>
			<span className="spacer">, </span>
			<span className="last-name">{props.last_name}</span>
			</div>
		</div>
		)
};

Card.defaultProps = {
	id: 0,
	first_name: '',
	avatar: '',
	last_name: ''
};

export default Card;
