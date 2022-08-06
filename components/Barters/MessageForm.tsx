import React, { useState, Fragment } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RiMailSendLine } from "react-icons/ri";
import { messageSchema } from "../../ts/validation/inbox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createMessage } from "../../store/inboxSlice/actions";
import { Barter } from "../../ts/interfaces/barters";
import { MessageFormData } from "../../ts/interfaces/inbox";
import Spinner from "../../components/Layout/Spinner";
import { refreshToken, verifyToken } from "../../store/authSlice/actions";
import { createAlert } from "../../store/alertSlice/actions";
import { unwrapResult } from "@reduxjs/toolkit";

interface MessageFormProps {
  toggleShowForm: React.MouseEventHandler;
  barter: Barter;
}

const MessageForm = ({ toggleShowForm, barter }: MessageFormProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { inboxLoadingStatus } = useAppSelector(state => state.inbox);
  const [formData, setFormData] = useState<MessageFormData>({
    messageBody: "",
    barterType: barter.barterType,
    barterId: barter.uuid,
    senderId: user.id,
    recipientId: barter.creator.id
  });
  const [formError, setFormError] = useState<string>("");

  /** dispatch action to set an alert */
  const handleAlert = (id: number, text: string, level: string) => {
    dispatch(createAlert({ id, text, level }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError("");
    setFormData({ ...formData, messageBody: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, error } = messageSchema.safeParse(formData.messageBody);
    if (error) {
      const errors = error.issues.map(issue => issue.message);
      setFormError(errors);
    } else {
        try {
            await dispatch(verifyToken("access"));
            await dispatch(refreshToken());

            const messageRes = await dispatch(
                createMessage(formData)
              ).then(unwrapResult);
              
              handleAlert(0, messageRes.message, "success");
            } catch (error) {
            error.errors
          ? error.errors.forEach((error, index) => {
              handleAlert(index, error, "danger");
            })
          : handleAlert(
              0,
              "Something went wrong. Please try again later",
              "danger"
            );
        }
       


    }
  };

  if (inboxLoadingStatus === "PENDING") {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Fragment>
      <h3 className="h2 mt-2 mb-2">Send a message</h3>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-1">
        <input
          type="text"
          placeholder="e.g. Let's trade!"
          className={`form-control ${formError ? "is-invalid" : "mb-1"}`}
          onChange={handleChange}
          value={formData.messageBody}
        />
        {formError &&
          <p
            className="m-0 mb-1 text-danger"
            //   data-testid={`BarterFormError-${field.name}`}
            key={formError}
          >
            {formError}
          </p>}
        <button
          onClick={toggleShowForm}
          className="btn btn-danger w-100 text-danger-lightest fs-5"
        >
          <IoMdCloseCircle />
        </button>
        <button
          type="submit"
          className="btn btn-success w-100 text-success-lightest fs-5"
        >
          <RiMailSendLine />
        </button>
      </form>
    </Fragment>
  );
};

export default MessageForm;
