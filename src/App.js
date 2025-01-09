import { useEffect, useState } from 'react';
import Naverbars from './feactures/lmsproject/Header';
import logo from './logo.svg';
import { Outlet } from 'react-router-dom';

function App() {
   var roles=window.localStorage.getItem("role")
   
  return (
    <div >
         {
          // roles=="admin"?<Naverbars></Naverbars>:null
         }
         {
          // roles=="manager"?<Naverbars></Naverbars>:null
         }

       <Outlet></Outlet>

    </div>
  );
}

export default App;
