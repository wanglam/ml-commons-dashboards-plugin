import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { EuiPage, EuiPageBody, EuiPageSideBar } from '@elastic/eui';

import { CoreStart } from '../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { ModelList } from './pages/ModelList';
import { NavPanel } from './components/nav_panel';

interface MlCommonsAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const MlCommonsApp = ({ basename, notifications, http, navigation }: MlCommonsAppDeps) => {
  return (
    <Router basename={basename}>
      <EuiPage>
        <EuiPageSideBar>
          <NavPanel />
        </EuiPageSideBar>
        <EuiPageBody>
          <Switch>
            <Route path="/model">
              <ModelList />
            </Route>
          </Switch>
        </EuiPageBody>
      </EuiPage>
      <Redirect path="/" to="/model" />
    </Router>
  );
};
