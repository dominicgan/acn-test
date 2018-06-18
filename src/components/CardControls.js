import React from 'react';
import ButtonBar from './ButtonBar';
import '../sass/CardControls.css';

const CardControls = (props) => {
	return (
		<div className="card-controls">
			<CardResults pageData={props.pageData}/>
			<div className="pagination">
				<button className="pagination__prev" onClick={props.handlePageChange.bind(this, 'prev')} disabled={props.pageData.page === 1}>Prev</button>
				<ButtonBar handleClick={props.handleFetch} error={props.error}/>
				<input type="number" className="pagination__value" value={props.pageData.pageInput} onChange={props.handleInputChange}/>
				<button className="pagination__next" onClick={props.handlePageChange.bind(this, 'next')} disabled={props.pageData.page === props.pageData.totalPages}>Next</button>
			</div>
			<span className={'error ' + (props.error.length ? 'has-error' : '')}>{props.error}</span>
		</div>
		)
};

// Compartmentalize card results into a separate component
const CardResults = (props) => {
	return (
		<div className="results">
			<div className="row results__summary">
				<span className="total">{props.pageData.total} result(s)</span>
				<span className="per-page">{props.pageData.perPage} result(s) per page</span>
			</div>
			<div className="row results__pages">
				<span className="pages">Page {props.pageData.page} of {props.pageData.totalPages}</span>
			</div>
		</div>
		)
};

export default CardControls;