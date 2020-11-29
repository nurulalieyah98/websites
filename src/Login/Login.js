import React, {useState, useEffect} from 'react';
import '../App.css';
import firebase from '../Config';
import LoginUser from './LoginUser';
import 'firebase/auth'
import App from '../App';

const Login = () => {
    const [user, setUser] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPassword('');
    }
    const handleLogin = () => 
    {
        
        //if(email=="nurulalieyah20@gmail.com" && password=="alieyah" || email=="nurulalieyah20@gmail.com" || password=="alieyah")
        
        if(email=="nurulalieyah20@gmail.com" && password=="alieyah")
        {
        clearErrors();
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(err =>{
            switch(err.code)
            {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
            }
        });
        alert("successful login");
        }
        else
        if(email!="nurulalieyah20@gmail.com" || password!="alieyah")
        {
        alert("Wrong email and password @ you are not admin");
        // alert("Unsuccessful login @ you are not admin");
        }
    };

    const handleLogout = () => 
    {
        firebase.auth().signOut();
    };

    const authListener = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                clearInputs();
                setUser(user);
            }
            else
            {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    return(
        <div className="App">
            {/* <h1>Welcome to Ally's Club</h1> */}
            {user ? (
                <App/>
            ): (
                <LoginUser
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword} 
                handleLogin={handleLogin}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
            />
            )}
        </div>
    );
};
export default Login;