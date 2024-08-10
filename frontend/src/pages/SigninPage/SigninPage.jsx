import { Link } from "react-router-dom";

export const SigninPage = () => {
  return (
    <div className="signinPage">
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
