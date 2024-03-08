import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { useUserContext } from '../../context/user.context';
import { db, COLLECTION_TRANSACTION , deleteTransactionFromFirestore} from '../../utilities/firebase.utilities';
import Transaction from "../transaction/transaction.component";
import Message from '../../components/message/message.component';
import './transactions.styles.scss';


const Transactions = () => {

    const { uid, user } = useUserContext();
    const [transactions, setTransactions] = useState([]);
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);


    const deleteTransaction = async (transactionId) => {

        try {

            await deleteTransactionFromFirestore(transactionId);
            setTransactions(transactions.filter(transaction => transaction.id !== transactionId));

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

            }, 2400);

            return () => clearTimeout(timeout);
        }

    }, [warning]);



    useEffect(() => {

        const fetchTransactions = async () => {

            if (!user) return;

            const q = query(collection(db, COLLECTION_TRANSACTION), where('uid', '==', uid));

            const unsubscribe = onSnapshot(q, (snapshot) => {

                const updatedTransactions = [];
                snapshot.forEach((doc) => {

                    const transactionId = doc.id;
                    const transactionData = doc.data();
                    updatedTransactions.push({ id: transactionId, ...transactionData });
                });

                setTransactions(updatedTransactions);

            });

            return () => unsubscribe();
        };

        fetchTransactions();

    }, [uid, user]);



    return (
        <div className="transactions">

            {transactions && transactions.map(doc => (

                <Transaction key={doc.id} 
                    transaction={doc.transaction} 
                    amount={doc.amount}
                    deleteTransaction = {() => deleteTransaction(doc.id)} 
                />
            ))}

            {!hideWarning  && <Message type='error' msg={warning}/>}

        </div>
    );
};

export default Transactions;
