import React, { useContext, useState } from 'react';
import axios from 'axios';
import './style.scss';
import register from '../img/register.svg';
import { FaUserAlt } from 'react-icons/fa';
import { AiTwotoneLock, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';

function Signup() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
  });


  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUp((prevSignUp) => ({
      ...prevSignUp,
      [name]: value,
    }));
    console.log(signUp);
  };


  const signUpHandler = async (event) => {
    event.preventDefault();

    const { name, email, password } = signUp

    try {
      const { data } = await axios.post('/register', { name, email, password })
      if (data.error) {
        toast.error(data.error)
      } else {
        setSignUp({ name: '', email: '', password: '' })
        toast.success(data.message)
        navigate('/signin')
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

  return (<>
  {!user ?
    <div className="authentication">
      <div className="container sign-up-mode">
        <div className="forms-container">
          <div className="signin-signup">

            <form id='#signUp' action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i><FaUserAlt /></i>
                <input type="text" placeholder="Username" name="name" value={signUp.name} onChange={handleSignUpChange} />
              </div>
              <div className="input-field">
                <i><AiOutlineMail /></i>
                <input type="email" placeholder="Email" name="email" value={signUp.email} onChange={handleSignUpChange} />
              </div>
              <div className="input-field">
                <i><AiTwotoneLock /></i>
                <input type="password" placeholder="Password" name="password" value={signUp.password} onChange={handleSignUpChange} />
              </div>
              
              <input type="submit" className="btn" value="Sign up" onClick={signUpHandler} />
              <p className="social-text">Or</p>
              <div className="social-media">
                <a href="/" className="social-icon">
                  <i><AiOutlineGoogle /></i>
                  <p>Sign-up with Google</p>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Join our community and experience the difference. Sign in now!
              </p>
              <button className="btn transparent" id="sign-in-btn">
                <Link to='/signin'>Sign in</Link>
              </button>
            </div>
            <img src={register} className="image" alt="" />
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

export default Signup