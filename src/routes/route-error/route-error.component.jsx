import { Link } from "react-router-dom";
import './route-error.styles.scss';

const PageNotFound = () => {

    return (
        <div className="route-error">
           <h4 className="route-error--heading">
                Oops ! the page you are looking not avilable
           </h4>
           <p className="route-error--text">
                try going <Link className="route-error--link" to='/'> back &rarr;</Link>
           </p>
        </div>
    );
}

export default PageNotFound;