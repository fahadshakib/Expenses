import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './registration.styles.scss';
import {createUserFromEmailAndPassword  } from '../../utilities/firebase.utilities';
import { useUserContext } from "../../context/user.context";
import RightArrow from '../../assets/arrow-right-solid.svg';
import Message from '../../components/message/message.component';


const Registration = () => {

    const navigate = useNavigate();
    const {forceRefresh} = useUserContext();
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);
    const [success , setSuccess] = useState('');
    const [hideSuccess , setHideSuccess] = useState(true);

    const [formData , setFormData] = useState({
        name : '',
        email : '',
        password : '',
        confirmPassword :'',
        photo : null
    })
    const {name , email , password , confirmPassword, photo} = formData;
    

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
                navigate('/');
                forceRefresh();

            }, 2000);
            
            return () => clearTimeout(timeout);
        }

    }, [success]);


    const handleChange = (event) => {

        const { name, value, files } = event.target;

        if ((name === 'photo') && files && (files.length > 0)) {

            setFormData((oldData) => ({
                ...oldData,
                photo: files[0]
            }));

        } else {

            setFormData((oldData) => ({
                ...oldData,
                [name]: value
            }));
        }
    };
    
    const registerUsingNameEmailPassword = async (e) => {

            e.preventDefault();

            const {password , confirmPassword} = formData;
            if(password !== confirmPassword) {
                setWarning(`🥵 Passwords are not same. Try again `);
                return;
            }

            try{

                const data = {name: formData.name , email: formData.email , password: formData.password , photo: formData.photo};
                await createUserFromEmailAndPassword(data); 
                setSuccess('🎉 account creation completed');
                
            } catch(err){setWarning(`😐 ${err.message}`)}
        }

        

    return (

        <form className="registration-form" onSubmit={registerUsingNameEmailPassword}>


            <div className="registration-form__field">
                <label className="registration-form__field--label">
                    name :
                </label>
                <input 
                    className="registration-form__field--input"
                    type='text'  
                    name='name' 
                    value={name} 
                    onChange={handleChange} 
                    placeholder='enter name'  required/>
            </div>
            <div className="registration-form__field">
                <label className="registration-form__field--label">
                    email :
                </label>
                <input 
                    className="registration-form__field--input"
                    type='email'  
                    name='email' 
                    value={email} 
                    onChange={handleChange} 
                    placeholder='enter email address'  required/>
            </div>
            <div className="registration-form__field">
                <label className="registration-form__field--label">
                    password :
                </label>
                <input 
                    className="registration-form__field--input"
                    type='password'  
                    name='password' 
                    value={password} 
                    onChange={handleChange} 
                    placeholder='enter password'  required/>
            </div>
            <div className="registration-form__field">
                <label className="registration-form__field--label">
                    re enter password :
                </label>
                <input 
                    className="registration-form__field--input"
                    type='password'  
                    name='confirmPassword' 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    placeholder='confirm your password'  required/>
            </div>
            
            <div className="registration-form__field registration-form__field-image">
                <label className="registration-form__field--label">
                  upload photo :
                </label>
                <input 
                    className="registration-form__field--input registration-form__field--input-image"
                    type='file'  
                    name='photo' 
                    accept="/image*"
                    onChange={handleChange}/>
            </div>

            <button type="submit" className="registration-form__button">
                create account
                <img src={RightArrow} alt="proceed" className="registration-form__button--arrow"/>
            </button>

            {!hideWarning  && <Message type='error' msg={warning}/>}
            {!hideSuccess &&  <Message type='success' msg={success}/>}

        </form>
    );
}

export default Registration;