import React from 'react';
import '../sass/CardControls.css';

const CardControls = (props) => {
	return (
		<div className="card-controls">
			<div className="results">
			<div className="row results__summary">
				<span className="total">{props.total} result(s)</span>
				<span className="per-page">{props.perPage} result(s) per page</span>
			</div>
			<div className="row results__pages">
				<span className="pages">Page {props.page} of {props.totalPages}</span><br/>
			</div>
			</div>
			<div className="pagination">
				<button className="pagination__prev" onClick={props.handleButtonClick.bind(this, 'prev')} disabled={props.page === 1}>Prev</button>
				<input type="number" className="pagination__value" value={props.page} onChange={props.handleInputChange}/>
				<button className="pagination__next" onClick={props.handleButtonClick.bind(this, 'next')} disabled={props.page === props.totalPages}>Next</button>
			</div>
			<span className={'error ' + (props.error.length ? 'has-error' : '')}>{props.error}</span>
		</div>
		)
};

export default CardControls;