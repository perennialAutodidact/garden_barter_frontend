import React, { useState } from "react";
import { Barter } from "../../ts/interfaces/barters";
import { humanizeDateDistance } from "./utils";
import IconButton from "./IconButton";
import BarterIcon from "./BarterIcon";
import { useAppSelector } from "../../store/hooks";
import MessageForm from "./MessageForm";
import { FaRegEnvelope } from "react-icons/fa";
import { useRouter, NextRouter } from "next/router";
import { useFetchConversation } from "../Inbox/hooks/useFetchConversation";
interface BarterDetailProps {
  barter: Barter;
}

const BarterDetail = ({ barter }: BarterDetailProps) => {
  const router: NextRouter = useRouter();
  const [dateCreated, _] = useState<string>(
    humanizeDateDistance(barter.dateCreated.toString())
  );
  const { user } = useAppSelector(state => state.auth);
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);
  const toggleShowForm = () => setShowMessageForm(!showMessageForm);

  const conversation = useFetchConversation(user, barter);

  console.log("conversation", conversation);
  console.log("user", user);

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
          Posted {dateCreated} by {barter.creator.username || 'Anonymous'}
        </p>

        <h3 className="h3 my-2 ">Trade</h3>
        <p className="mb-lg-5">
          {barter.isFree ? "Free (no trade required)" : barter.willTradeFor}
        </p>

        {showMessageForm
          ? <MessageForm toggleShowForm={toggleShowForm} barter={barter} />
          : <div
              onClick={() => {
                conversation
                  ? goToConverstaion(conversation.id)
                  : setShowMessageForm(!showMessageForm);
              }}
            >
              <IconButton icon={<FaRegEnvelope />} />
            </div>}
      </div>
    </div>
  );
};

export default BarterDetail;
