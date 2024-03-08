import './transaction.styles.scss';
import TrashCan from '../../assets/trash-can.svg';

const Transaction = () => {


    const handleDelete = async (e) => {

        const id = e.target.getAttribute('data-id');
        console.log(id);
    }


    return (

        <div className="transaction">

            <p className="transaction--name">
                transaction details
            </p>
            
            <div className="transaction__details">
                <p className="transaction--amount">
                    $ 20
                </p>
                <img src={TrashCan} alt="delete transaction" data-id={1234} className='transaction--icon' onClick={handleDelete}/>
            </div>
            
        </div>
    );
}

export default Transaction;