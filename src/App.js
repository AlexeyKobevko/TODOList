import './assets/global.scss'

import React from "react";
import {Switch, Route } from 'react-router-dom';

import { Footer } from "templates/Footer";
import { Aside } from "templates/Aside";
import { TodoContainer } from "controllers/TodoList/TodoPage";
import { AuthContainer } from "controllers/Auth/Auth";
import { HeaderContainer } from "templates/Header/Header";


export const App = () => (
  <div>
    <HeaderContainer/>
    <main className="grid-container">
      <Aside/>
      <div className="content">
        <Switch>
          <Route exact path="/" component={TodoContainer} />
          <Route exact path="/login" component={AuthContainer} />
        </Switch>
      </div>
    </main>
    <Footer/>
  </div>
);