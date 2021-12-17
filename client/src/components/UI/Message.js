import { Fragment, useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import AuthContext from "../../store/auth-context";

const Message = props => {

    const ctx = useContext(AuthContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage(ctx.message);

        let interval = setInterval(() => {
            ctx.clearMessage('');
        }, 5000);


        return ()=>{
            clearInterval(interval);
        }

    }, [ctx.message]);

    if (message === '') {
        return <Fragment></Fragment>
    }

    return (
        <div className="alert alert-danger" >
            {message}
        </div>
    )
}

export default Message;