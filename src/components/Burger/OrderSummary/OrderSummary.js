import React from 'react';
import Button from '../../UI/Button/Button'

const orderSummery = (props) => {

    let ingredientSummary = Object.keys(props.ingredients).map(ingredientsKey => {
    return <li key={ingredientsKey}>
            <span style = {{textTransform: 'capitalize'}}>{ingredientsKey}</span>: {props.ingredients[ingredientsKey]}
           </li>
    });

    return(
        <>
        <h3>Your Oder</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
    <p><strong>Total Price: {props.price}</strong></p>
        <p>Continue to checkout?</p>

        {/* Make sure the buttonType value is same as Button.module.css name*/}
        <Button clicked = {props.purchaseCancelled} buttonType = 'Danger'>Cancel</Button>
        <Button clicked = {props.continuePurchasing} buttonType = 'Success'>Continue</Button>

        </>
    );
};

export default orderSummery