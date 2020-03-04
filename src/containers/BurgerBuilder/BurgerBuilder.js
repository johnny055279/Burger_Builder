import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';

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
        orderButtonClicked: false,
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

    orderButtonClickedHandler = () => {
        this.setState({orderButtonClicked: true});
    }

    modalClickedHandler = () => {
        this.setState({orderButtonClicked: false});
    }

    continuePurchasingHandler = () => {

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Johnny',
                address: {
                    street: 'TestStreet 1',
                    zipcode: '5564',
                    country: 'Taiwan',
                },
                email: 'Test.gmail.com'
            },
            deliveryMethod: 'Fastest'
        }

        // .json just a format with firebase.com
        axiosInstance.post('/orders.json', order).then(response => {
            console.log(response)
            // this.setState(response)
        }).catch(error => console.log(error));
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
            <Modal show = {this.state.orderButtonClicked} modalClosed = {this.modalClickedHandler}>
                <OrderSummary ingredients = {this.state.ingredients}
                              purchaseCancelled = {this.modalClickedHandler}
                              continuePurchasing = {this.continuePurchasingHandler}
                              price = {this.state.totalPrice.toFixed(2)}/>
            </Modal>

            <Burger ingredients={this.state.ingredients}/>

            <BuildControls ingredientAdd={this.addIngredientsHandler} 
                           ingredientRemove = {this.removeIngredientsHandler}
                           disableButton = {disabledInfo}
                           price = {this.state.totalPrice}
                           purchasable = {this.state.puchasable}
                           ordered = {this.orderButtonClickedHandler}/>
            </>
        );
    }
}

export default BurgerBuilder