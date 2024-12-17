import React from 'react'
import Naverbars from './Header'
import { useDownpaymentMutation, useGetloanQuery } from '../../APISERVER/lmsAPI'

export default function Manegerdashbord() {
  var {isLoading,data}= useGetloanQuery()
  console.log(isLoading,data)
  var [dowenpaymentfn]=useDownpaymentMutation()
  function downpayment(id){
    console.log(id)
    dowenpaymentfn(id).then((res)=>{console.log(res)})
  }
  return (
    <div>
      <Naverbars></Naverbars>
      <h1 className='text-center'>Agent dashbord</h1>
      <table className='table table bordered text-center '>
        <thead>
          <tr>
            <th className='fs-5'>CustomerName</th>
            <th className='fs-5'>Loan Item</th>
            <th className='fs-5'>Product Cost</th>
            <th className='fs-5'>Stats</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((d)=>{
              return <tr>
                <td className='fs-5'>{d.customerName}</td>
                <td className='fs-5'>{d.loanitem}</td>
                <td className='fs-5'>&#8377;{d.productcost}</td>
                <td className='fs-5'>
                  {
                  [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0].code==="applied" &&
                   <>
                      <button className="btn btn-info">...Waiting for Apporveing</button>

                  </>

                  }
                  {
                  [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0].code==="approved" &&
                   <>
                      <button className="btn btn-warning" onClick={()=>{downpayment(d._id)}}>Downpayment</button>

                  </>

                  }
                  {/* {
                   [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0].code==="approved" &&                                              " &&
                    <>
                      <button className="btn btn-warning" onClick={()=>{downpayment(d._id)}}>Downpayment</button>
                      </>
                    } */}
                    {
                                    
                  [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0].code==="downpayment Received" &&
                   <>
                      <button className="btn btn-warning">...waiting for loan disbursing</button>
                  </>
              

                    }
                    {
                                    
                  [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0].code==="disbursed" &&
                   <>
                      <button className="btn btn-info">...loan applied success</button>
                  </>
              

                    }
                    
                </td>
               

              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
