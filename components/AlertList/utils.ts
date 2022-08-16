import { useAppDispatch } from "../../store/hooks";
import { createAlert } from "../../store/alertSlice";

/** dispatch action to set an alert */
export const useHandleAlert = (): Function => {
  const dispatch = useAppDispatch();

  /** dispatch action to set an alert */
  return (text: string, level: string, id: number = 0) =>
    dispatch(createAlert({ text, level, id }));
};
