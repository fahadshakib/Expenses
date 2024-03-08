import './home.styles.scss';
import { useUserContext } from '../../context/user.context';
import TransactionForm from '../../components/transaction-form/transaction-form.component';
import Transactions from '../../components/transactions/transactions.component';


const Home = () => {

    const {user } = useUserContext();

    return (

        <div className= 'home'>
            <TransactionForm />
            {user && <Transactions />}
        </div>
    )
}
export default Home;