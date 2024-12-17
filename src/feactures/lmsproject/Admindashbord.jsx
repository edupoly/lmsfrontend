import React, { useState } from 'react'
import Naverbars from './Header'
import { useApporveloanMutation, useGetloanQuery, useLoandisburseMutation } from '../../APISERVER/lmsAPI'
export default function Admindashbord() {
  var { isLoading, data } = useGetloanQuery()
  console.log(isLoading, data)
  var [apporvefn] = useApporveloanMutation()
  var [disburseloanfn] = useLoandisburseMutation()
  var [status, setstatus] = useState(null)
  function approve(id) {
    console.log(id)
  apporvefn(id).then((res) => {
      console.log(res)
    })
  }
  function disburse(id) {
    disburseloanfn(id).then((res) => {
      console.log(res)
    })
  }
  return (
    <div>
      <Naverbars></Naverbars>
      <h1 className='text-center'>Manager Dashbord</h1>
      <table className='table table bordered text-center'>
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
                      <button className="btn btn-info">...Waiting for downpayment</button>
                    )}

                  {

                    latestStatus === "downpayment Received" && (
                      <button className="btn btn-warning" onClick={() => { disburse(d._id) }}>Disbursed</button>

                    )}
                  {

                    latestStatus === "disbursed" && (
                      <button className="btn btn-warning" >EmI Pending</button>

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
  )
}
