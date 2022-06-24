import React, { useEffect, useState } from "react";
import { AlertItemProps } from "../../ts/interfaces/alerts";
import { deleteAlert } from "../../store/alertSlice";

const ALERT_ICONS = {
  success: "bi bi-heart-fill",
  info: "bi bi-info-circle-fill",
  warning: "bi bi-exclamation-diamond-fill",
  danger: "bi bi-heartbreak-fill"
};

function AlertItem({ alert, dispatch }: AlertItemProps) {
  const [iconClass, setIconClass] = useState<string>("");

  const onDelete = alert => {
    dispatch(deleteAlert(alert));
  };

  useEffect(
    () => {
      setIconClass(ALERT_ICONS[alert.level]);

      setTimeout(() => {
        onDelete(alert);
      }, 4000);
    },
    [setIconClass]
  );

  return (
    <div
      className={
        `col-12 col-lg-6 offset-lg-3 my-0 rounded 
         alert alert-dismissible fade show shadow
         d-flex align-items-center ` + `alert-${alert.level}`
      }
    >
      <i className={"h3 p-0 m-0 me-3 " + iconClass} />
      {alert.text}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-bs-label="Close"
        onClick={() => onDelete(alert)}
      />
    </div>
  );
}

export default AlertItem;
