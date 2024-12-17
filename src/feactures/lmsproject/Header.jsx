import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Naverbars() 
{
   var navigate=useNavigate()
  function logout(){
    window.localStorage.clear()
    navigate("/login")
  }
  return (
//     <div>
    
//     <nav class="navbar navbar-expand-lg bg-body-tertiary">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//       <div class="navbar-nav">
//         <a class="nav-link active" aria-current="page" href="#">Home</a>
//         <a class="nav-link" href="#">Features</a>
//         <a class="nav-link" href="#">Pricing</a>
//         <a class="nav-link" href="/Loanform">AddLoan</a>
//         <a class="nav-link"  onClick={()=>{logout()}}>Logout</a>


//       </div>
//     </div>
//   </div>
// </nav>
//     </div>
<header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          {/* <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg> */}
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="/Loanform" class="nav-link px-2 text-white">Add Loan</a></li>
        </ul>


        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2" onClick={()=>{logout()}}>Logout</button>
        </div>
      </div>
    </div>
  </header>
  )
}
