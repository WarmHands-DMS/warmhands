import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const SigninPage = () => {

    const location = useLocation();

    useEffect(() => {
      if (location.state?.message) {
        toast.success(location.state.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }, [location.state]);

    return (
        <div className="signinPage">
            <ToastContainer />
            <div className="wrapper">
                <div className="form-h">
                    <h2>Sign in</h2>
                    <img src="/warmhands-logo.svg" className="logo" />
                </div>
                <form action="" className="login-form">
                    <div className="form">
                        <div className="input">
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" placeholder="Email"/>
                        </div>
                        <div className="input">
                            <label htmlFor="">Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    
                    
                    <div className="btn-sec">
                        <button>Sign in</button>
                        <span>Don't have an account? <span><Link to="/register">Create Account</Link></span></span>              
                    </div>
                </form>
            </div>
        </div>
    )
}
