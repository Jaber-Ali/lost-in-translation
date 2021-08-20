import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getUserData, postUserData } from '../../api/user/userAPI';
import { getStorage, setItemStorage } from '../../storage';



const Login = props => {
    // user's name input
    const [username, setUsername] = useState('');
    const handleUserInput = event => {
        setUsername(event.target.value); 
    };

    const history = useHistory();

    useEffect(() => {
        if (getStorage("username")) {
            history.push('/translation');
        } else {
            props.handleTitle("Login");
        }
    })

    async function findUser() {
        const user = (await getUserData(username))
        if (user.length < 1) {
            return false;
        } else {
            return true;
        }
    }
    
 /**
* This method handles the user login. by validating the new user input,
* and by checking if the is already signed in befor.
*/

    async function handleLogin() {
        if (username.match(/(^[A-Za-z]{1,10})([ ]{0,1})([A-Za-z]{3,10})$/)) {

            setItemStorage('username', username);

            const userExists = await findUser();
            if (userExists === false) {
                const data = { name: username };
                postUserData(data);
            }

            props.onLogin(username);
        }

        else if (username === null || username === "") {
            alert('Error: Please Fill the Required Field')
        }
        else {
            alert('Error: user input must only contain letters between 3 to 10 ')
        }
    };

    return (
        <main className="Login">
            <div className="login-field-container" >
                <div className="login-field">
                    <form >
                        <div className="mb-3">
                            <input id="username" type="text" placeholder="What's your full name?" id="input-txt" className="form-control" onChange={handleUserInput} />
                        </div>
                        <div>
                            <Link to="/">
                                <button type="submit" onClick={handleLogin} id="lg-btn" className="btn btn-primary btn-lg"> Login</button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
