import React, { useContext, useState } from 'react';
import './style.scss';
import log from '../img/log.svg';
import { AiTwotoneLock, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';

function Signin() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setSignIn((prevSignIn) => ({
      ...prevSignIn,
      [name]: value,
    }));
    console.log(signIn);
  };


  const signInHandler = async (event) => {
    event.preventDefault();

    const { email, password } = signIn;

    try {
      const { data } = await axios.post('/login', { email, password })
      if (data.error) {
        toast.error(data.error)
      } else {
        console.log("user signin:", data);
        setUser(data)  //remove if not needed
        setSignIn({ email: '', password: '' })
        toast.success(data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };

  const headingStyle = {
    textAlign: 'center' ,
    color: 'grey',
    paddingTop: '200px',
  };

  return (
    <>
      {!user ?
        <div className="authentication">
          <div className="container">
            <div className="forms-container">

              <div className="signin-signup">
                <form id='#signin' action="" className="sign-in-form">
                  <h2 className="title">Sign in</h2>
                  <div className="input-field">
                    <i><AiOutlineMail /></i>
                    <input type="email" placeholder="Email" name="email" value={signIn.email} onChange={handleSignInChange} />
                  </div>
                  <div className="input-field">
                    <i><AiTwotoneLock /></i>
                    <input type="password" placeholder="Password" name="password" value={signIn.password} onChange={handleSignInChange} />
                  </div>
                  <input type="submit" value="Login" className="btn solid" onClick={signInHandler} />
                  <p className="social-text">Or</p>
                  <div className="social-media">
                    <a href="/" className="social-icon">
                      <i><AiOutlineGoogle /></i>
                      <p>Sign-in with Google</p>
                    </a>
                  </div>
                </form>

              </div>
            </div>

            <div className="panels-container">
              <div className="panel left-panel">
                <div className="content">
                  <h3>New here ?</h3>
                  <p>
                    Create an account and be part of something special. Sign up today!
                  </p>
                  <button className="btn transparent" id="sign-up-btn">
                    <Link to='/signup'>Sign up</Link>
                  </button>
                </div>
                <img src={log} className="image" alt="" />
              </div>
              <div className="panel right-panel">

              </div>
            </div>
          </div>
        </div>
        :
        <p style={headingStyle}>User already loged in</p>
      }
    </>
  )
}

export default Signin