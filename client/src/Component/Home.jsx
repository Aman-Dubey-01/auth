import React, {useContext} from 'react';
import { UserContext } from '../Context/userContext';

function Home() {
  const {user} = useContext(UserContext);

    const headingStyle = {
        textAlign: 'center' ,
        color: 'grey',
        paddingTop: '200px',
      };

  return (
    <div style={headingStyle}>
    <h2>Hello there !!</h2>
    {user ? <h3>Hi, {user?.name}</h3> : <p>Login to proceed</p>}
    <p>This is authentication template</p>
    </div>
  )
}

export default Home