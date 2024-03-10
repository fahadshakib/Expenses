import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './change-photo.styles.scss';
import {useUserContext} from '../../context/user.context';
import {updateUserPhoto} from '../../utilities/firebase.utilities';
import Message from '../../components/message/message.component';
import RightArrow from '../../assets/arrow-right-solid.svg';
import ButtonGoBack from '../../components/button/button.component';

const ChangePhoto = () => {

    const {uid,user,forceRefresh} = useUserContext();
    const navigate = useNavigate();
    const [photo , setPhoto] = useState(null);
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);
    const [success , setSuccess] = useState('');
    const [hideSuccess , setHideSuccess] = useState(true);

    const handleChange = (e) => {

        const { name,  files } = e.target;
        if ((name === 'photo') && files && (files.length > 0)) setPhoto(files[0]);
    }

    const handlephotoUpdate = async (e) => {

        e.preventDefault();

        if(!user) {
            setWarning('😢 user must be logged in');
            return;
        }
        if(!photo) {
            setWarning('😢 please select an image file');
            return;
        }
        
        try{

            const name = user.name;
            await updateUserPhoto(uid , name , photo);
            setSuccess('🎉🎉 updated user photo')
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

        <form className='update-form-photo' onSubmit={handlephotoUpdate}>

            <div className="update-form-photo__field">
                <label className="update-form-photo__field--label">chose profile photo:</label>
                <input
                    className="update-form-photo__field--input"
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={handleChange}
                    required
                />
            </div>

            <button type='submit' className='update-form-photo__button'>
                upload
                <img src={RightArrow} alt="add" className="update-form-photo__button--arrow" />
            </button>

        </form>

        {!hideWarning  && <Message type='error' msg={warning}/>}
        {!hideSuccess &&  <Message type='success' msg={success}/>}

        <ButtonGoBack/>

        </>
    )
}

export default ChangePhoto;