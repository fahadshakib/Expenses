import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './change-name.styles.scss';
import {useUserContext} from '../../context/user.context';
import {updateUserName} from '../../utilities/firebase.utilities';
import Message from '../../components/message/message.component';
import RightArrow from '../../assets/arrow-right-solid.svg';

const ChangeUserName = () => {

    const {uid,user,forceRefresh} = useUserContext();
    const navigate = useNavigate();
    const [newName , setNewName] = useState('');
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);
    const [success , setSuccess] = useState('');
    const [hideSuccess , setHideSuccess] = useState(true);

    const handleNameUpdate = async (e) => {

        e.preventDefault();

        if(!user) {
            setWarning('😢 user must be logged in');
            return;
        }
        
        try{

            await updateUserName(uid , newName);
            setSuccess('🎉🎉 updated user name')
            forceRefresh();
            setTimeout(()=> {navigate('/profile')}, 3000);

        } catch(error){

            setWarning(`😥 ${error.message}`);
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

        <form className='update-form' onSubmit={handleNameUpdate}>

            <div className="update-form__field">
                <label className="update-form__field--label">enter name:</label>
                <input
                    className="update-form__field--input"
                    type='text'
                    name='newName'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder='Enter new name'
                    required
                />
            </div>

            <button type='submit' className='update-form__button'>
                update
                <img src={RightArrow} alt="add" className="update-form__button--arrow" />
            </button>

        </form>

        {!hideWarning  && <Message type='error' msg={warning}/>}
        {!hideSuccess &&  <Message type='success' msg={success}/>}

        </>
    )
}

export default ChangeUserName;