import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { MlCommonsApp } from './app';
import { HttpProvider } from './services/http_provider';

export const renderApp = (
  { notifications, http }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {
  HttpProvider.setHttp(http);

  ReactDOM.render(
    <MlCommonsApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
    />,
    element
  );

  return () => {
    ReactDOM.unmountComponentAtNode(element);
    HttpProvider.setHttp(undefined);
  };
};
