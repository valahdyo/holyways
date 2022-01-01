import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { AuthContext } from "../context/AuthContext";
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
  const [state] = useContext(AuthContext)

  const handleRaisefund = () => history.push('/formfund')

  let {data: fundlist} = useQuery("fundListCache", async () => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    const response = await API.get("/user/fund/" + state.user.id)
    return response?.data.data.user.userFund
  })

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
          
          {/* <DonateCardComponent
              isLogin={isLogin}
              image={DonateImage_1}
              title={"The Strength of a People. Power of Community"}
              desc={
                "Some quick example text to build on the card title and make up the bulk of the card's content."
              }
              total={"Rp 25.000.000"}
              progress={60}
            /> */}
            {fundlist?.map((item, index) => {
              return <><Col lg={4} className="donate-box pl-0 pt-0"> <DonateCardComponent
              id={item.id}
              isLogin={isLogin}
              image={item.thumbnail}
              title={item.title}
              desc={item.description}
              total={item.goal}
              progress={60}
            />
            </Col></>
            })}
        </Row>
      </Container>
    </>
  );
}

export default Raisefundpage;
