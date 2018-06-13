import React from 'react';
import Card from './Card';
import '../sass/CardListing.css';

const CardListing = (props) => {
	const renderList = (data) => {
		return data.map((obj, i) => {
			return (
				<li className='list__item' key={i}>
				<Card id={obj.id} first_name={obj.first_name} avatar={obj.avatar} last_name={obj.last_name} />
				</li>
				)
		});
	}

	if (props.loading) {
		return (<div className="loading">Loading</div>);
	} else {
		return (<ul className='card-listing'>{renderList(props.data)}</ul>);
	}
};

CardListing.defaultProps = {
	data: []
};

export default CardListing;