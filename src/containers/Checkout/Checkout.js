import React, {Component} from 'react';
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
    state={
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            bacon:0
        }
    }
    historyGoBack = ()=>{
        this.props.history.goBack()
    }
    render() {
        return (
            <div>
<CheckoutSummary {...this.props} ingredients={this.state.ingredients}/>
            </div>
        );
    }
}

export default Checkout;