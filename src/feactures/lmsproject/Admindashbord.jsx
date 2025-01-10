import React, { useEffect, useState } from 'react'
import Naverbars from './Header'
import { useApporveloanMutation, useGetloanQuery, useLazyGetloanQuery, useLoandisburseMutation } from '../../APISERVER/lmsAPI'
export default function Admindashbord() {
  var { isLoading, data } = useGetloanQuery()
  console.log(isLoading, data)
  var [apporvefn] = useApporveloanMutation()
  var [disburseloanfn] = useLoandisburseMutation()
  var [approvecount, setapprovecount] = useState(0)
  var [dowenpaymentcount, setdowenpaymentcount] = useState(0)
  var [disbursedcount, setdisbursedcount] = useState(0)
  var [Emiscount, setEmiscount] = useState(0)
  var [lazyfn]=useLazyGetloanQuery()
      
      useEffect(()=>{
         var approv=0
         var disbur=0
         var downpaym=0
         
        !isLoading && data?.map((s)=>{
          var latestcount=[...s.status].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].code;
            console.log("ii",latestcount)
            if(latestcount==="applied"){
              approv=approv+1
               
            }
            
            if(latestcount==="approved"){
               downpaym=downpaym+1
             
            }
            if(latestcount==="downpayment Received"){
             setdisbursedcount(disbursedcount+1)
             console.log(disbursedcount)
            }
            if(latestcount==="disbursed"){
              disbur=disbur+1
            }
        })
        setapprovecount(approv)
        setEmiscount(disbur)
        setdowenpaymentcount(downpaym)
      },[data])
     
  function approve(id) {
    console.log(id)
    apporvefn(id).then((res) => {
      console.log(res)
      lazyfn().then((r)=>{
        console.log(r)
      })
    })
    
  }
  function disburse(id) {
    disburseloanfn(id).then((res) => {
      console.log(res)
      lazyfn().then((r)=>{
        console.log(r)
      })
    })
  }
 
  return (
    <div>
      <Naverbars></Naverbars>
        <div className='container'>
      <div className='row justify-content-between'>
         <div className='col-12 col-md-6'>
        <h1 className=''>Manager Dashbord</h1>
       </div>
        <div className=' col-12 col-md-6  d-flex  justify-content-start flex-wrap'>
          <h5 class=" position-relative me-3 mb-2 mb-md-0 ">
             Aproved
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {approvecount}
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
              EmIs Panding
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {Emiscount}
              <span class="visually-hidden">unread messages</span>
            </span>
          </h5>

        </div>
        </div>
      </div>
    
          <div className='table-responsive  overflow-x:auto,'>
      <table className='table table-bordered table-hover showdow-lg text-center'>
        <thead className='table-dark'>
          <tr>
            <th className='fs-5'>CustomerName</th>
            <th className='fs-5'>Loan Item</th>
            <th className='fs-5'>Product Cost</th>
            <th className='fs-5'>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            !isLoading && data?.map((d) => {
              const latestStatus = [...d.status].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].code;
             
               
              return <tr>
                <td className='fs-5'>{d.customerName}</td>
                <td className='fs-5'>{d.loanitem}</td>
                <td className='fs-5'>&#8377;{d.productcost}</td>
                <td className='fs-5'>
                  {latestStatus === 'applied' && (
                    <button className="btn btn-success m-1" onClick={() => approve(d._id)}>
                      Approve
                    </button>
                  )}
                  {
                    latestStatus === "approved" && (
                      <b className="btn btn-info">...Waiting for downpayment</b>
                    )}

                  {

                    latestStatus === "downpayment Received" && (
                      <button className="btn btn-warning" onClick={() => { disburse(d._id) }}>Disbursed</button>

                    )}
                  {

                    latestStatus === "disbursed" && (
                      <b className="text-info" >EmI Pending</b>

                    )}

                </td>
              </tr>
            })

          }
          {
            isLoading && <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          }

        </tbody>
      </table>
      </div>
    </div>
  )
}
