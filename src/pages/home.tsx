import SectionContainer from "../components/SectionContainer";
import Payroll from "./Payroll";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div>
      <Header title="Home" />
      <SectionContainer>
        <Payroll />
      </SectionContainer>
    </div>
  );
};

HomePage.auth = true;

export default HomePage;
