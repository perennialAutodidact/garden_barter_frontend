import React, { useEffect, useState } from "react";
import { MessageItemProps } from "../../ts/interfaces/messages";
import { useAppDispatch } from "../../store/hooks";
import { deleteMessage } from "../../store/messageSlice";

const MESSAGE_ICONS = {
  success: "bi bi-heart-fill",
  info: "bi bi-info-circle-fill",
  warning: "bi bi-exclamation-diamond-fill",
  danger: "bi bi-heartbreak-fill"
};

function MessageItem({ message, messageIndex }: MessageItemProps) {
  const dispatch = useAppDispatch();

  const [iconClass, setIconClass] = useState<string>("");

  const onDelete = message => {
    dispatch(deleteMessage(message));
  };

  useEffect(
    () => {
      setIconClass(MESSAGE_ICONS[message.level]);

      setTimeout(() => {
        onDelete(message);
      }, 3000 + 500 * messageIndex);
    },
    [setIconClass]
  );

  return (
    <div
      className={
        `col-12 col-lg-6 offset-lg-3 my-0 rounded 
         alert alert-dismissible fade show shadow
         d-flex align-items-center ` + `alert-${message.level}`
      }
    >
      <i className={"h3 p-0 m-0 me-3 " + iconClass} />
      {message.text}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-bs-label="Close"
        onClick={() => onDelete(message)}
      />
    </div>
  );
}

export default MessageItem;
