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
import SideNav from '../SideNav';

import Recurring from '../Recurring';
import RecurringForm from '../Recurring/Form';

import Users from '../Users';
import UserForm from '../Users/Form';

export default function App() {
  return (
    <div>
      <TopNav />
      <Status />
      <Confirmation />
      <NonRecurring />
      <SideNav />
      <Switch>
        <Route exact path="/" component={Recurring} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/form" component={UserForm} />
        <Route exact path="/users/form/:id" component={UserForm} />
        <Route exact path="/recurring/schedules" component={Recurring} />
        <Route
          exact
          path="/recurring/schedules/form"
          component={RecurringForm}
        />
        <Route
          exact
          path="/recurring/schedules/form/:id"
          component={RecurringForm}
        />
        <Route exact path="/schedule" component={Schedule} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
