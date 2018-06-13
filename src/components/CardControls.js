import React from 'react';

const CardControls = (props) => {
	return (
		<div className="card-controls">
			<div className="results">
			<span className="total">{props.total} result(s)</span><br/>
			<span className="pages">Page {props.page} of {props.totalPages} page(s)</span><br/>
			<span className="per-page">{props.perPage} result(s) per page</span>
			</div>
			<div className="pagination">
				<button className="pagination__prev" onClick={props.handleButtonClick.bind(this, 'prev')} disabled={props.page === 1}>Prev</button>
				<input type="text" className="pagination__value" value={props.page} onChange={props.handleInputChange}/>
				<button className="pagination__next" onClick={props.handleButtonClick.bind(this, 'next')} disabled={props.page === props.totalPages}>Next</button>
			</div>
			<span className={'error ' + (props.error.length ? 'has-error' : '')}>{props.error}</span>
		</div>
		)
};

export default CardControls;