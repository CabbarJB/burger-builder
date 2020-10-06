import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import css from './BuilderPage.module.css'
import Modal from "../../components/Modal/Modal";
import Button from "../../shared/Button/Button";
import axios from '../../axios/axios-orders'
import Checkout from "../Checkout/Checkout";
import {Route , Link} from 'react-router-dom'

const PRICES = {
    meat:5,
    salad:1,
    cheese:2,
    bacon:3
};

class BuilderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients:{
                salad:0,
                cheese:0,
                meat:0,
                bacon:0
            },
            controls:[
                {type:'salad',name:'Salad'},
                {type:'bacon',name:'Bacon'},
                {type:'meat',name:'Meat'},
                {type:'cheese',name:'Cheese'}
            ],
            totalPrice:0,
            purchasable:false,
            isPurchasing:false
        }
        this.addIngredient=(type)=>{
            let oldPrice = this.state.totalPrice;
            let newPrice = oldPrice+PRICES[type];

            let oldCount = this.state.ingredients[type];
            let newCount=oldCount+1;
            let newIngredients = {
                ...this.state.ingredients
            };
            newIngredients[type] = newCount;
            this.setState({ingredients:newIngredients,totalPrice:newPrice })
            this.setPurchasableState(newIngredients)

        }
        this.removeIngredient = (type)=>{
            let oldPrice = this.state.totalPrice;
            let newPrice = oldPrice-PRICES[type];
            let oldCount = this.state.ingredients[type]
            let newCount = oldCount-1;
            if (newCount>=0)
            {
                let newIngredients = {
                    ...this.state.ingredients
                }
                newIngredients[type] = newCount;
                this.setState({
                    ingredients:newIngredients,totalPrice:newPrice
                })
                this.setPurchasableState(newIngredients)
            }
        }

        this.checkoutHandler = ()=>{
            this.setState({isPurchasing:true})
        }
        this.setPurchasableState = (ing)=>{

            let sum = Object.keys(ing).map((key)=>{
                return ing[key]
            }).reduce((sum,el)=>{
                return sum+el
            },0)
            this.setState({purchasable:sum>0})
        }
        this.hideModal = ()=>{
            this.setState({isPurchasing:false})
        }
        this.continue = ()=>{
            const order={
                ingredients: this.state.ingredients,
                price:this.state.totalPrice,
                customer:{
                    id:0,
                    name:'JB',
                    phone:'055 vse gaga ele bu'
                }
            }
            // alert('lmao ok Nigga here ya go dis ur sandwich. Lmao Lame ass Nigga')
            axios.post('/orders.json',order).then((response)=>{
                console.log(response)
            });

            this.props.history.push('/checkout')

        }
    }
    render() {
        const disabled = {
            ...this.state.ingredients
        }
        for(let key in disabled){
            disabled[key] = disabled[key]<=0;
        }
        return (
            <div className={css.BuilderPageWrapper}>
                <Modal hideModal={this.hideModal} show={this.state.isPurchasing}>
                    <p>{this.state.totalPrice}</p>
                    <Button hide={this.hideModal} type={'Cancel'}>Cancel</Button>
                    <Button hide={this.continue} type={'Confirm'}>Confirm</Button>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    disabled={disabled}
                    removeIngredient={this.removeIngredient}
                    addIngredient={this.addIngredient}
                    controls={this.state.controls}
                    clicked={this.checkoutHandler}
                />
            </div>
        );
    }
}

export default BuilderPage;