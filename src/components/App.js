import React, { Component } from 'react';
import '../sass/App.css';

const ENDPOINT = 'https://reqres.in/api/users';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			page: 1,
			perPage: 3,
			total: 0,
			totalResults: 0,
			error: ''
		};

		this.ready = false;
		this.fetchButtonClick = this.fetchButtonClick.bind(this);
		this.paginationInputChange = this.paginationInputChange.bind(this);
		this.paginationButtonClick = this.paginationButtonClick.bind(this);
	}
	componentDidMount() {
	}
	fetchButtonClick() {
		console.log('button click', this.state.page);
		this.fetchData(ENDPOINT+'?page='+this.state.page).then((res) => {
			this.ready = true;
			this.setState({
				data: res.data,
				page: res.page,
				perPage: res.per_page,
				total: res.total,
				totalPages: res.total_pages
			});
		});
	}
	paginationInputChange(event) {
		console.log(event.target.value);
		// if (this.validateInput(event.target.value)) {
			this.setState({page: event.target.value});
		// }
	}
	paginationButtonClick(type){
		let pageVal = this.state.page;
		switch (type) {
			case 'prev':
				pageVal--;
				break;
			case 'next':
				pageVal++
				break;
			default:
				break;
		}

		if (this.validateInput(pageVal)) {
			this.setState({page: pageVal});
		}
	}
	validateInput(newPage) {
		// pass only if conditions met
		// - more than 0
		// - less than totalPages
		if (this.state.page !== newPage && newPage > 0 && newPage <= this.state.totalPages) {
			this.setState({error: ''});
			return true;
		} else {
			console.log('invalid condition');
		}

		// error handling
		if (newPage <= 0) { // less than min
			this.setState({error: 'min bound'});
		} else if (newPage > this.state.totalPages) { // more than max
			this.setState({error: 'max bound'});
		} else {
			this.setState({error: ''});
		}
		return false;
	}
	fetchData(apiUrl) {
		console.log(apiUrl);
		let promise = new Promise((resolve, reject) => {
			fetch(apiUrl)
				.then((res) => {
					resolve(res.json());
				}).catch((res) => {
					reject(res);
				});
		});

		return promise;
	}
	render() {
		return (
			<div className={"App " + (this.ready ? 'App-ready' : '')}>
				<CardListingComponent data={this.state.data} />
				<ButtonBarComponent handleClick={this.fetchButtonClick} text='Get Data' />
				<CardControlsComponent
					page={this.state.page}
					perPage={this.state.perPage}
					total={this.state.total}
					totalPages={this.state.totalPages}
					handleInputChange={this.paginationInputChange}
					handleButtonClick={this.paginationButtonClick}
					error={this.state.error}
					/>
			</div>
			);
	}
}

const ButtonBarComponent = (props) => {
	return (
		<div className="button-container">
		<button onClick={props.handleClick}>{props.text}</button>
		</div>
		);
};

ButtonBarComponent.defaultProps = {
	text: 'button'
};


const CardListingComponent = (props) => {
	const renderList = (data) => {
		return data.map((obj, i) => {
			return (
				<li className='list__item' key={i}>
				<CardComponent id={obj.id} first_name={obj.first_name} avatar={obj.avatar} last_name={obj.last_name} />
				</li>
				)
		});
	}


	return (<ul className='card-listing'>{renderList(props.data)}</ul>);
};

CardListingComponent.defaultProps = {
	data: []
};

const CardComponent = (props) => {
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

CardComponent.defaultProps = {
	id: 0,
	first_name: '',
	avatar: '',
	last_name: ''
};

const CardControlsComponent = (props) => {
	return (
		<div className="card-controls">
			<div className="results">
			<p className="total">{props.total} result(s)</p>
			<p className="pages">Page {props.page} of {props.totalPages} page(s)</p>
			<p className="per-page">{props.perPage} result(s) per page</p>
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

export default App;
