import React from "react";
import google from "../../../images/social/google-logo.png";
import facebook from "../../../images/social/facebook-white-circle.png";
import github from "../../../images/social/Github-logo.png";
import { useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const navigate = useNavigate();
  let errorElement;

  if(loading || loading1){
    return <Loading></Loading>
  }

  if (error || error1) {
    errorElement = (
      <p className="text-danger">
        Error: {error?.message} {error1?.message}
      </p>
    );
  }

  if (user || user1) {
    navigate("/home");
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "0.5px" }} className="bg-secondary w-50"></div>
        <p className="mt-3 px-2">OR</p>
        <div style={{ height: "0.5px" }} className="bg-secondary w-50"></div>
      </div>
      {errorElement}
      <div>
        <div>
          <button onClick={() => signInWithGoogle()} className="btn btn-dark rounded-pill w-50 fw-bold d-block mx-auto my-2">
            <img style={{ width: "30px" }} src={google} alt="" />
            <span className="px-2">Google Sign In</span>
          </button>
          <button className="btn btn-primary rounded-pill w-50 fw-bold d-block mx-auto my-2">
            <img style={{ width: "30px" }} src={facebook} alt="" />
            <span className="px-2">Facebook Sign In</span>
          </button>
          <button onClick={() => signInWithGithub()} className="btn btn-light border rounded-pill w-50 fw-bold d-block mx-auto">
            <img style={{ width: "30px" }} src={github} alt="" />
            <span className="px-2">Github Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
