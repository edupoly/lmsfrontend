import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
//  import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from './appstore/store';
import Loginpage from './feactures/lmsproject/Loginpage';
import Admindashbord from './feactures/lmsproject/Admindashbord';
import Manegerdashbord from './feactures/lmsproject/manegerdashbord';
import Loanform from './feactures/lmsproject/Loanform';
import Signpage from './feactures/lmsproject/sign';
import Userdashbord from './feactures/lmsproject/userdashbord';
import Home from './feactures/lmsproject/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/sign",
        element:<Signpage></Signpage>
      },
      {
        path:"/login",
        element:<Loginpage></Loginpage>
      },
      {
        path:"/manegerdashbord",
        element:<Admindashbord/>
      },
      {
        path:"/agentdashbord",
        element:<Manegerdashbord/>
      },
      {
        path:"/Loanform",
        element:<Loanform/>
      },
      {
        path:"/userdashbord",
        element:<Userdashbord/>
      }
      
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//  reportWebVitals();
