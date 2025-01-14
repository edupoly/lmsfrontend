import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Naverbars() 
{

  var [role,setrole]=useState(window.localStorage.getItem("role"))
   
     console.log(role)
     
  
   var navigate=useNavigate()
  function logout(){
    window.localStorage.clear()
    navigate("/login")
  }
  return (
<div class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          {/* <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg> */}
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/" class="nav-link px-2 text-white fs-5">Home</a></li>
          <li><a href="/Loanform" class="nav-link px-2 text-white fs-5">Add Loan</a></li>
        </ul>


        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2" onClick={()=>{logout()}}>Logout</button>
        </div>
      </div>
    </div>
  </div>
  )
}
