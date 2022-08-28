import React, { useState } from "react";
import { Barter } from "../../ts/interfaces/barters";
import { humanizeDateDistance } from "./utils";
import IconButton from "../../common/components/IconButton";
import BarterIcon from "./BarterIcon";
import { useAppSelector } from "../../store/hooks";
import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import { useRouter, NextRouter } from "next/router";
import { useFetchConversation } from "../Inbox/hooks/useFetchConversation";
import { Conversation } from '../../ts/interfaces/inbox'
interface BarterDetailProps {
    barter: Barter;
}

const BarterDetail = ({ barter }: BarterDetailProps) => {
    const router: NextRouter = useRouter();
    const [dateCreated, _] = useState<string>(
        humanizeDateDistance(barter.dateCreated.toString())
    );
    const { user } = useAppSelector((state) => state.auth);

    const conversation: Conversation = useFetchConversation(user, barter);

    const goToConversation = (conversation: Conversation) => {
        if (router && router !== undefined && router !== null) {
            router.push({
                pathname: '/inbox/conversations/[[...conversationId]]/',
                query: {
                    conversationId: conversation ? conversation.uuid : 'new',
                    barterType: barter.barterType,
                    barterId: barter.uuid,
                    sender: user.id
                }
            })
        }
    }

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
                <h3 className="h2 mt-2 mb-2 w-100 d-none d-lg-block">Description</h3>
                <div
                    className="my-1 pb-3 w-100 border-bottom d-none d-lg-block"
                    data-testid="BarterDescription"
                >
                    {barter.description}
                </div>
            </div>

            <div className="col-12 col-lg-4 p-3 border-top border-bottom border">
                <BarterIcon barterType={barter.barterType} />

                <h3 className="h2 mt-2 mb-2">{barter.title}</h3>
                <p className="mb-lg-3">
                    Posted {dateCreated} by {barter.creator.username || "Anonymous"}
                </p>

                <h3 className="h2 mt-2 mb-2 w-100 d-block d-lg-none">Description</h3>
                <div
                    className="my-1 pb-3 w-100 border-bottom d-block d-lg-none"
                    data-testid="BarterDescription"
                >
                    {barter.description}
                </div>
                <h3 className="h3 my-2 ">Trade</h3>
                <p className="mb-lg-5">
                    {barter.isFree ? "Free (no trade required)" : barter.willTradeFor}
                </p>

                <IconButton icon={<FaRegEnvelope onClick={() => goToConversation(conversation)} />} />
            </div>
        </div>
    );
};

export default BarterDetail;
