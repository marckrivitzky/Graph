

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageNew from './components/HomePageNew';
import Donate from './components/Donate'
import Add from './components/Add';
// import OurChart from './components/Chart'

export default class App extends React.Component {
 constructor(props){
    super(props);
		  this.state = {
			  plan: '',
        amount: null,
        monthly: null,
        income: null,
        yourMonthly: null,
        add: null,
        whichMonth: '',
        start: null,
        ourValues: null,
        interestRate: null,
        whichGraph: null
		}
	}
    updateDataAdd = (add) => {this.setState({add: add});}
    updateDataYourMonthly = (yourMonthly) => {this.setState({yourMonthly: yourMonthly})}
    updateDataIncome = (income) => {this.setState({income: income});}
    updateDataMonthly = (monthly) => {this.setState({monthly: monthly,})}
    updateDataPlan = (plan) => {this.setState({ plan: plan,});}
    updateDataAmount = (amount) => {this.setState({ amount: amount});}
    updateDataWhichMonth = (whichMonth) => {this.setState({ whichMonth: whichMonth});}
    updateDataStart = (start) => {this.setState({ start: start});}
    updateDataOurValues = (ourValues) => {this.setState({ ourValues: ourValues});}
    updateDataInterestRate = (interestRate) => {this.setState({ interestRate: interestRate});}
    
  render(){
    return (
      <div className="App">

        <Router>
          <Switch>

            <Route path="/" exact>
              <HomePageNew   plan={this.state.plan} interestRate={this.state.interestRate} ourValues={this.state.ourValues} whichMonth={this.state.whichMonth} start={this.state.start} add={this.state.add}  amount={this.state.amount} monthly={this.state.monthly} income={this.state.income} yourMonthly={this.state.yourMonthly} />
            </Route>
      

            <Route path="/Donate" exact>
              <Donate onSubmitPlan={ this.updateDataPlan } onSubmitInterestRate={this.updateDataInterestRate}  onSubmitOurValues={this.updateDataOurValues} onSubmitStart={this.updateDataStart}  onSubmitAmount={ this.updateDataAmount } onSubmitMonthly={ this.updateDataMonthly } onSubmitIncome={ this.updateDataIncome } onSubmitYourMonthly={ this.updateDataYourMonthly }    />
            </Route>

            <Route path="/Add" exact>
              <Add onSubmitAdd={ this.updateDataAdd } onSubmitWhichMonth={this.updateDataWhichMonth}    />
            </Route>


          </Switch>
        </Router>
      </div>
    );
  }
}
