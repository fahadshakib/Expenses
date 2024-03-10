import {useState} from 'react';
import { Link } from 'react-router-dom';
import './dropdown.styles.scss';



const Dropdown = () => {

    const [isOpen , setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="dropdown">

          <div onClick={toggleDropdown} className="dropdown--button">
            update profile
          </div>

          {isOpen && (
            <ul className="dropdown__links">
              <Link to='/profile/change-name' className='dropdown--link'>update name</Link>
              <Link to='/profile/change-photo' className='dropdown--link'>update photo</Link>
              <Link to='/profile/change-password' className='dropdown--link'>change password</Link>
            </ul>
          )}

        </div>
      );
}

export default Dropdown;