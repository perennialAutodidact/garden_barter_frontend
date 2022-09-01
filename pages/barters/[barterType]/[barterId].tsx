import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";
import BarterDetail from "../../../components/Barters/BarterDetail";
import { API_URL } from "../../../common/constants";
import { Barter } from "../../../ts/interfaces/barters";
import { useRouter, NextRouter } from "next/router";
import RouteProtector from "../../../common/components/RouteProtector";
import Layout from '../../../common/components/Layout'
import {httpClient, setHttpClientContext } from '../../../common/utils/httpClient'
import {titleize} from '../../../common/utils/helpers'
interface BarterDetailPageProps {
    barter: Barter;
}

const BarterDetailPage = ({ barter }: BarterDetailPageProps) => {
    const router: NextRouter = useRouter();
    return (
        <Layout title={`${titleize(barter.barterType)} - ${barter.title}`}>
            <div className="container-fluid bg-light-lighter">
                <BarterDetail barter={barter} />
            </div>
        </Layout>
    );
};
export const getServerSideProps: GetServerSideProps =
    async (context: GetServerSidePropsContext) => {
        setHttpClientContext(context)
        let { barterType, barterId } = context.query;
        console.log(barterType, barterId)   

        try {
            const {barters} = await httpClient.get(`${API_URL}/barters/${barterType}/${barterId}`).then(res=>res.data);
            // const {conversation} = await httpClient.get()

            return {
                props: {
                    barter: barters[0]
                }
            };
        } catch (error) {
            return {
                notFound: true
            };
        }
    };

export default BarterDetailPage;
