import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProviderComponent } from 'core/theme';
import { RouterComponent } from 'core/router';
import { ApolloProvider } from '@apollo/client';
import { gqlClient } from 'core/graphql';

const App: React.FunctionComponent = () => {
  return <RouterComponent />;
};

const AppProviders: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <ThemeProviderComponent>
        <App />
      </ThemeProviderComponent>
    </ApolloProvider>
  );
};

export default hot(AppProviders);
