import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import apiReq from "../../lib/apiReq";
import { AuthContext } from "../../context/AuthContext";

export const SigninPage = () => {
     const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const {updateUser} = useContext(AuthContext);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (
            !email ||
            !password
        ) {
            toast.error('Please fill out all fields.');
            return;
        }

        

        try {
            const res = await apiReq.post('/auth/signin',
              {
                email,
                password,
              },
            );
            
            updateUser(res.data);
            navigate('/')

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
        };

    return (
        <div className="signinPage">
            <ToastContainer />
            <div className="wrapper">
                <div className="form-h">
                    <h2>Sign in</h2>
                    <img src="/warmhands-logo.svg" className="logo" />
                </div>
                <form onSubmit={handleSubmit} className="login-form">
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
                        <button disabled={isLoading}>Sign in</button>
                        <span>Don't have an account? <span><Link to="/register">Create Account</Link></span></span>              
                    </div>
                </form>
            </div>
        </div>
    )
}
