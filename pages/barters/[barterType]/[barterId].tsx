import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";
import BarterDetail from "../../../components/Barters/BarterDetail";
import { API_URL } from "../../../common/constants";
import { Barter } from "../../../ts/interfaces/barters";
import { useRouter, NextRouter } from "next/router";
import RouteProtector from "../../../common/components/RouteProtector";
interface BarterDetailPageProps {
    barter: Barter;
}

const BarterDetailPage = ({ barter }: BarterDetailPageProps) => {
    const router: NextRouter = useRouter();
    return (
        <div className="container-fluid bg-light-lighter">
            <BarterDetail barter={barter} />
        </div>
    );
};
export const getServerSideProps: GetServerSideProps =
    async (context: GetServerSidePropsContext) => {
        let { barterType, barterId } = context.query;
        console.log(barterType, barterId)

        try {
            const res = await axios.get(`${API_URL}/barters/${barterType}/${barterId}`);

            return {
                props: {
                    barter: res.data.barters[0]
                }
            };
        } catch (error) {
            return {
                notFound: true
            };
        }
    };

export default BarterDetailPage;
