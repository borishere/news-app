import React from 'react'
import NewsList from './features/News/NewsList'
import { Container } from 'semantic-ui-react'

import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewsItemPage from './features/News/NewsItemPage';

const App = () => {
    return (
        <BrowserRouter>
            <Container>
                <Switch>
                    <Route exact path='/' component={NewsList}></Route>
                    <Route exact path='/news/:id' component={NewsItemPage}></Route>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;