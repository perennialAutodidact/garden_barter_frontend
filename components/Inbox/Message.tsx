import React, { useEffect, useState } from 'react'
import { Message } from '../../ts/interfaces/inbox'
import { Barter } from '../../ts/interfaces/barters';
import { User } from '../../ts/interfaces/auth';

interface MessageProps {
    message: Message;
    barter: Barter;
    user: Partial<User>;
    userIsBarterCreator?: boolean;
}

const Message = ({ message, barter, user, userIsBarterCreator }: MessageProps) => {
    const [bgColorClass, setBgColorClass] = useState<string>(
        userIsBarterCreator
            ? 'bg-secondary-light'
            : 'bg-warning-light'
    )
    return (
        <div className={`col-12 `}
        >
            <div className="row w-100">
                {!userIsBarterCreator && (

                    <div className="col-2 d-flex align-items-end text-success">
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                )}
                <div className={
                    `col-10 
                    ${userIsBarterCreator && 'offset-2'}
            
                    ${bgColorClass}
                    p-3 
                    rounded
                    shadow
                `}>
                    {message.body}
                </div>
                {userIsBarterCreator && (
                    <div className="col-2 d-flex align-items-end text-success">
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Message