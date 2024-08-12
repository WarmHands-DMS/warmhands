import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="registerPage">
      <div className="wrapper">
        <div className="form-h">
          <h2>Register</h2>
          <img src="/warmhands-logo.svg" className="logo" />
        </div>
        <form action="" className="login-form">
          <div className="form scrollbar">
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">First Name</label>
                <input type="text" name="Fname" placeholder="First Name" />
              </div>
              <div className="input-single">
                <label htmlFor="">Last Name</label>
                <input type="text" name="Lname" placeholder="Last Name" />
              </div>
            </div>
            <div className="input-single">
              <label htmlFor="">Email</label>
              <input type="text" name="email" placeholder="Email" />
            </div>
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">Password</label>
                <input type="password" name="password" placeholder="Password" />
              </div>
              <div className="input-single">
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Re-Type Password"
                />
              </div>
            </div>
            <div className="input-single">
              <label htmlFor="">Home Address</label>
              <input type="text" name="address" placeholder="Home-address" />
            </div>
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">Province</label>
                <input type="text" name="province" placeholder="Province" />
              </div>
              <div className="input-single">
                <label htmlFor="">District</label>
                <input type="text" name="district" placeholder="District" />
              </div>
              <div className="input-single">
                <label htmlFor="">City</label>
                <input type="text" name="city" placeholder="City" />
              </div>
            </div>
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">NIC</label>
                <input type="text" name="nic" placeholder="NIC" />
              </div>
              <div className="input-single">
                <label htmlFor="">Mobile Number</label>
                <input
                  type="number"
                  name="mobile-number"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
          </div>

          <div className="btn-sec">
            <button>Register</button>
            <span>
              Already have an account?{' '}
              <span>
                <Link to="/signin">Sign in</Link>
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

{/* <div className="registerPage">
         <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>


        <label>Email</label>
        <input type="text" placeholder="Email" id="email" />

        <label>Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Sign In</button>
        <span>Don't have an account? <span><Link to="/signup">Create Account</Link></span></span>
    </form>
    </div> */}
