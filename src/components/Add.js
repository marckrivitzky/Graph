import React, { PureComponent} from "react";
import { withRouter } from 'react-router-dom';
import { Form, Card, Row, Col, InputGroup} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

class Add extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			add: null,
			whichMonth: '',
		}
	}

	handleInputChangeAdd = (e) => {this.setState({add: e.target.value  });}
    handleSubmitAdd = () => {this.props.onSubmitAdd( this.state.add);}
	handleInputChangeWhichMonth = (e) => {this.setState({whichMonth: e.target.value  });}
    handleSubmitWhichMonth = () => {this.props.onSubmitWhichMonth( this.state.whichMonth);}



	toHomePage = () => {
	   const { history } = this.props;
	   if(history) history.push('/');
	}


	render(){
	
		
		return(
			<div className="donate-container">
				<div classeName="form-card-container">
					<Row className="form-card-contain">
						<Col>
							<Card className="form-card" style={{ width: '40rem',backgroundColor: "#212529", color:"white", border:"10px solid rgb(194, 134, 22)" }}> 
								<br/><h3>Student Debt Slayers</h3>
								<Card.Body>
									<Form>
								    	
										<Form.Group as={Col} controlId="formGridZip">
											<Form.Label>Pay more per month</Form.Label>
											<InputGroup className="mb-3">
										    	<InputGroup.Text>$</InputGroup.Text>
										  			<Form.Control type="number" value={this.state.add} onChange={ this.handleInputChangeAdd }  />
										    		<InputGroup.Text>.00</InputGroup.Text>
										  		</InputGroup>
									  	</Form.Group>
										<br/>	
										<Form.Group as={Col} controlId="formGridPassword">
										    <Form.Label>Month?</Form.Label>
											<Form.Control type="text" value={ this.state.whichMonth } onChange={ this.handleInputChangeWhichMonth } />
								   		</Form.Group>
										

										<button className="btn btn-success" type="button" onClick={(event) => {this.handleSubmitAdd(); this.handleSubmitWhichMonth(); this.toHomePage(event); }} >Enter</button>
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

export default withRouter(Add)