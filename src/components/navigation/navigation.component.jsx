import { Link , Outlet } from "react-router-dom";
import {signOutUser} from '../../utilities/firebase.utilities';
import {useUserContext} from '../../context/user.context';
import './navigation.styles.scss';
import User from "../user/user.component";
import IconLogOut from '../../assets/log-out.svg';


const Navigation =  () => {


    const { user } = useUserContext();

    return (
        
        <>

        <nav className="navigation">


            <Link to='/' className="navigation--heading">
                Expenses
            </Link>

            <div className="navigation__links">

                {!user && (<Link className="navigation--link" to='/sign-in'>
                        sign in
                </Link>)}

                {!user && (<Link className="navigation--link" to='/registration'>
                        register
                </Link>)}

                {user && <User/>}
                
                {user && (<Link to='/sign-in' className="navigation--icon-log-out" onClick={signOutUser}>
                    <img src={IconLogOut} alt="sign out" />
                </Link>)}
            </div> 

        </nav>

        <Outlet/>

        </>
    )
};

export default Navigation;