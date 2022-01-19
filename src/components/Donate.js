import React, { PureComponent} from "react";
import { withRouter } from 'react-router-dom';
import { Form, Card, Row, Col, InputGroup} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

class Donate extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			plan: '',
			amount: null,
			monthly: null,
			income: null,
			yourMonthly: null,
			interestRate: null,
		}
	}
	handleInputChangeMonthly = (e) => {this.setState({ monthly: e.target.value });}
    handleSubmitMonthly = () => {this.props.onSubmitMonthly(this.state.monthly);}
	handleInputChangePlan = (e) => {this.setState({ plan: e.target.value });}
    handleSubmitPlan = () => {this.props.onSubmitPlan(this.state.plan);}
	handleInputChangeAmount = (e) => {this.setState({amount: e.target.value  });}
    handleSubmitAmount = () => {this.props.onSubmitAmount( this.state.amount);}
	handleInputChangeIncome = (e) => {this.setState({income: e.target.value  });}
    handleSubmitIncome = () => {this.props.onSubmitIncome( this.state.income);}
	handleInputChangeYourMonthly = (e) => {this.setState({yourMonthly: e.target.value  });}
    handleSubmitYourMonthly = () => {this.props.onSubmitYourMonthly( this.state.yourMonthly);}
	handleInputChangeInterestRate = (e) => {this.setState({interestRate: e.target.value  });}
    handleSubmitInterestRate = () => {this.props.onSubmitInterestRate( this.state.interestRate);}

	toHomePage = () => {
	   const { history } = this.props;
	   if(history) history.push('/');
	}

	clearInput = () => {
		this.setState({
			plan: '',amount: '',})

	}

	render(){
		const space = "  "
		
		return(
			<div className="donate-container">
				<div classeName="form-card-container">
					<Row className="form-card-contain">
						<Col>
							<Card className="form-card" style={{ width: '40rem',backgroundColor: "#212529", color:"white", border:"10px solid rgb(194, 134, 22)" }}> 
								<br/><h3>Student Debt Slayers</h3>
								<Card.Body>
									<Form>
								    	<Form.Group as={Col} controlId="formGridPassword">
										    <Form.Label>Plan?</Form.Label>
											<Form.Control placeholder="Easy, Moderate, or Aggressive?" type="text" value={ this.state.plan } onChange={ this.handleInputChangePlan } />
								   		</Form.Group>
										<br/>
										<Form.Group as={Col} controlId="formGridZip">
											<Form.Label>Income Amount</Form.Label>
											<InputGroup className="mb-3">
										    	<InputGroup.Text>$</InputGroup.Text>
										  			<Form.Control type="number" value={ this.state.income } onChange={ this.handleInputChangeIncome }  />
										    		<InputGroup.Text>.00</InputGroup.Text>
										  		</InputGroup>
									  	</Form.Group>
										<br/>
										<Form.Group as={Col} controlId="formGridZip">
											<Form.Label>Interest Rate</Form.Label>
											<InputGroup className="mb-3">
										    	<InputGroup.Text>%</InputGroup.Text>
										  			<Form.Control type="number" value={ this.state.interestRate } onChange={ this.handleInputChangeInterestRate }  />
										  		</InputGroup>
									  	</Form.Group>
										<br/>
										<Form.Group as={Col} controlId="formGridZip">
											<Form.Label>Starting Debt Amount</Form.Label>
											<InputGroup className="mb-3">
										    	<InputGroup.Text>$</InputGroup.Text>
										  			<Form.Control placeholder="National average is $37,000.00" type="number" value={ this.state.amount } onChange={ this.handleInputChangeAmount }  />
										    		<InputGroup.Text>.00</InputGroup.Text>
										  		</InputGroup>
									  	</Form.Group>	
										<br/>
										<Form.Group as={Col} controlId="formGridZip">
											<Form.Label>Monthly payment amount</Form.Label>
											<InputGroup className="mb-3">
										    	<InputGroup.Text>$</InputGroup.Text>
										  			<Form.Control placeholder="National average is $393.00/Month" type="number" value= {this.state.plan === "Aggressive" ? this.state.yourMonthly = Math.round(393 * 2.25)  : this.state.plan === "Moderate" ? this.state.yourMonthly = Math.round(393 * 1.75) : this.state.plan === "Easy" ? this.state.yourMonthly = Math.round(393 * 1.5) : this.state.yourMonthly = null} onChange={ this.handleInputChangeYourMonthly }  />
										    		<InputGroup.Text>.00</InputGroup.Text>
										  		</InputGroup>
									  	</Form.Group>


										<br/>	

										<button className="btn btn-success" type="button" onClick={(event) => {this.handleSubmitPlan(); this.handleSubmitInterestRate(); this.handleSubmitIncome(); this.handleSubmitAmount(); this.handleSubmitYourMonthly(); this.clearInput(event); this.toHomePage(event); }} >Enter</button>{space}
									</Form>	
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
		 	</div>	
		);
	}
}

export default withRouter(Donate)



											




