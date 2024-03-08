import './transaction.styles.scss';
import TrashCan from '../../assets/trash-can.svg';

const Transaction = ({ transaction , amount , deleteTransaction}) => {


    return (

        <div className="transaction">

            <p className="transaction--name">
                {transaction}
            </p>
            
            <div className="transaction__details">
                <p className="transaction--amount">
                    $ {amount}
                </p>
                <img src={TrashCan} alt="delete transaction"  className='transaction--icon' onClick={deleteTransaction}/>
            </div>
            
        </div>
    );
}

export default Transaction;