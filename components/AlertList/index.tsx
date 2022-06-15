import React, { useRef } from "react";
import AlertItem from "./AlertItem";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

function AlertList() {
  const { alerts } = useAppSelector(state => state.alerts);
  const dispatch = useAppDispatch();

  return (
    <div className="position-absolute container-fluid mt-3">
      <div className="row">
        {alerts &&
          alerts.map((alert, index) =>
            <AlertItem
              alert={alert}
              key={alert.id.toString()}
              alertIndex={index}
              dispatch={dispatch}
            />
          )}
      </div>
    </div>
  );
}

export default AlertList;
