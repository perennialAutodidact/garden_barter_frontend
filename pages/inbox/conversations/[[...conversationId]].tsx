import {
    GetServerSideProps,
    GetServerSidePropsContext,
} from "next";
import React, { useEffect, useState } from "react";
import Message from "../../../components/Inbox/Message";
import { Conversation } from "../../../ts/interfaces/inbox";
import { TEST_CONVERSATION } from "../../../__tests__/testData";
import RouteProtector from '../../../common/components/RouteProtector'

import { useAppSelector } from '../../../store/hooks'
import { Barter } from "../../../ts/interfaces/barters";
import axios from "../../../common/utils/axiosSetup";
import { API_URL } from "../../../common/constants";
import { httpClient, setHttpClientContext } from "../../../common/utils/httpClient";

interface ConversationDetailProps {
    conversation: Conversation;
    barter: Barter;
}

const ConversationDetailPage = ({ conversation, barter }: ConversationDetailProps) => {
    const { user } = useAppSelector(state => state.auth)
    const [userIsBarterCreator, setUserIsBarterCreator] = useState<boolean>(false)

    useEffect(() => {
        if (user) {
            setUserIsBarterCreator(user.username === barter.creator.username)
        }
    }, [user])

    return <RouteProtector>

        <div className="container min-100-vh mt-5">
            <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2 py-2 bg-light-dark rounded">
                    <div><i className="bi bi-arrow-left h3 text-primary"></i></div>
                    <div className="container-fluid p-0">


                        <div className="row bg-light py-3 mb-2   position-relative " id="conversation-header">
                            <div className="col-5 col-lg-3 offset-lg-2">
                                <h5 className='text-center m-0'>barter title</h5>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <i className="bi bi-arrow-left-right"></i>
                            </div>
                            <div className="col-5 col-lg-3">
                                <h5 className='text-center m-0'>trade for</h5>
                            </div>
                        </div>
                        <div className="row message-container scroll-y h-75-vh p-3 gy-2">

                            {conversation.messages.map(message => <Message message={message} barter={barter} user={user} userIsBarterCreator={userIsBarterCreator} />)}

                        </div>
                        <div className="row">
                            <div className="input-group p-0 bg-light-light">
                                <input type="text" placeholder="Message..." className="border-0 form-control rounded-0 bg-light-light" aria-label="Message Text" aria-describedby="send-message-button" />
                                <button className="btn btn-success rounded-0" id="send-message-button" type="button">
                                    <i className="bi bi-arrow-up-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </RouteProtector>
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    console.log('conversationDetail cookies', context.req.headers.cookie)
    setHttpClientContext(context)
    const { conversationId, barterType, barterId, user } = context.query;
    if (conversationId !== 'new') {
        try {
            let conversation = TEST_CONVERSATION

            const conversationRes = await httpClient.get(`${API_URL}/inbox/conversations/find/`)
            conversation = conversationRes.data.conversation
            const barterId = TEST_CONVERSATION.barterUuid
            const res = await axios.get(`${API_URL}/barters/${barterType}/${barterId}/`)
            const barter = res.data.barters[0]

            return {
                props: {
                    conversation,
                    barter
                }
            }
        } catch (error) {
            console.log('conversation detail error', error.response.data)
            return {
                redirect: {
                    destination: `/login?next=/inbox/conversations/${conversationId}`,
                    permanent: false
                },
                props: {}
            }
        }
    }

};
export default ConversationDetailPage;
