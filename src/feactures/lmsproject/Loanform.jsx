import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useAddloanMutation, useGetintrestratesQuery } from '../../APISERVER/lmsAPI';
import { useNavigate } from 'react-router-dom';
import Naverbars from './Header';

export default function Loanform() {
    var [addloanfn] = useAddloanMutation();
    var {isLoading,data}=useGetintrestratesQuery()
     console.log("int",isLoading,data)
    var navigate=useNavigate()
    return (
        <div>
           <Naverbars></Naverbars>
        <div className="container d-flex justify-content-center align-items-center vh-80">
             
            <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
                <h1 className="text-center mb-4">Loan Form</h1>
                <Formik
                    initialValues={{
                        typeofloan: "",
                        loanitem: "",
                        productcost: "",
                        intrest:"",
                        downpayment: "",
                        customerMobile: "",
                        customerName: "",
                    }}
                    onSubmit={(values) => {
                        values.intrest=JSON.parse(values.intrest)
                        console.log(values);
                        addloanfn(values).then((res) => {
                            console.log(res);
                        });
                        var role=window.localStorage.getItem("role")

                        if(role=="admin"){
                            navigate("/manegerdashbord")
                        }
                        if(role=="manager"){
                            navigate("/agentdashbord")
                        }

                        }}
                >
                    {() => (
                        <Form>
                            <div className="form-floating mb-3">
                                <Field
                                    as='select'
                                    name="typeofloan"
                                    className="form-control"
                                    placeholder="Type of Loan"
                                    id="typeofloan"
                                   
                                >
                                    <option > Select Type of Loan</option>
                                    <option value="vehical">vehical</option>
                                  </Field>
                                <label htmlFor="typeofloan">Type of Loan</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    name="loanitem"
                                    className="form-control"
                                    placeholder="Loan Item"
                                    id="loanitem"
                                />
                                <label htmlFor="loanitem">Loan Item</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    name="productcost"
                                    className="form-control"
                                    placeholder="Product Cost"
                                    id="productcost"
                                />
                                <label htmlFor="productcost">Product Cost</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    as="select"
                                    name="intrest"
                                    className="form-control"
                                    placeholder="Tenure"
                                    id="tenure"
                                >
                                 <option value="">elect intrest</option>
                                  {
            !isLoading && data?.intrestrates.map((lr)=>{
              return <option value={JSON.stringify(lr)}>{`${lr.rateofintrest}% for ${lr.tenure} ${lr.tenuretype}`}</option>
            })
          }
             </Field>
                                <label htmlFor="tenure">select intrest</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    name="downpayment"
                                    className="form-control"
                                    placeholder="Down Payment"
                                    id="downpayment"
                                />
                                <label htmlFor="downpayment">Down Payment</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    name="customerMobile"
                                    className="form-control"
                                    placeholder="Customer Mobile"
                                    id="customerMobile"
                                />
                                <label htmlFor="customerMobile">Customer Mobile</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    name="customerName"
                                    className="form-control"
                                    placeholder="Customer Name"
                                    id="customerName"
                                />
                                <label htmlFor="customerName">Customer Name</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Add Loan</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        </div>
    );
}
