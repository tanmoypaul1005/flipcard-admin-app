import * as React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Home from "./containers/Home/Home";
import SignIn from "./containers/SignIn/SignIn";
import Signup from "./containers/Signup/Signup";
import { useDispatch ,useSelector} from 'react-redux';
import {isUserLoggedIn} from './actions/authActions'
import { useEffect } from "react";
import Products from "./containers/Products/Products";
import Orders from "./containers/Orders/Orders";
import Category from './containers/Category/Category';
// import { getAllCategory } from './actions/categoryActions';
import { getInitialData } from './actions/initialDataAction';
import NewPage from './containers/NewPage/NewPage';

function App() {
const auth=useSelector(state => state.auth);
const dispatch=useDispatch();


// componentDidMount or componentDidUpdate
useEffect(() => {    
  if(!auth.authenticate)(
      dispatch(isUserLoggedIn())
  )
  if(auth.authenticate){
    dispatch(getInitialData())
  }
}, [auth.authenticate]);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/page" element={<PrivateRoute><NewPage /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products/></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders/></PrivateRoute>} />
          <Route path="/category" element={<PrivateRoute><Category/></PrivateRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
