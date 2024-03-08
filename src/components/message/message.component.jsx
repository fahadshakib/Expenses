import './message.styles.scss';

const Message = ({ msg , type}) => {
    return (
        <p className={`${type}-message`}>
            {msg}
        </p>
    );
}

export default Message;