import React from 'react';
import '../sass/Card.scss';

const Card = (props) => {
	return (
		<div className="card">
			<div className="card__id">ID: {props.id}</div>
			<div className="card__avatar">
				<img src={props.avatar} alt={props.first_name + ' ' + props.last_name} />
			</div>
			<div className="card__person">
				<span className="last-name">{props.last_name},</span>
				<span className="first-name">{props.first_name}</span>
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
