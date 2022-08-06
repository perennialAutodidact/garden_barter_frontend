import React, { useState, useEffect } from "react";
import { Barter } from "../../ts/interfaces/barters";
import { humanizeDateDistance } from "./utils";
import IconButton from "./IconButton";
import BarterIcon from "./BarterIcon";
import { findConversation } from "../../store/inboxSlice/actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MessageForm from "./MessageForm";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaRegEnvelope } from "react-icons/fa";
import { useRouter, NextRouter } from "next/router";

interface BarterDetailProps {
  barter: Barter;
}

const BarterDetail = ({ barter }: BarterDetailProps) => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const [dateCreated, _] = useState<string>(
    humanizeDateDistance(barter.dateCreated.toString())
  );
  const { user } = useAppSelector(state => state.auth);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [conversationId, setConversationId] = useState<number>(null);

  useEffect(
    () => {
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
        setConversationId(res.conversation.id);
      })();
    },
    [user]
  );

  const toggleShowForm = () => setShowForm(!showForm);
  const goToConverstaion = (conversationId: number) => {
    router.push({
      pathname: "/inbox/conversations/[conversationId]",
      query: { conversationId }
    });
  };

  return (
    <div className="row p-lg-4 mb-5">
      <div className="col-12 col-lg-8 py-3 bg-light-dark d-flex flex-column align-items-center border">
        <img src="https://picsum.photos/300" alt="" className="rounded" />
        <div className="mt-2 mb-5 d-flex justfiy-content-center bg-light rounded">
          <div className="p-2 border-bottom d-flex justify-content-evenly gap-3">
            <img src="https://picsum.photos/50" className="rounded" alt="" />
            <img src="https://picsum.photos/50" className="rounded" alt="" />
            <img src="https://picsum.photos/50" className="rounded" alt="" />
          </div>
        </div>
        <h3 className="h2 mt-2 mb-2 w-100">Description</h3>
        <div
          className="my-1 pb-3 w-100 border-bottom"
          data-testid="BarterDescription"
        >
          {barter.description}
        </div>
      </div>

      <div className="col-12 col-lg-4 p-3 border-top border-bottom border">
        <BarterIcon barterType={barter.barterType} />

        <h3 className="h2 mt-2 mb-2">
          {barter.title}
        </h3>
        <p className="mb-lg-3">
          Posted {dateCreated}
        </p>

        <h3 className="h3 my-2 ">Trade</h3>
        <p className="mb-lg-5">
          {barter.isFree ? "Free (no trade required)" : barter.willTradeFor}
        </p>

        {showForm
          ? <MessageForm toggleShowForm={toggleShowForm} barter={barter} />
          : <div
              onClick={() => {
                conversationId
                  ? goToConverstaion(conversationId)
                  : setShowForm(!showForm);
              }}
            >
              <IconButton icon={<FaRegEnvelope />} />
            </div>}
      </div>
    </div>
  );
};

export default BarterDetail;
