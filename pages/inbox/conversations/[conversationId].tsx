import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import React from "react";
import { Conversation } from "../../../ts/interfaces/inbox";

interface conversationDetailPageProps {
  conversation: Conversation;
}

const ConversationDetailPage = (conversation: Conversation) => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { conversationId } = context.query;

  console.log(conversationId);

  return { props: {} };
};
export default ConversationDetailPage;
