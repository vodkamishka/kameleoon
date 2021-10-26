import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from '../../pages/dashboard/dashboard';
import ResultsFinalize from '../../pages/results-finalize/results-finalize';
import './app.sass'

const App = () => {
    return (
        <div className={'app'}>
            <BrowserRouter>
              <Switch>
                  <Route path={'/dashboard'} exact>
                    <Dashboard/>
                  </Route>
                  <Route path={'/results/:id'} exact>
                      <ResultsFinalize/>
                  </Route>
                  <Route path={'/finalize/:id'} exact>
                      <ResultsFinalize/>
                  </Route>
                  <Redirect to={'/dashboard'}/>
              </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;