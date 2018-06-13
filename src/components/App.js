import React, { Component } from 'react';
import ButtonBar from './ButtonBar';
import CardListing from './CardListing';
import CardControls from './CardControls';
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
				<CardListing data={this.state.data} />
				<ButtonBar handleClick={this.fetchButtonClick} text='Get Data' />
				<CardControls
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

export default App;
