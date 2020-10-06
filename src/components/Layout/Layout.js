import React from "react";
import css from "./Layout.module.css"
import BuilderPage from "../../containers/BuilderPage/BuilderPage";
import Header from "./Header/Header";
import Checkout from "../../containers/Checkout/Checkout";
import {Switch ,Route, Link} from 'react-router-dom'
const layout = (props)=>{
    return(
        <div className={css.layoutWrapper}>
            <Header/>
            <Switch>
                <Route path={'/checkout'} exact component={Checkout}/>
                <Route path={'/'} component={BuilderPage}/>
                </Switch>
        </div>
    )

}

export default layout