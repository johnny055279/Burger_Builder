import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


// Set the prices of ingredients
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        puchasable: false,
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients).map(ingredientsKey => {

            // get the value
            return ingredients[ingredientsKey];
        }).reduce((sum, element) => {return sum + element;}, 0);

        this.setState({puchasable: sum > 0});
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        // Check order button
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        // Avoid minus count which cause error(because cant create a nagative length array).
        if (oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        // Check order button
        this.updatePurchaseState(updatedIngredients);
    }


    render() {

        // Check the counts of ingredients to disable button.
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // return boolean
        }

        // {salad: true, meat: false, ...etc}
        return (
            <>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientAdd={this.addIngredientsHandler} 
                           ingredientRemove = {this.removeIngredientsHandler}
                           disableButton = {disabledInfo}
                           price = {this.state.totalPrice}
                           purchasable = {this.state.puchasable}/>
            </>
        );
    }
}

export default BurgerBuilder