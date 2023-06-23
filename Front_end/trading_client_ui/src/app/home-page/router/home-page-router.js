
import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { routes } from './home-page-router-constant'

export default function HomePageRouter() {
    return (
        <Switch>
            {routes.childrenRoutes.map(el => <Route exact path={routes.parentPath + el.path} render={props => (
                <el.component {...props} />)} key={el.id} />)}
            <Redirect from="/" to="/login" />
        </Switch>
    )
}
