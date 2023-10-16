import React, { useContext } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';


function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const data = await axios.get('/logout');
            if (data.error) {
                toast.error(data.error)
            } else {
                setUser(null);
                toast.success('Logout successful')
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <nav className='navbar'>
            <div className="links">
                <Link to="/">Home</Link>
            </div>
            {!user ? <>
                <div className="links">
                    <Link to="/signin">Sign In</Link>
                </div>
                <div className="links">
                    <Link to="/signup">Sign Up</Link>
                </div>
            </>
                :
                <div className="links">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            }
        </nav>
    );
}

export default Navbar;
