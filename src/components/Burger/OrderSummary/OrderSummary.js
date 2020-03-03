import React, {Component} from 'react';
import Button from '../../UI/Button/Button'

class orderSummery extends Component {

    // By using componentWillUpdate we see even the orderSummery not show in the page, it still rerender when click any button.
    // So we chould improve performance by editing [Modal] because it is unnecessary to update.
    componentWillUpdate() {
        console.log('[orderSummery] will update');
    }

    render() {

        let ingredientSummary = Object.keys(this.props.ingredients).map(ingredientsKey => {
            return <li key={ingredientsKey}>
                    <span style = {{textTransform: 'capitalize'}}>{ingredientsKey}</span>: {this.props.ingredients[ingredientsKey]}
                   </li>
            });

        return(
            <>
            <h3>Your Oder</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
        <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to checkout?</p>
    
            {/* Make sure the buttonType value is same as Button.module.css name*/}
            <Button clicked = {this.props.purchaseCancelled} buttonType = 'Danger'>Cancel</Button>
            <Button clicked = {this.props.continuePurchasing} buttonType = 'Success'>Continue</Button>
    
            </>
        );
    }
};

export default orderSummery