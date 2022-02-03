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
					Mdata: [
						'Month 1',  'Month 2',  'Month 3',  'Month 4',  'Month 5',
						'Month 6',  'Month 7',  'Month 8',  'Month 9',  'Month 10',
						'Month 11', 'Month 12', 'Month 13', 'Month 14', 'Month 15',
						'Month 16', 'Month 17', 'Month 18', 'Month 19', 'Month 20',
						'Month 21', 'Month 22', 'Month 23', 'Month 24', 'Month 25',
						'Month 26', 'Month 27', 'Month 28', 'Month 29', 'Month 30',
						'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35',
						'Month 36', 'Month 37', 'Month 38', 'Month 39', 'Month 40',
						'Month 41', 'Month 42', 'Month 43', 'Month 44', 'Month 45',
						'Month 46', 'Month 47', 'Month 48', 'Month 49', 'Month 50',
						'Month 51', 'Month 52', 'Month 53', 'Month 54', 'Month 55',
						'Month 56', 'Month 57', 'Month 58', 'Month 59', 'Month 60',
						'Month 61', 'Month 62', 'Month 63', 'Month 64', 'Month 65',
						'Month 66', 'Month 67', 'Month 68', 'Month 69', 'Month 70',
						'Month 71', 'Month 72', 'Month 73', 'Month 74', 'Month 75',
						'Month 76', 'Month 77', 'Month 78', 'Month 79', 'Month 80',
						'Month 81', 'Month 82', 'Month 83', 'Month 84', 'Month 85',
						'Month 86', 'Month 87', 'Month 88', 'Month 89', 'Month 90',
						'Month 91', 'Month 92', 'Month 93', 'Month 94', 'Month 95'
					  ],
					nMonthly: 393,
					monthly: this.props.yourMonthly,
					ourValues: [],
					startingValue: this.props.amount,
					nationalAverage: [
						37000, 36607, 36214, 35821, 35428, 35035, 34642, 34249,
						33856, 33463, 33070, 32677, 32284, 31891, 31498, 31105,
						30712, 30319, 29926, 29533, 29140, 28747, 28354, 27961,
						27568, 27175, 26782, 26389, 25996, 25603, 25210, 24817,
						24424, 24031, 23638, 23245, 22852, 22459, 22066, 21673,
						21280, 20887, 20494, 20101, 19708, 19315, 18922, 18529,
						18136, 17743, 17350, 16957, 16564, 16171, 15778, 15385,
						14992, 14599, 14206, 13813, 13420, 13027, 12634, 12241,
						11848, 11455, 11062, 10669, 10276,  9883,  9490,  9097,
						 8704,  8311,  7918,  7525,  7132,  6739,  6346,  5953,
						 5560,  5167,  4774,  4381,  3988,  3595,  3202,  2809,
						 2416,  2023,  1630,  1237,   844,   451,    58,  0
					  ],
					finished: '',
					whichGraph: '',
				}
			// let i = 1;
			// while(this.state.nationalAverage[this.state.nationalAverage.length-1] > 0){
			// 	this.setState({
			// 		nationalAverage: [...this.state.nationalAverage, this.state.nationalAverage[i - 1] - this.state.nMonthly],
			// 		// Mdata: [...this.state.Mdata, "month " + (i + 1)],
			// 		// nationalAverage: this.state.nationalAverage.concat(this.state.nationalAverage[i - 1] - this.state.nMonthly),
			// 		Mdata: this.state.Mdata.concat("month " + (i + 1))
			// 	})
			// 		i++;
			// 		console.log('Hi')
			// }

		}

		chartRef = React.createRef();
		
		// updateState = async function(i) {
		// 	return await this.setState({ourValues: [...this.state.ourValues, this.state.ourValues[i - 1] - this.state.monthly]});
				
		// 	// 	function(state,props) {
		// 	// 	console.log(state.ourValues[i - 1]);
		// 	// 	return {ourValues: [...state.ourValues, state.ourValues[i - 1] - state.monthly]};
		// 	// })
		// };
		
		componentDidMount() {

			axios
				.get('http://localhost:8080/calculate', { params: {loanAmount:this.state.startingValue, monthly:this.state.monthly} } )
				.then((ret)=> {
					this.setState({ourValues:ret.data.loanPaydown})
				})
				.then(() => {
					const ctx = this.chartRef.current.getContext("2d");
					// let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)
		
					Chart.defaults.scales.linear.min = 0;
					console.log(this.state.ourValues);
					new Chart(ctx, {
						type: "line",
					
						data: {
							labels: this.state.Mdata,
								
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
		// let additionalPayment = this.props.add
		// let finished = ''
		let ourValues = this.state.ourValues
		// let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0);

		// for (let i = 1; i < this.state.Mdata.length; i++){
		// 	this.setState({
		// 		ourValues: [...this.state.ourValues, this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - (this.props.add || 0) ],
		// 		nationalAverage: [...this.state.nationalAverage, this.state.nationalAverage[i - 1] - this.state.nMonthly ]
		// 	})
		// 	ourValues[i] = ourValues[i - 1] - this.state.monthly - additionalDecrement[i]
		// 	// this.state.nationalAverage[i] = this.state.nationalAverage[i - 1] - this.state.nMonthly
		// 	finished = ourValues[i] < 0 && ourValues[i] > -500 ? this.state.Mdata[i] : '';	
		// }
	
		let totalPayment =  0 //parseInt(this.state.monthly) + parseInt(additionalPayment) 	
		

		return (
			<div className="home-page" style={{ opacity:"100%" }} >
				<div className="part-one-container">
					<h1>Student Debt Slayers</h1>
				
				</div>
				<div className="Chart">
						 <h3 className="you-are-paying">You are paying ${this.props.add === null ? this.props.yourMonthly : this.props.add > 0 ? totalPayment : 0}.00/ Month</h3> 
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


// import React, { PureComponent} from "react";
// import { withRouter } from 'react-router-dom';
// import { Line, Bar } from 'react-chartjs-2';
// import {CategoryScale} from 'chart.js'
// import { Chart as ChartJS } from 'chart.js/auto'
// import { Form, Card, Row, Col, InputGroup} from 'react-bootstrap'
// import Chart from 'chart.js/auto';

// 	class HomePageNew extends PureComponent{
// 		constructor(props){
// 			super(props);
// 				this.state = {
// 					// Mdata: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12',
//  					// 		'Month 13', 'Month 14', 'Month 15', 'Month 16','Month 17', 'Month 18', 'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24',
//  					// 		'Month 25', 'Month 26', 'Month 27', 'Month 28', 'Month 29', 'Month 30', 'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35', 'Month 36'],
// 					Mdata: [],
// 					nMonthly: 393,
// 					monthly: this.props.yourMonthly,
// 					ourValues: [this.props.amount],
// 					nationalAverage: [this.props.amount],
// 					finished: '',
// 					whichGraph: '',
// 				}
// 		}

// 		chartRef = React.createRef();
		
		

// 		componentDidMount() {
// 			const ctx = this.chartRef.current.getContext("2d");
// 			let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)

// 			for (let i = 1; i < this.state.Mdata.length; i++){
// 				this.state.ourValues[i] = this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - this.props.add //this.props.add is temporary until additionDecrement works
// 				this.state.nationalAverage[i] = this.state.nationalAverage[i - 1] - this.state.nMonthly
// 			}

// 			Chart.defaults.scales.linear.min = 0;
		
// 			if (this.props.plan === "Aggressive"){
// 			let ourValues = this.state.ourValues	
// 			new Chart(ctx, {
// 				type: "line",
			
// 				data: {
// 					labels: this.state.Mdata,
						
// 						datasets: [
// 							{ 
// 							data: this.state.ourValues,
// 							label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
// 							borderColor: "#3e95cd",
// 							backgroundColor: "#7bb6dd",
							
// 							}, 
// 							{
// 						    label: 'Student Debt National Average',
// 						    data: this.state.nationalAverage,
// 						    borderColor: 'red',
// 						    backgroundColor: "red"
// 					        }
// 						]
// 				},
				
// 			})
// 			}

// 			else if (this.props.plan === "Moderate"){
				
// 				new Chart(ctx, {
// 				type: "line",
// 				data: {
// 					labels: this.state.Mdata,
// 						datasets: [
// 							{ 
// 							data: this.state.ourValues,
// 							label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
// 							borderColor: "#3cba9f",
// 							backgroundColor: "#71d1bd",	
// 							},
// 							{
// 						    label: 'Student Debt National Average',
// 						    data: this.state.nationalAverage,
// 						    borderColor: 'red',
// 						    backgroundColor: "red"
// 					        }
// 						]
// 				}		
// 			})
// 			}

// 		else if (this.props.plan === "Easy"){
// 			new Chart(ctx, {
// 			type: "line",
// 			data: {
// 				labels: this.state.Mdata,
// 					datasets: [
// 						{ 
// 						data: this.state.ourValues,
// 						label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
// 						borderColor: "#3cba9f",
// 						backgroundColor: "#71d1bd",	
// 						},
// 						{
// 					    label: 'Student Debt National Average',
// 					    data: this.state.nationalAverage,
// 					    borderColor: 'red',
// 					    backgroundColor: "red"
// 				        }
// 					]
// 			}		
// 		})
// 		}
			
// 	}


// 	toDonatePage = () => {
//   	   const { history } = this.props;
//   	   if(history) history.push('/Donate');
// 	}
	
// 	toAddPage = () => {
// 	   const { history } = this.props;
// 	   if(history) history.push('/Add');
// 	}

// 	finished = (e) => {
// 		e.preventDefault()
// 		let finished = ''
// 		let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)
// 		for (let i = 1; i < this.state.Mdata.length; i++){
// 			this.state.ourValues[i] = this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - this.props.add //this.props.add is temporary until additionDecrement works
// 			finished = this.state.ourValues[i] < 0 && this.state.ourValues[i] > -this.props.yourMonthly ? this.state.Mdata[i] : '';
// 				if (finished){
// 					this.setState({
// 						finished: finished
// 					})
// 				}
// 		}
// 	}


// 	render() {
// 		let additionalPayment = this.props.add
// 		let finished = ''
// 		let ourValues = this.state.ourValues
// 		let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)
// 		for (let i = 1; i < this.state.Mdata.length; i++){
// 			ourValues[i] = ourValues[i - 1] - this.state.monthly - additionalDecrement[i]
// 			this.state.nationalAverage[i] = this.state.nationalAverage[i - 1] - this.state.nMonthly
// 			finished = ourValues[i] < 0 && ourValues[i] > -500 ? this.state.Mdata[i] : '';	
// 		}
	
// 		let totalPayment = parseInt(this.state.monthly) + parseInt(additionalPayment) 	
		

// 		return (
// 			<div className="home-page" style={{ opacity:"100%" }} >
// 				<div className="part-one-container">
// 					<h1>Student Debt Slayers</h1>
				
// 				</div>
// 				<div className="Chart">
// 						 <h3 className="you-are-paying">You are paying ${this.props.add === null ? this.props.yourMonthly : this.props.add > 0 ? totalPayment : 0}.00/ Month</h3> 
// 						<Card>
// 							<canvas
// 							id="myChart"
// 							ref={this.chartRef}	
// 							/> 	
// 						</Card>

// 						<br/>
// 					<button className="btn btn-success" id="home-page-donate-button" type="button" onClick={this.toDonatePage}>Update Chart</button>
					
// 					<button className="btn btn-warning" id="home-page-donate-button" type="button" onClick={this.toAddPage}>Increase or Decrease payment</button>
// 					<br/><br/>
// 					 <div className="card" id='card-new'>
						
// 						<h5>After One year:</h5>
// 						<p> Your remaining debt is ${ourValues[11]}.00 <br/></p>
// 						<p> National Average remaining debt is ${this.state.nationalAverage[11]}.00 <br/></p>
		
// 						 <button id="how-many-months" className="btn btn-success" onClick={this.finished}>Click to see what month you will finish paying</button>  
// 						 <p>{this.state.finished}</p>
 					
						
// 					</div>  
// 				</div>
// 				<br/>
// 		</div>
// 		);
// 	}
// }

// 	export default withRouter(HomePageNew)