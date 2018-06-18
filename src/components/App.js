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
			error: '',
			loading: false
		};

		this.ready = false;
		this.fetchButtonClick = this.fetchButtonClick.bind(this);
		this.paginationInputChange = this.paginationInputChange.bind(this);
		this.paginationButtonClick = this.paginationButtonClick.bind(this);
	}
	componentDidMount() {
	}
	fetchButtonClick() {
		this.setState({loading: true});
		this.fetchData(ENDPOINT+'?page='+this.state.page).then((res) => {
			// artificial timeout for smoother loading
			setTimeout(() => {
				this.ready = true;
				this.setState({
					loading: false,
					data: res.data,
					page: res.page,
					perPage: res.per_page,
					total: res.total,
					totalPages: res.total_pages
				});
			}, 400);
		});
	}
	paginationInputChange(event) {
		console.log(event.target.value);
		this.validateInput(event.target.value);
		this.setState({page: event.target.value}, () => {
			if (this.state.page) {
				console.log(typeof this.state.page,  this.state.page.length);
			} else {
				console.log('empty value');
			}
		});
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
			this.setState({page: pageVal}, () => {
				this.fetchButtonClick();
			});
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
		if (newPage.length && newPage <= 0) { // less than min
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
		// consolidate info to object
		// to pass fewer props into component
		let pageData = {
			pageInput: this.state.pageInput,
			page: this.state.page,
			perPage: this.state.perPage,
			total: this.state.total,
			totalPages: this.state.totalPages
		};
		return (
			<div className={"App " + (this.ready ? 'App-ready' : '')}>
				<CardListing data={this.state.data} loading={this.state.loading}/>
				<ButtonBar handleClick={this.fetchButtonClick} text='Get Data' />
				<CardControls
					pageData={pageData}
					handleInputChange={this.paginationInputChange}
					handlePageChange={this.paginationButtonClick}
					error={this.state.error}
					/>
			</div>
			);
	}
}

export default App;
