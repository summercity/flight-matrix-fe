/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Schedule from 'containers/Schedule/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import TopNav from '../TopNav';
import Status from '../Status';
import Confirmation from '../Confirmation';
import { NonRecurring } from '../NonRecurring';

export default function App() {
  return (
    <div>
      <TopNav />
      <Status />
      <Confirmation />
      <NonRecurring />
      <Switch>
        <Route exact path="/" component={Schedule} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
