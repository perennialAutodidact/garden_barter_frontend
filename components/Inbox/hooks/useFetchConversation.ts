import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { User } from "../../../ts/interfaces/auth";
import { Barter } from "../../../ts/interfaces/barters";
import { findConversation } from "../../../store/inboxSlice/actions";
import { Conversation } from "../../../ts/interfaces/inbox";
import { unwrapResult } from "@reduxjs/toolkit";

export const useFetchConversation = (user: User, barter: Barter) => {
  const [conversation, setConversation] = useState<Conversation>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) return;
    (async () => {
      const res = await dispatch(
        findConversation({
          recipientId: barter.creator.id,
          senderId: user.id,
          barterId: barter.uuid,
          barterType: barter.barterType
        })
      ).then(unwrapResult);
      setConversation(res.conversation);
    })();
  }, [user]);

  return conversation;
};
