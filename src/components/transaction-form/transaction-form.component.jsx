import { useState, useEffect } from 'react';
import './transaction-form.styles.scss';
import { useUserContext } from '../../context/user.context';
import Message from '../../components/message/message.component';
import RightArrow from '../../assets/arrow-right-solid.svg';

const TransactionForm = () => {

    const { user } = useUserContext();
    const [warning, setWarning] = useState('');
    const [hideWarning, setHideWarning] = useState(true);

    const [data, setData] = useState({
        transaction: '',
        amount: ''
    });
    const { transaction, amount } = data;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const addTransactionHandler = async (e) => {

        e.preventDefault();

        try {

            if (!user){
                setWarning('😥 user must be  logged in');
                return;
            }

            console.log(transaction , amount);
            setData({ transaction: '', amount: '' });

        } catch (error) {

            setWarning(error.message);
        }
    };

    useEffect(() => {

        if (warning) {

            setHideWarning(false);
            const timeout = setTimeout(() => {

                setHideWarning(true);
                setWarning('');

            }, 1400);

            return () => clearTimeout(timeout);
        }

    }, [warning]);


    return (

        <form className={`transaction-form ${!user ? 'transaction-form--disabled' : ''}`} onSubmit={addTransactionHandler}>
            <div className="transaction-form__field">
                <label className="transaction-form__field--label">Transaction name:</label>
                <input
                    className="transaction-form__field--input"
                    type='text'
                    name='transaction'
                    value={transaction}
                    onChange={handleChange}
                    placeholder='Enter transaction name'
                    required
                />
            </div>
            <div className="transaction-form__field">
                <label className="transaction-form__field--label">Amount:</label>
                <input
                    className="transaction-form__field--input"
                    type='text'
                    name='amount'
                    value={amount}
                    onChange={handleChange}
                    placeholder='Enter transaction amount'
                    required
                />
            </div>

            <button type={`${user ? 'submit' : 'button'}`} className={`transaction-form__button ${!user ? 'transaction-form__button--disabled' : ''}`}>
                Add transaction
                <img src={RightArrow} alt="add" className="transaction-form__button--arrow" />
            </button>

            {!hideWarning && <Message type='error' msg={warning} />}
            
        </form>
    );
};

export default TransactionForm;
