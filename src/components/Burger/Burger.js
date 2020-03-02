import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // For BurgerBuilder, ingredients is an object, not array.
    // Here use the Object.keys() to convert our ingredients into array so we can map() them.
    // key() return a array.
    // ingredientsKey means meat, bacon, salad...etc, not the value.
    // map() executes a function on each element in the input array.

    let transformIngredients = Object.keys(props.ingredients).map(ingredientsKey => {
        
        // Transform this string value into an array with many elements.
        // Array gives a length which should be the amount of the ingredients.
        // usethe underscore as an argument name to indicate that it's a blank
        // {ingredientsKey + index} creates a unique key for each ingredient
        
        return [...Array(props.ingredients[ingredientsKey])].map((_, index) => {
            return <BurgerIngredient key = {ingredientsKey + index} type = {ingredientsKey}/>;
        });

        // reudce(previousValue, currentValue) allows us to transform an array into something else
        // Use concat to combine array

    }).reduce((arr, element) => {return arr.concat(element)}, []);

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Pleast start adding ingredients!</p>
    }

    console.log(transformIngredients);

    return(

        <div className={classes.Burger}>

            {/* BurgerIngredient needs a type, or get error */}
            <BurgerIngredient type='bread-top'/>

            {transformIngredients} 

            <BurgerIngredient type='bread-bottom'/>  
        </div>
    );
}

export default burger