import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { getSession } from './auth/authenticationSlice';
import Login from './components/backend/auth/Login';
import MainLayout from './layout/MainLayout';
import { RootState } from './store/store';
import PrivateRoute from './auth/private-route';

import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/front-end/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/front-end/shops/Sdata";

interface AppProps extends PropsFromRedux {}

const App = (props: AppProps) => {
  const { sessionHasBeenFetched, isAuthenticated, getSession } = props;

  useEffect(() => {
    getSession();
  }, []);

  const { productItems } = Data
  const { shopItems } = Sdata

  //Step 2 :
  const [CartItem, setCartItem] = useState<any>([]);

  //Step 4 :
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // inside  setCartItem we will run filter to check if item.id is match to product.id
    // if the item.id is doesnt match to product.id then that items are display in cart
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          {/* <PrivateRoute exact path="/" component={MainLayout}></PrivateRoute> */}
          <Route path="/admin" component={MainLayout}></Route>
        </Switch>
        <Switch>
          <Route exact path='/main'>
            <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} CartItem={CartItem}/>
          </Route>
          <Route exact path='/cart' >
            <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
          </Route>
        </Switch>
        
      </React.Fragment>
    </Router>
  );
};

// có thể dùng hooks thay connector => https://react-redux.js.org/tutorials/typescript-quick-start#use-typed-hooks-in-components

const mapState = ({ authentication }: RootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account,
  sessionHasBeenFetched: authentication.sessionHasBeenFetched,
});

const mapDispatch = {
  getSession,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
