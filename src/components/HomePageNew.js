import React, { PureComponent} from "react";
import { withRouter } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'
import { Chart as ChartJS } from 'chart.js/auto'
import { Form, Card, Row, Col, InputGroup} from 'react-bootstrap'
import Chart from 'chart.js/auto';

	class HomePageNew extends PureComponent{
		constructor(props){
			super(props);
				this.state = {
					// Mdata: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12',
 					// 		'Month 13', 'Month 14', 'Month 15', 'Month 16','Month 17', 'Month 18', 'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24',
 					// 		'Month 25', 'Month 26', 'Month 27', 'Month 28', 'Month 29', 'Month 30', 'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35', 'Month 36'],
					Mdata: ['month 1'],
					nMonthly: 393,
					monthly: this.props.yourMonthly,
					ourValues: [this.props.amount],
					nationalAverage: [37000],
					finished: '',
					whichGraph: '',
				}
			let i = 1;
			while(this.state.nationalAverage[this.state.nationalAverage.length - 1] > 0){
				this.setState({
					// nationalAverage: [...this.state.nationalAverage, this.state.nationalAverage[i - 1] - this.state.nMonthly],
					// Mdata: [...this.state.Mdata, "month " + (i + 1)],
					nationalAverage: this.state.nationalAverage.concat(this.state.nationalAverage[i - 1] - this.state.nMonthly),
					Mdata: this.state.Mdata.concat("month " + (i + 1))


				})
					i++;
					console.log('Hi')
			}
		

		}

		chartRef = React.createRef();
		
		

		componentDidMount() {
			const ctx = this.chartRef.current.getContext("2d");
			let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)

			for (let i = 1; i < this.state.Mdata.length; i++){
				this.setState({
					//ourValues: [...this.state.ourValues, this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - this.props.add ]
					ourValues: [...this.state.ourValues, this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - this.props.add ]
				})



				//this.state.ourValues[i] = this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - this.props.add //this.props.add is temporary until additionDecrement works
				
			}

			Chart.defaults.scales.linear.min = 0;
		
			if (this.props.plan === "Aggressive"){
			let ourValues = this.state.ourValues	
			new Chart(ctx, {
				type: "line",
			
				data: {
					labels: this.state.Mdata,
						
						datasets: [
							{ 
							data: this.state.ourValues,
							label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
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
			}

			else if (this.props.plan === "Moderate"){
				
				new Chart(ctx, {
				type: "line",
				data: {
					labels: this.state.Mdata,
						datasets: [
							{ 
							data: this.state.ourValues,
							label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
							borderColor: "#3cba9f",
							backgroundColor: "#71d1bd",	
							},
							{
						    label: 'Student Debt National Average',
						    data: this.state.nationalAverage,
						    borderColor: 'red',
						    backgroundColor: "red"
					        }
						]
				}		
			})
			}

		else if (this.props.plan === "Easy"){
			new Chart(ctx, {
			type: "line",
			data: {
				labels: this.state.Mdata,
					datasets: [
						{ 
						data: this.state.ourValues,
						label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
						borderColor: "#3cba9f",
						backgroundColor: "#71d1bd",	
						},
						{
					    label: 'Student Debt National Average',
					    data: this.state.nationalAverage,
					    borderColor: 'red',
					    backgroundColor: "red"
				        }
					]
			}		
		})
		}
			
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
			this.state.ourValues[i] = this.state.ourValues[i - 1] - this.state.monthly - additionalDecrement[i] - this.props.add //this.props.add is temporary until additionDecrement works
			finished = this.state.ourValues[i] < 0 && this.state.ourValues[i] > -this.props.yourMonthly ? this.state.Mdata[i] : '';
				if (finished){
					this.setState({
						finished: finished
					})
				}
		}
	}


	render() {
		let additionalPayment = this.props.add
		let finished = ''
		let ourValues = this.state.ourValues
		let additionalDecrement =  new Array(this.state.Mdata.length + 1).fill(0)
		for (let i = 1; i < this.state.Mdata.length; i++){
			ourValues[i] = ourValues[i - 1] - this.state.monthly - additionalDecrement[i]
			this.state.nationalAverage[i] = this.state.nationalAverage[i - 1] - this.state.nMonthly
			finished = ourValues[i] < 0 && ourValues[i] > -500 ? this.state.Mdata[i] : '';	
		}
	
		let totalPayment = parseInt(this.state.monthly) + parseInt(additionalPayment) 	
		

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
					 <div className="card" id='card-new'>
						
						<h5>After One year:</h5>
						<p> Your remaining debt is ${ourValues[11]}.00 <br/></p>
						<p> National Average remaining debt is ${this.state.nationalAverage[11]}.00 <br/></p>
		
						 <button id="how-many-months" className="btn btn-success" onClick={this.finished}>Click to see what month you will finish paying</button>  
						 <p>{this.state.finished}</p>
 					
						
					</div>  
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