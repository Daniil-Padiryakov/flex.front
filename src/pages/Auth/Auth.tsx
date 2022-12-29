import './Auth.scss';
import {useState} from "react";
import SignUp from "../../components/Auth/Registration/SignUp";
import SignIn from "../../components/Auth/Login/SignIn";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div>
            {isSignUp ? (
                <SignUp />
            ) : (
                <SignIn />
            )}
            Already signed up? <span onClick={toggleSignUp}>Go to login</span>
        </div>
    );
};

export default Auth;