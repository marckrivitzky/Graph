import React, { PureComponent} from "react";
import { withRouter } from 'react-router-dom';
// import { Line, Bar } from 'react-chartjs-2';
// import {CategoryScale} from 'chart.js'
// import { Chart as ChartJS } from 'chart.js/auto'
import { Form, Card, Row, Col, InputGroup} from 'react-bootstrap'
import Chart from 'chart.js/auto';
import axios from 'axios';

	class HomePageNew extends PureComponent{
		constructor(props){
			super(props);
				this.state = {
					nMonthly: 393,
					monthly: this.props.yourMonthly,
					ourValues: [],
					nationalAverage: [],
					startingValue: this.props.amount,
					nationalAverageStartingValue: 37000,
					finished: '',
					interestRate: this.props.interestRate
				}

		}

		chartRef = React.createRef();
		
		componentDidMount() {
			let proposedValues = [];
			let proposedMonthly = this.state.plan === "Aggressive" ? Math.round(393 * 2.25)  : this.state.plan === "Moderate" ?  Math.round(393 * 1.75) : Math.round(393 * 1.5);
			// each plan option should calc monthly payment based on an increase in efficiency of paydown (2/8)

			let months = [];
			axios
				.get('http://localhost:8080/calculate', { params: { loanAmount:this.state.startingValue, monthly:this.state.monthly, interestRate:this.state.interestRate } } )
				.then((ret)=> {
					this.setState({ourValues:ret.data.loanPaydown});
				}).then(() =>
					axios.get('http://localhost:8080/calculate', { params: { loanAmount:this.state.startingValue, monthly:proposedMonthly, interestRate:this.state.interestRate } } )
					.then((ret)=> {
						proposedValues = ret.data.loanPaydown;
					})
				).then(() =>
					axios.get('http://localhost:8080/calculate', { params: { loanAmount:this.state.nationalAverageStartingValue, monthly:this.state.nMonthly, interestRate:4.6 } } ) //https://www.thebalance.com/average-student-loan-interest-rate-4684306
					.then((ret)=> {
						this.setState({nationalAverage:ret.data.loanPaydown});
					})
				)
				.then(() => {
					const ctx = this.chartRef.current.getContext("2d");
					// let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)
					
					Chart.defaults.scales.linear.min = 0;
					let maxLength = Math.max(this.state.nationalAverage.length, this.state.ourValues.length, proposedValues.length);
					for (let i = 1; i < maxLength+1; i++){
						months.push('Month '+ i)
					}
					
					new Chart(ctx, {
						type: "line",
						options: {
							responsive:true
						},
						data: {
							labels: months,
								
								datasets: [
									{ 
										data: this.state.ourValues,
										label: `Your ${this.props.plan} Plan`,
										borderColor: "#3e95cd",
										backgroundColor: "#7bb6dd",
									}, 
									{
										label: 'Student Debt National Average',
										data: this.state.nationalAverage,
										borderColor: 'red',
										backgroundColor: "red"
									},
									{
										label: 'Our Ideal Plan',
										data: proposedValues,
										borderColor: 'green',
										backgroundColor: "green"
									}
								]
						},
						
					})
				})
			

			
	}


	toDonatePage = () => {
  	   const { history } = this.props;
  	   if(history) history.push('/Donate');
	}
	
	toAddPage = () => {
	   const { history } = this.props;
	   if(history) history.push('/Add');
	}

	finished = (e) => {
		e.preventDefault()
		let finished = ''
		let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)
		for (let i = 1; i < this.state.Mdata.length; i++){
			this.setState({
				ourValues: [...this.state.ourValues, this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - (this.props.add || 0) ]
			})
			// this.state.ourValues[i] = this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - this.props.add //this.props.add is temporary until additionDecrement works
			finished = this.state.ourValues[i] < 0 && this.state.ourValues[i] > -this.props.yourMonthly ? this.state.Mdata[i] : '';
				if (finished){
					this.setState({
						finished: finished
					})
				}
		}
	}


	render() {
		let ourValues = this.state.ourValues
		// let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0);
	
		let totalPayment =  0 //parseInt(this.state.monthly) + parseInt(additionalPayment) 	
		

		return (
			<div className="home-page" style={{ opacity:"100%" }} >
				<div className="part-one-container">
					<h1>Student Debt Slayers</h1>
				
				</div>
				<div className="Chart">
						 {/* <h3 className="you-are-paying">You are paying ${this.props.add === null ? this.props.yourMonthly : this.props.add > 0 ? totalPayment : 0}.00/ Month</h3>  */}
						<Card>
							<canvas
							id="myChart"
							ref={this.chartRef}	
							/> 	
						</Card>

						<br/>
					<button className="btn btn-success" id="home-page-donate-button" type="button" onClick={this.toDonatePage}>Update Chart</button>
					
					<button className="btn btn-warning" id="home-page-donate-button" type="button" onClick={this.toAddPage}>Increase or Decrease payment</button>
					<br/><br/>
					 {/* <div className="card" id='card-new'>
						
						<h5>After One year:</h5>
						<p> Your remaining debt is ${ourValues[11]}.00 <br/></p>
						<p> National Average remaining debt is ${this.state.nationalAverage[11]}.00 <br/></p>
		
						 <button id="how-many-months" className="btn btn-success" onClick={this.finished}>Click to see what month you will finish paying</button>  
						 <p>{this.state.finished}</p>
 					
						
					</div>   */}
				</div>
				<br/>
		</div>
		);
	}
}

 	export default withRouter(HomePageNew)
