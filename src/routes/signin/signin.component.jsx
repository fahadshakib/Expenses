import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './signin.styles.scss';
import {useUserContext} from '../../context/user.context';
import {signInUserWithEmailAndPassword} from '../../utilities/firebase.utilities';
import Message from "../../components/message/message.component";
import RightArrow from '../../assets/arrow-right-solid.svg';

const SignIn = () => {

    const navigate = useNavigate();
    const {forceRefresh} = useUserContext();
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);
    const [success , setSuccess] = useState('');
    const [hideSuccess , setHideSuccess] = useState(true);

    const [formData , setFormData] = useState({
        email : '',
        password : ''
    })
    const {email , password} = formData;


    useEffect(() => {

        if (warning) {

            setHideWarning(false);

            const timeout = setTimeout(() => {

                setHideWarning(true);
                setWarning('');

            }, 2400);

            return () => clearTimeout(timeout);
        }

    }, [warning]);

    useEffect(() => {

        if (success) {

            setHideSuccess(false);

            const timeout = setTimeout(() => {

                setHideSuccess(true);
                setSuccess('');

            }, 2400);

            return () => clearTimeout(timeout);
        }

    }, [success]);

    const handleChange = (event) => {

        const {name , value} = event.target;
        setFormData((oldData) => {
            return {...oldData , [name]:value}
        })
    }

    const signInUser = async (e) => {

        e.preventDefault();

        try{

            await signInUserWithEmailAndPassword(email , password);  
            setSuccess('🎉🎉 successfully signed in');
            forceRefresh();
            setTimeout(() => {
                navigate('/'); 
            }, 2500);
    
        } catch(err){ setWarning(`😥 ${err.message}`)}
    }



    return (
        
        <form className="signin-form" onSubmit={signInUser}>

            <div className="signin-form__field">
                <label className="signin-form__field--label">
                    email :
                </label>
                <input 
                    className="signin-form__field--input"
                    type='email'  
                    name='email' 
                    value={email} 
                    onChange={handleChange} 
                    placeholder='enter email address'  required/>
            </div>
            <div className="signin-form__field">
                <label className="signin-form__field--label">
                    password :
                </label>
                <input 
                    className="signin-form__field--input"
                    type='password'  
                    name='password' 
                    value={password} 
                    onChange={handleChange} 
                    placeholder='enter password'  required/>
            </div>

            <button type="submit" className="signin-form__button">
                Sign in
                <img src={RightArrow} alt="proceed" className="signin-form__button--arrow"/>
            </button>

            {!hideWarning && <Message type='error' msg={warning}/>}
            {!hideSuccess && <Message type='success' msg={success}/>}

        </form>
    );
}

export default SignIn;