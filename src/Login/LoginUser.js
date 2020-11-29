import React from 'react';

const LoginUser = (props) => {

    const 
    {
        email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin, 
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError
    } = props;

    return(
        <section className="login">
            <div className="loginContainer">
                {/* <label>Jasin Smart Library Administrator</label> */}
                <label>Username</label>
                <input 
                    type="text" 
                    autoFocus 
                    required 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}>
                </input>
                
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}>
                </input>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button onClik={handleLogin}>Sign In</button>
                        <p>Dont have an account ? <span>Sign Up</span></p>
                        </>
                    ):(
                        <>
                        <button className="buttonlogin" onClick={handleLogin}>Sign In</button>
                        {/* <p>Forgot Password ?
                            <span on click={()=> ForgotP}>Click here</span>
                        </p> */}
                        </>
                    )}
                    
                </div>

            </div>
        </section>
    )
}
export default LoginUser;