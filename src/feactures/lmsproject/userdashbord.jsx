import React from 'react'
import Naverbars from './Header'
import { useGetuserdetailsQuery, usePaymentloanMutation } from '../../APISERVER/lmsAPI'

export default function Userdashbord() {
  var {isLoading,data}=  useGetuserdetailsQuery()
  console.log(isLoading,data)
  var [paymentfn]=usePaymentloanMutation()
   function payment(loanid,emiid){
    console.log(loanid,emiid)
     paymentfn({loanid:loanid,emiid:emiid}).then((res)=>{console.log(res)})
     
   }
  return (
    <div>
        <Naverbars></Naverbars>
        <h1 className='text-center mb-4' >User Dashbord</h1>
        <div className='container mt-4' >
           <table className='table table bordered text-center'>
             <thead className="table table bordered text-center">
                <th className='fs-5'>Emi Amount</th>  
                <th className='fs-5'>Emi Datet</th>
                <th className='fs-5'>Emi Status</th>
             </thead>
             <tbody>
                    
                    {
                        data?.emis.map((emis)=>{
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
    </div>
  )
}
