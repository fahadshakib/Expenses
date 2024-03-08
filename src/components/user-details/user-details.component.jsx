import './user-details.styles.scss';
import defaultPhoto from '../../assets/default.png';
import imageUser from '../../assets/user.svg';
import imageMail from '../../assets/envelope-regular.svg';
import imageJoinedOn from '../../assets/calendar-regular.svg' ;


const UserDetails = ({name , email , photo , joinedOn}) => {

    return (

        <div className="user">

            <img src={photo || defaultPhoto} alt={name} className='user--photo'/>

            <div className="user__details">
                <img src={imageUser} alt="fahad hossain" className='user__details--icon'/>
                <p className="user__details--name">{name}</p>
            </div>
            <div className="user__details">
                <img src={imageMail} alt="mail" className='user__details--icon'/>
                <p className="user__details--mail">{email}</p>
            </div>
            <div className="user__details">
                <img src={imageJoinedOn} alt="joining date" className='user__details--icon'/>
                <p className="user__details--date">{joinedOn}</p>
            </div>

        </div>
    )
}

export default UserDetails;