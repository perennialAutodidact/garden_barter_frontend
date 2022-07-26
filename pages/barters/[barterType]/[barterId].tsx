import { GetServerSideProps } from "next";
import { useProtectedRouter } from "../../../hooks/useProtectedRouter";
import axios from "axios";
import BarterItem from "../../../components/Barters/BarterItem";
import { API_URL } from "../../../constants";

const BarterTradePage = ({ barter }) => {
  const { router } = useProtectedRouter();
  return (
    <div className="container-fluid">
      <BarterItem barter={barter} showAllFields={true}/>
    </div>
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

export default BarterTradePage;
