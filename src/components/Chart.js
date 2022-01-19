// import React, { PureComponent} from "react";
// import { withRouter } from 'react-router-dom';
// import { Line, Bar } from 'react-chartjs-2';
// import {CategoryScale} from 'chart.js'
// import { Chart as ChartJS } from 'chart.js/auto'
// import { Form, Card, Row, Col, InputGroup} from 'react-bootstrap'

// new class OurChart extends PureComponent{
// 	constructor(props){
// 		super(props);
		
// 			let Mdata = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12', 'Month 13', 'Month 14', 'Month 15', 'Month 16' ]
// 			let nMonthly = 393;
// 			let monthly = this.props.yourMonthly
// 			let start = this.props.amount
// 			let ourValues = [start]
// 			let nationalAverage = [start]
// 			let additionalDecrement =  new Array(Mdata.length + 1).fill(0)

// 			for (let i = 1; i < Mdata.length; i++){
// 				ourValues[i] = ourValues[i - 1] - monthly - additionalDecrement[i]
// 				nationalAverage[i] = nationalAverage[i - 1] - nMonthly
// 			}
			
// 			this.state = {			

// 				chartDataAggressive: {
// 					labels: Mdata,
// 					datasets: [
// 						{
// 						 label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
// 						 data: ourValues,
// 						 borderColor: "green",
// 						backgroundColor: ['#416872', '#a5b0b5', '#84BDC9', '#1f3b42'],
// 					    },
					
// 						{
// 						 label: 'Student Debt National Average',
// 						 data: nationalAverage,
// 						 borderColor: 'red',
// 						backgroundColor: "red"
// 					   }
// 					],	
// 				},
				
// 				chartDataModerate: {
// 					labels: Mdata,
// 					datasets: [
// 					   {
// 						label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
// 						data: ourValues,
// 						borderColor: "green",
// 						backgroundColor: ['#416872', '#a5b0b5', '#84BDC9', '#1f3b42'],
// 					  },
// 						{
// 						 label: 'Student Debt National Average',
// 						data: nationalAverage,
// 						 borderColor: 'red',
// 						backgroundColor: "red"
// 					   }
// 					]
// 				},

// 				chartDataEasy: {
// 					labels: Mdata,
// 					datasets: [
// 					  {
// 						label: 'Your' + ' ' +  this.props.plan + ' ' + 'Plan',
// 						data: ourValues,
// 						borderColor: "green",
// 						color: "green",
// 						backgroundColor: ['#416872', '#a5b0b5', '#84BDC9', '#1f3b42'],
// 					  },
// 					 {
// 						 label: 'Student Debt National Average',
// 						 data: nationalAverage,
// 						 borderColor: 'red',
// 						backgroundColor: "red"
// 					   }
// 				    ]
// 				},
// 			}		
	
// 	}
// 	render(){
// 		return(
// 			<div className="Chart">
			
// 				{this.props.plan === 'Aggressive' || this.props.plan === 'aggressive'
// 				 ? <Line data={this.state.chartDataAggressive}  />
// 				 : this.props.plan === 'Moderate' || this.props.plan === 'moderate'
// 				 ? <Line data={this.state.chartDataModerate} />
// 				 : <Line data={this.state.chartDataEasy} /> }
// 				<br/>
// 				<button className="btn btn-success" id="home-page-donate-button" type="button" onClick={this.toDonatePage}>Update Chart</button>
// 				<br/><br/>
// 				<button className="btn btn-warning" id="home-page-donate-button" type="button" onClick={this.toAddPage}>Increase or Decrease payment</button>
// 			</div>
// 		);
// 	}
// }

// export default withRouter(OurChart)
