import React, { useRef, useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "./../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" }),
});
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [formError, setFormError] = useState("");
  const location = useLocation();
  // console.log("new Location", location.state);
  // console.log(errors);
  // const nameRef = useRef(null);
  // const phoneRef = useRef(null);
  // const [user, setUser] = useState({
  //   name: "",
  //   phone: "",
  // });
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const user = {
  //     name: "",
  //     phone: 0,
  //   };
  //   user.name = nameRef.current.value;
  //   user.phone = parseInt(phoneRef.current.value);
  //   console.log(user);
  // };
  const onSubmit = async (formData) => {
    // console.log("Form Data", formData);
    try {
      await login(formData);
      const { state } = location;

      window.location = state ? state : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // console.log(err.response);
        setFormError(err.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_input">
          <div className="input_fields">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              // ref={nameRef}

              id="email"
              className="form_text_input"
              placeholder="Enter Your Email"
              {...register("email")}
              // onChange={(e) => setUser({ ...user, name: e.target.value })}
              // value={user.name}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          <div className="input_fields">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              // ref={phoneRef}
              id="password"
              className="form_text_input"
              placeholder="Enter Your Phone Password"
              {...register("password")}
              // onChange={(e) =>
              //   setUser({ ...user, phone: parseInt(e.target.value) })
              // }
              // value={user.phone}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
        </div>
        {formError && <em className="form_error">{formError}</em>}

        <button type="submit" className="search_button form_submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
