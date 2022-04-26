import React, { useRef } from "react";
import MessageItem from "./MessageItem";
import { useAppSelector } from "../../store/hooks";

function MessageList() {
  const { messages } = useAppSelector(state => state.messages);

  return (
    <div className="position-absolute container-fluid mt-3">
      <div className="row">
        {messages &&
          messages.map((message, index) =>
            <MessageItem
              message={message}
              key={message.id.toString()}
              messageIndex={index}
            />
          )}
      </div>
    </div>
  );
}

export default MessageList;
