import Map from "components/map/Map";
import { FiArrowDown } from "react-icons/fi";

const Main = ({ children }) => {
  return (
    <div className="contents">
      <h1>월요일에 운영하는 문화공간</h1>{" "}
      <FiArrowDown style={{ fontSize: "xx-large" }} />
      <Map />
    </div>
  );
};

export default Main;
