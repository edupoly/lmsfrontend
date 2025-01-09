import React, { useEffect, useState } from 'react'
import Naverbars from './Header'
import { useDownpaymentMutation, useGetloanQuery, useLazyGetloanQuery } from '../../APISERVER/lmsAPI'

export default function Manegerdashbord() {
  var {isLoading,data}= useGetloanQuery()
  console.log(isLoading,data)
  var [dowenpaymentfn]=useDownpaymentMutation()
     var [approvingcount, setapprovingcount] = useState(0)
     var [dowenpaymentcount, setdowenpaymentcount] = useState(0)
     var [disbursedcount, setdisbursedcount] = useState(0)
     var [Emiscount, setEmiscount] = useState(0)
    var [lazyfn]=useLazyGetloanQuery()
   
         useEffect(()=>{
            var approv=0
            var disbur=0
            var downpaym=0
            var approv=0
           !isLoading && data?.map((s)=>{
             var latestcount=[...s.status].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].code;
               console.log("ii",latestcount)
               if(latestcount=="applied"){
                 approv=approv+1
               
               }
               
               if(latestcount=="approved"){
                  downpaym=downpaym+1
                
               }
               if(latestcount=="downpayment Received"){
                setdisbursedcount(disbursedcount+1)
                console.log(disbursedcount)
               }
               if(latestcount=="disbursed"){
                 disbur=disbur+1
                 
                  
               }
           })
           setapprovingcount(approv)
           setEmiscount(disbur)
           setdowenpaymentcount(downpaym)
         },[data])
        
    function downpayment(id){
    console.log(id)
    dowenpaymentfn(id).then((res)=>{console.log(res)
      lazyfn().then((r)=>{
        console.log(r)
      })
    })
  }
  return (
    <div>
      <Naverbars></Naverbars>
      <div className='d-flex justify-content-around  '>
        <h1 className=''>  Agent Dashbord</h1>
        <div className='d-flex m-2 '>
          <h5 class=" position-relative me-3 ">
             Aproveing
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {approvingcount}
              <span class="visually-hidden">unread messages</span>
            </span>
          </h5>
          <h5 class=" position-relative me-3 ">
             Dowenpayment
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {dowenpaymentcount}
              <span class="visually-hidden">unread messages</span>
            </span>
          </h5>
          <h5 class="position-relative me-3 ">
            Disburse
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {disbursedcount}
              <span class="visually-hidden">unread messages</span>
            </span>
          </h5>
          <h5 class="position-relative me-3 ">
              Loan sanctioned  
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {Emiscount}
              <span class="visually-hidden">unread messages</span>
            </span>
          </h5>

        </div>
      </div>

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
                      <b className=" text-info">...Waiting for Apporveing</b>

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
                      <b className="info">...waiting for loan disbursing</b>
                  </>
                }
                    {
                                    
                  [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0].code==="disbursed" &&
                   <>
                      <b className="text-success">... Loan sanctioned</b>
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
