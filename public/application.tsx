import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { MlCommonsApp } from './app';
import { InnerHttpProvider } from './apis/inner_http_provider';
import { APIProvider } from './apis/api_provider';

export const renderApp = (
  { notifications, http }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {
  InnerHttpProvider.setHttp(http);

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
    InnerHttpProvider.setHttp(undefined);
    APIProvider.clear();
  };
};
