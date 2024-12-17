import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useLoginpageMutation, useSignpageMutation } from '../../APISERVER/lmsAPI';
import { Link, useNavigate } from 'react-router-dom';

export default function Signpage() {
    var [signfn] = useSignpageMutation();
    var navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '400px' }}>
                <h1 className="text-center mb-4">Sign Up</h1>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        mobile: ""
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        signfn(values).then((res) => {
                            console.log(res);
                            navigate("/login");
                        });
                    }}
                >
                    {() => (
                        <Form>
                            <div className="form-floating mb-3">
                                <Field
                                    type="input"
                                    name="username"
                                    className="form-control"
                                    id="floatingUsername"
                                    placeholder="Enter UserName"
                                />
                                <label htmlFor="floatingUsername">UserName</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Enter Password"
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    id="floatingMobile"
                                    placeholder="Enter Mobile Number"
                                />
                                <label htmlFor="floatingMobile">Mobile Number</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                        </Form>
                    )}
                </Formik>
                <div className="text-center mt-3">
                    <Link to="/login" className="text-decoration-none">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}
