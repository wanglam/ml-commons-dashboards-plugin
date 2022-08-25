import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { EuiPage, EuiPageBody, EuiPageSideBar } from '@elastic/eui';

import { CoreStart } from '../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { ModelList } from './pages/ModelList';
import { TaskList } from './pages/TaskList';
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
            <Route path="/model" component={ModelList} />
            <Route path="/task" component={TaskList} />
            <Redirect path="/" to="/model" exact />
          </Switch>
        </EuiPageBody>
      </EuiPage>
    </Router>
  );
};
