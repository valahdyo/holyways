import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import NavbarComponent from "../components/Navbar";
import DonateCardComponent from "../components/DonateCard";
import DonateImage_1 from "../assets/donate-1.png";

function Raisefundpage() {
  let isLogin = localStorage.getItem('isLogin')
  let history = useHistory()
  const handleRaisefund = () => history.push('/formfund')

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 pr-5">
        <Row className="d-flex justify-content-between pr-5">
          <div className="profile-heading mb-4">My Raise Fund</div>
          <div className="pt-2">
            <Button onClick={handleRaisefund} className="w-100 donate-btn">Make Raise Fund</Button>
          </div>
        </Row>
        <Row>
          <Col lg={4} className="donate-box pl-0 pt-0">
          <DonateCardComponent
              isLogin={isLogin}
              image={DonateImage_1}
              title={"The Strength of a People. Power of Community"}
              desc={
                "Some quick example text to build on the card title and make up the bulk of the card's content."
              }
              total={"Rp 25.000.000"}
              progress={60}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Raisefundpage;
