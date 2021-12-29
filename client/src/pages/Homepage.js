import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NavbarComponent from "../components/Navbar";
import DonateCardComponent from "../components/DonateCard";
import LoginModalComponent from "../components/LoginModal";
import {
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import HeaderImage_1 from "../assets/1340554718-1.png";
import HeaderImage_2 from "../assets/1340554718-2.png";
import DonateImage_1 from "../assets/donate-1.png";
import DonateImage_2 from "../assets/donate-2.png";
import DonateImage_3 from "../assets/donate-3.png";

function Homepage() {
  let {isLogin, login} = useContext(AuthContext)
  let history = useHistory()
  isLogin = localStorage.getItem('isLogin')
  const [showLogin, setShowLogin] = useState(false);
  
  const handleShowLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const handleCloseLogin = () => {
    login()
    localStorage.setItem('isLogin', "true")
    setShowLogin(false);
    history.push("/")
  }
  return (
    <>
      <NavbarComponent />
      <Container fluid className="header-wrapper">
        <Row>
          <Col lg={7}>
            <h1 className="heading-font light-color">
              While you are still standing, try to reach out to the people who
              are falling.
            </h1>
            <p className="header-desc-font light-color">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <Button href="#donate-now" className="header-btn">Donate Now</Button>
          </Col>
          <Col lg={5}>
            <img src={HeaderImage_1} className="header-img-1" alt="hero1"></img>
          </Col>
        </Row>
      </Container>
      <Container fluid className="content-wrapper">
        <Row>
          <Col lg={4}>
            <img src={HeaderImage_2} className="header-img-2" alt="hero2"></img>
          </Col>
          <Col className="content-desc" lg={8}>
            <h1 className="heading-font dark">
              Your donation is very helpful for people affected by forest fires
              in Kalimantan.
            </h1>
            <Row>
              <Col lg={6}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </Col>
              <Col lg={5}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container fluid className="donate-wrapper">
        <h1 id="donate-now" class="donate-heading">Donate Now</h1>
        <Row>
          <Col lg={4} md={6} className="donate-box">
            <DonateCardComponent
              closeLogin={closeLogin}
              handleShowLogin={handleShowLogin}
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
          <Col lg={4} md={6} className="donate-box">
            <DonateCardComponent
              closeLogin={closeLogin}
              handleShowLogin={handleShowLogin}
              isLogin={isLogin}
              image={DonateImage_2}
              progress={40}
              total={"Rp 25.000.000"}
              title={"Empowering Communities Ending Poverty"}
              desc={
                "Some quick example text to build on the card title and make up the bulk of the card's content."
              }
            />
          </Col>
          <Col lg={4} md={6} className="donate-box">
            <DonateCardComponent
              closeLogin={closeLogin}
              handleShowLogin={handleShowLogin}
              isLogin={isLogin}
              image={DonateImage_3}
              progress={80}
              total={"Rp 60.000.000"}
              title={"Please our brothers in flores"}
              desc={
                "Some quick example text to build on the card title and make up the bulk of the card's content."
              }
            />
          </Col>
        </Row>
      </Container>
      <LoginModalComponent closeLogin={closeLogin} showLogin={showLogin} handleCloseLogin={handleCloseLogin}/>
    </>
  );
}

export default Homepage;
