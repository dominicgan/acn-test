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
			pageInput: 1,
			page: 1,
			perPage: 3,
			total: 0,
			totalPages: 0,
			error: '',
			loading: false
		};

		this.ready = false;
		this.fetchButtonClick = this.fetchButtonClick.bind(this);
		this.paginationInputChange = this.paginationInputChange.bind(this);
		this.paginationButtonClick = this.paginationButtonClick.bind(this);
		this.paginationEnterKeypress = this.paginationEnterKeypress.bind(this);
	}
	componentDidMount() {
	}
	fetchButtonClick() {
		this.setState({loading: true});

		// validate pageInput value
		if (this.ready && !this.validateInput(parseInt(this.state.pageInput, 10))) {
			this.setState({
				loading: false,
				pageInput: this.state.page
			});
			return false;
		}

		this.fetchData(ENDPOINT+'?page='+this.state.pageInput).then((res) => {
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
		const eTargetVal = event.target.value;
		this.setState({pageInput: eTargetVal});
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

		this.setState({
			pageInput: pageVal
		}, () => {
			this.fetchButtonClick();
		});
	}
	paginationEnterKeypress(e) {
		if (e.which === 13) { // enter keypress
			this.fetchButtonClick();
		}
	}
	validateInput(newPage) {
		// pass only if conditions met
		// - more than 0
		// - less than totalPages
		if (this.state.page !== newPage && newPage > 0 && newPage <= this.state.totalPages) {
			this.setState({error: ''});
			return true;
		}

		if (this.state.page === newPage) {
			console.log('same page');
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
				{!this.ready && <ButtonBar handleClick={this.fetchButtonClick} text='Create new' icon='fa-plus' error={this.state.error}/>}
				<CardControls
					pageData={pageData}
					handleFetch={this.fetchButtonClick}
					handleInputChange={this.paginationInputChange}
					handleEnterKeypress={this.paginationEnterKeypress}
					handlePageChange={this.paginationButtonClick}
					error={this.state.error}
					/>
			</div>
			);
	}
}

export default App;
