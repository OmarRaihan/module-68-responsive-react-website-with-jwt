import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import "./Register.css";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { async } from "@firebase/util";

const Register = () => {
  const [agree, setAgree] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  if (user) {
    console.log("user", user);
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.checked;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    console.log("Updated profile");
    navigate("/home");
  };

  return (
    <div className="register-form mt-3">
      <h3 className="text-center text-primary mb-3">Please Register</h3>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" id="" placeholder="Your Name" />

        <input type="email" name="email" id="" placeholder="Your Email" required />

        <input type="password" name="password" id="" placeholder="Your Password" required />

        <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
        {/* <label className={agree ? "ps-2 text-primary" : "ps-2 text-danger"} htmlFor="terms"> */}
        <label className={`ps-2 ${agree ? "" : "text-danger"}`} htmlFor="terms">
          Accept Terms and Conditions
        </label>

        <input disabled={!agree} className="w-50 mx-auto mt-2 btn btn-primary" type="submit" value="Register" />
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-primary text-decoration-none" onClick={navigateLogin}>
          Please Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
