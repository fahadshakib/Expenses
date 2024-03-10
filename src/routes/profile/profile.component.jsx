import {useState, useEffect } from 'react';
import './profile.styles.scss';
import {useUserContext} from '../../context/user.context';
import UserDetails from '../../components/user-details/user-details.component';
import Dropdown from '../../components/dropdown/dropdown.component';


const Profile = () => {

    const { user } = useUserContext();
    const [userData , setUserData] = useState({name: '', photo:null , email:'', joinedOn:null});
    const {name , email , photo , joinedOn} = userData;
  
  
    useEffect(() => {
  
        if (user) {

          const {name , email , photo , joinedOn } = user;
          setUserData({name , email , photo , joinedOn });
  
        } else {
            
          setUserData({name: '', photo:null , email:'', joinedOn:null});
        }
      }, [user]);

    return (

        <div className='profile'>
            <UserDetails name={name} email={email} photo={photo} joinedOn={joinedOn}/>
            <Dropdown/>
        </div>
    )
}
export default Profile;