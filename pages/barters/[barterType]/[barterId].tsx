import { GetServerSideProps } from "next";
import axios from "axios";
import BarterDetail from "../../../components/Barters/BarterDetail";
import { API_URL } from "../../../common/constants";
import { Barter } from "../../../ts/interfaces/barters";
import { useRouter, NextRouter } from "next/router";
import RouteProtector from "../../../components/Layout/RouteProtector";
interface BarterDetailPageProps {
  barter: Barter;
}

const BarterDetailPage = ({ barter }: BarterDetailPageProps) => {
  const router: NextRouter = useRouter();
  return (
    <RouteProtector>
      <div className="container-fluid bg-light-lighter">
        <BarterDetail barter={barter} />
      </div>
    </RouteProtector>
  );
};
export const getServerSideProps: GetServerSideProps = async context => {
  let { barterType, barterId } = context.query;

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
