import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Register.css'
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate();

    const navigateLogin = () =>{
        navigate('/login');
    }

    if(user){
      navigate('/home');
    }

    const handleRegister = event =>{
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(email, password);
    }

  return (
    <div className="register-form mt-3">
      <h3 className="text-center text-primary mb-3">Please Register</h3>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" id="" placeholder="Your Name" />

        <input type="email" name="email" id="" placeholder="Your Email" required />

        <input type="password" name="password" id="" placeholder="Your Password" required />

        <input className="w-50 mx-auto btn btn-primary" type="submit" value="Register" />
      </form>
      <p>Already have an account? <Link to="/login" className="text-danger text-decoration-none" onClick={navigateLogin}>Please Login</Link></p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
