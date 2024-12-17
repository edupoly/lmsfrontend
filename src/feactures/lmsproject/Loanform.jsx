import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useAddloanMutation } from '../../APISERVER/lmsAPI';
import { useNavigate } from 'react-router-dom';

export default function Loanform() {
    var [addloanfn] = useAddloanMutation();
    var navigate=useNavigate()
    return (
        <div className="container d-flex justify-content-center align-items-center vh-80">
            <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
                <h1 className="text-center mb-4">Loan Form</h1>
                <Formik
                    initialValues={{
                        typeofloan: "",
                        loanitem: "",
                        productcost: "",
                        intrest: {
                            tenuretype: '',
                            tenure: '',
                            rateofintrest: ''
                        },
                        downpayment: "",
                        customerMobile: "",
                        customerName: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        addloanfn(values).then((res) => {
                            console.log(res);
                        });
                        navigate("/adimindashbord")
                    }}
                >
                    {() => (
                        <Form>
                            <div className="form-floating mb-3">
                                <Field
                                    name="typeofloan"
                                    className="form-control"
                                    placeholder="Type of Loan"
                                    id="typeofloan"
                                />
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
                                    name="intrest.tenuretype"
                                    className="form-control"
                                    placeholder="Tenure Type"
                                    id="tenuretype"
                                />
                                <label htmlFor="tenuretype">Tenure Type</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    name="intrest.tenure"
                                    className="form-control"
                                    placeholder="Tenure"
                                    id="tenure"
                                />
                                <label htmlFor="tenure">Tenure</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    name="intrest.rateofintrest"
                                    className="form-control"
                                    placeholder="Rate of Interest"
                                    id="rateofintrest"
                                />
                                <label htmlFor="rateofintrest">Rate of Interest</label>
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
    );
}
