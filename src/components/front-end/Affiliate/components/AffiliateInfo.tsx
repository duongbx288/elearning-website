import { useLocation } from "react-router-dom";

interface CustomState {
    id: number;
  }

const AffiliateInfo = () => {

    const location = useLocation();
    const affiliate = location.state as CustomState;

    return (
        <></>
    );
}

export default AffiliateInfo;