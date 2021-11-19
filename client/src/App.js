import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Index from './pages';

  //Redux
  import { Provider } from "react-redux";
  import store from './Redux/store';

  

export default class App extends Component {
  state = {
    theme: 'light',
  };


  render() {
    return (
      <>
      <Provider store={store}>
        <BrowserRouter>
          <Route component={ScrollToTop} />
          <ThemeProvider
            value={{
              data: this.state,
              update: () => {
                this.setState((state) => ({
                  theme:
                    state.theme === 'light'
                      ? (this.theme = 'dark')
                      : (this.theme = 'light'),
                }));
              },
            }}
          >
            <Index />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
      </>
    );
  }
}

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};
