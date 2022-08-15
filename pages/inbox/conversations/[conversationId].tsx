import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { API_URL } from "../../../common/constants";
import { Conversation } from "../../../ts/interfaces/inbox";
import { useRouter, NextRouter } from "next/router";
import { URLSearchParams } from "url";
import { fetchConversation } from "../../../store/inboxSlice/actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import RouteProtector from "../../../common/components/RouteProtector";
import { refreshToken, verifyToken } from "../../../store/authSlice/actions";

interface ConversationDetailProps {
  conversation: Conversation;
}

const ConversationDetailPage = ({ conversation }: ConversationDetailProps) => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      console.log(router.query.conversationId);
      (async () => {
        const { conversationId } = router.query;
        try {
            await dispatch(verifyToken('access'))
            await dispatch(refreshToken)
            const res = await dispatch(fetchConversation(conversationId)).then(
              unwrapResult
            );
            console.log(res);
        } catch (error) {
            
        }
      })();
    },
    [router]
  );

  return (
    <RouteProtector>
      <div>Conversation</div>;
    </RouteProtector>
  );
};

export default ConversationDetailPage;
