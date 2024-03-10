import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './change-password.styles.scss';
import {useUserContext} from '../../context/user.context';
import {updateUserPassword} from '../../utilities/firebase.utilities';
import Message from '../../components/message/message.component';
import RightArrow from '../../assets/arrow-right-solid.svg';

const ChangePassword = () => {

    const {user,setUser} = useUserContext();
    const navigate = useNavigate();
    const [currentPassword , setCurrentPassword] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);
    const [success , setSuccess] = useState('');
    const [hideSuccess , setHideSuccess] = useState(true);
    


    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if(!user){
            setWarning('😢 user must be logged in ');
            return;
        }
        if(password !== confirmPassword){
            setWarning('😢 passwords are not same ');
            return;
        }
        
        try {

            await updateUserPassword(currentPassword , password)
            setSuccess('🎉 password updated succesfully. sign in again');
            setTimeout(()=> {
                setUser(null);
                navigate('/sign-in');
            }, 3000)

        } catch(error){
            setWarning(`😢  current password not valid`)
        }
    }

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

            }, 2000);
            
            return () => clearTimeout(timeout);
        }

    }, [success]);


    return(

        <>

        <form className='update-form-password' onSubmit={handlePasswordUpdate}>

        <div className="update-form-password__field">
                <label className="update-form-password__field--label">enter current password:</label>
                <input
                    className="update-form-password__field--input"
                    type='password'
                    name='currentPassword'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder='Enter current password'
                    required
                />
            </div>
            <div className="update-form-password__field">
                <label className="update-form-password__field--label">enter password:</label>
                <input
                    className="update-form-password__field--input"
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter new password'
                    required
                />
            </div>
            <div className="update-form-password__field">
                <label className="update-form-password__field--label">confirm password:</label>
                <input
                    className="update-form-password__field--input"
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='confirm new password'
                    required
                />
            </div>

            <button type='submit' className='update-form-password__button'>
                update
                <img src={RightArrow} alt="add" className="update-form-password__button--arrow" />
            </button>

        </form>

        {!hideWarning  && <Message type='error' msg={warning}/>}
        {!hideSuccess &&  <Message type='success' msg={success}/>}

        </>
    )
}

export default ChangePassword;