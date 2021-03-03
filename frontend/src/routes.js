import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Comparator from './pages/Comparator'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Comparator}/>
            </Switch>
        </BrowserRouter>
    )
}