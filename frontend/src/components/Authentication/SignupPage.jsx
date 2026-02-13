import React, { useState } from "react";
import "./SignupPage.css";
import user from "../../assets/user.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getUser, signup } from "./../../services/userServices";
import { Navigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(3, { message: "Name should be atleast 3 character" }),
    email: z
      .string()
      .email()
      .min(3, { message: "Please enter valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password should be atleast 8 character" }),
    confirmPassword: z.string(),
    address: z
      .string()
      .min(3, { message: "Address should be atleast 15 character" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password does not match Password",
    path: ["confirmPassword"],
  });
const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const onSubmit = async (formData) => {
    // console.log("Formdata", formData, profilePic);
    try {
      await signup(formData, profilePic);

      //it refresh the page home one time when logged in that is what i want else the user will be null
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  // console.log(profilePic);
  return (
    <section className="signup_form align_center">
      <form
        action=""
        className="signup_form_page"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>
        <div className="image_upload align_center">
          <div className="image_input_section">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              alt=""
            />
          </div>
          <label htmlFor="file-upload">Upload Image</label>
          <input
            type="file"
            id="file-upload"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <div className="fill_details align_center">
          <div className="signup_input_fields ">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="text_input_fields"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>
          <div className="signup_input_fields">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="text_input_fields"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div className="signup_input_fields">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="text_input_fields"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          <div className="signup_input_fields">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              type="password"
              placeholder="Enter confirm password"
              className="text_input_fields"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="form_error">{errors.confirmPassword.message}</em>
            )}
          </div>
        </div>
        <div className="input_fields_address ">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            placeholder="Enter your address"
            className="text_input_fields_address"
            {...register("address")}
          ></textarea>
          {errors.address && (
            <em className="form_error">{errors.address.message}</em>
          )}
        </div>
        {formError && <em className="form_error">{formError}</em>}
        <button type="submit" className="search_button form_submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
