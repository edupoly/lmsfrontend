import React, { useEffect, useState } from 'react'
import Naverbars from './Header'
import { useGetuserdetailsQuery, useLazyGetloanQuery, useLazyGetuserdetailsQuery, usePaymentloanMutation } from '../../APISERVER/lmsAPI'
import Usernavebar from './usernavebar'

export default function Userdashbord() {
  var {isLoading,data}=  useGetuserdetailsQuery()
  console.log(isLoading,data)
  var [paidemi,setpaidemi]=useState(0)
  var [unpaidemi,setunpaidemi]=useState(0)
  var [paymentfn]=usePaymentloanMutation()
  var [paylazyfn]=useLazyGetuserdetailsQuery()
   function payment(loanid,emiid){
    console.log(loanid,emiid)
     paymentfn({loanid:loanid,emiid:emiid}).then((res)=>{console.log(res)
      paylazyfn().then((r)=>{
        console.log(r)
      })
     })
     }
   
   const totalPaid = !isLoading && data?.emis
   .filter((s) => s.emiStatus === "paid")
   .reduce((acc, emi) => acc + emi.emiAmount, 0);

 const totalUnpaid = !isLoading && data?.emis
   .filter((s) => s.emiStatus !== "paid")
   .reduce((acc, emi) => acc + emi.emiAmount, 0);
 const totalpayment=!isLoading && data?.emis
    .reduce((acc, emi) => acc + emi.emiAmount, 0);
      useEffect(()=>{
        var paid=0;
        var UnPaid=0;
        !isLoading && data?.emis.forEach((s)=>{
          if(s.emiStatus=="paid"){
              paid=paid+1
          }
          else{
              UnPaid=UnPaid+1
          }
        })
        setpaidemi(paid)
        setunpaidemi(UnPaid)
      },[data])
  return (
    <div>
        {/* <Naverbars></Naverbars> */}
        <Usernavebar></Usernavebar>
        <div className='d-flex justify-content-around'  >
        <h1 className='text-center mb-4' >User Dashbord</h1>
        <div className='d-flex'>
             <h5  class=" me-2 position-relative">
                Paid Months
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {paidemi}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </h5>
             <h5 class=" me-2 position-relative">
                UnPaid Months
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unpaidemi}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </h5>

              </div> 

            </div> 
         <div className='d-flex m-3 gap-3'>
        <div className=' card w-75 shadow p-4'  >
            <h1 className='text-center'>Payment Details</h1>
           <table className='table table-bordered text-center'>
             <thead className="table table-bordered  text-center">
                <th className='fs-5'>Emi Amount</th>  
                <th className='fs-5'>Emi Datet</th>
                <th className='fs-5'>Emi Status</th>
             </thead>
             <tbody>
                    {
                       !isLoading && data?.emis.map((emis)=>{
                         return(
                            <tr>
                                <td className='fs-5'>&#8377;{emis.emiAmount}</td>
                                <td className='fs-5'>{new Date(emis.emiDate).toLocaleDateString()}</td>
                                <td className='fs-5'>{emis.emiStatus=="paid"?<span className="badge bg-success p-2">Paid</span>:<button className='btn btn-warning btn-sm' onClick={()=>{payment(data?._id,emis._id)}}>Pay</button>}</td>

                            </tr>
                         )
                        })
                    }
                
             </tbody>
           </table>
        </div>
        <div className='card w-50 shadow p-4'>
             <h2>Emis payment status</h2>
            
               <div   >
                <div>

                <div className='d-flex justify-content-between'>
                  
                  <h5>Total  Payment</h5>
                  <h5> &#8377;{totalpayment || 0}</h5>
                 </div>

                   <div className='d-flex justify-content-between'>
                  
                    <h5>Total Paid Payment</h5>
                    <h5> &#8377;{totalPaid || 0}</h5>
                   </div>
                   <div className='d-flex justify-content-between'>
                  
                    <h5>Total UnPaid Payment</h5>
                    <h5> &#8377;{totalUnpaid  || 0}</h5>
                   </div>
                  
                </div>
                    
               </div>

          </div>
        </div>
        
    </div>
  )
}
