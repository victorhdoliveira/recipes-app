import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';

function Routes() {
  return (
    // é precisar trazer os componentes para as rotas e implementar
    // a lógica referente aos ID das receitas
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      {/* <Route path="/drinks" component={ } />
      <Route path="/meals/:id-da-receita" component={ } />
      <Route path="/drinks/:id-da-receita" component={ } />
      <Route path="/meals/:id-da-receita/in-progress" component={ } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ } />
      <Route path="/profile" component={ } />
      <Route path="/done-recipes" component={ } />
      <Route path="/favorite-recipes" component={ } /> */}
    </Switch>
  );
}

export default Routes;
