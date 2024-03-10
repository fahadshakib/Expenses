import {Link} from 'react-router-dom';
import './button.styles.scss';

const ButtonGoBack = () => {

    return (

        <div className="button-go-back">
            <Link to='/profile' className='button-go-back--link'>Back to Profile</Link>
        </div>
    )
}

export default ButtonGoBack;