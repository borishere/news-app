import React from 'react'
import NewsList from './features/News/NewsList'
import { Container } from 'semantic-ui-react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewsItemPage from './features/News/NewsItemPage';

import './App.scss';

const App: React.FC = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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