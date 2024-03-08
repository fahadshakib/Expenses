import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import './user.styles.scss';
import {useUserContext} from '../../context/user.context';
import defaultPhoto from '../../assets/default.png';


const User = () => {


  const { user } = useUserContext();
  const [userData , setUserData] = useState({name: '', photo:null});
  let {name , photo} = userData;
  if(name) name = name.trim().split(' ').splice(0,2).join(' ');


  useEffect(() => {

      if (user) {

        const { name, photo } = user;
        setUserData({ name, photo });

      } else {
          
        setUserData({ name: '', photo: null });
      }
    }, [user]);


    return (
        <div className="user-profile">
            <Link className='user-profile--link' to='/profile'>
                <img src={photo || defaultPhoto} alt={name} className="user-profile--image"/>
            </Link>
            <p className="user-profile--name">
                {name}
            </p>
        </div>
    )
}

export default User;