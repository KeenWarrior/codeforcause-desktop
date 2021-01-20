import { makeStyles, ThemeProvider, createStyles } from '@material-ui/core';
import React from 'react';
import Auth from './auth';
import Routes from './routes';
import { createTheme } from './theme';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
        // overflow: 'hidden',
        color: '#000',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  }),
);

export default function App() {
  useStyles();

  return (
    <ThemeProvider theme={createTheme()}>
      <Auth>
        <Routes />
      </Auth>
    </ThemeProvider>
  );
}
