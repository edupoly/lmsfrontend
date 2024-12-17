import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useLoginpageMutation } from '../../APISERVER/lmsAPI';
import { Link, useNavigate } from 'react-router-dom';

export default function Loginpage() {
    var [loginfn] = useLoginpageMutation();
    var navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '400px' }}>
                <h1 className="text-center mb-4">Login</h1>
                <Formik
                    initialValues={{
                        username: "",
                        password: ""
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        loginfn(values).then((res) => {
                            console.log(res);
                            if (res.data.role === "admin") {
                                window.localStorage.setItem("token", res.data.token);
                                window.localStorage.setItem("role",res.data.role)
                                navigate("/");
                            }
                            if (res.data.role === "manager") {
                                window.localStorage.setItem("token", res.data.token);
                                window.localStorage.setItem("role",res.data.role)
                                navigate("/");
                            }
                            if (res.data.role === "user") {
                                window.localStorage.setItem("token", res.data.token);
                                window.localStorage.setItem("role",res.data.role)
                                navigate("/");
                            }
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
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </Form>
                    )}
                </Formik>
                <div className="text-center mt-3">
                    <Link to="/sign" className="text-decoration-none">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
