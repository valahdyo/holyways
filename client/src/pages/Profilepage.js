import { API } from "../config/api";
import {useQuery} from "react-query"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import NavbarComponent from "../components/Navbar";
import { Button, Container, Row, Col } from "react-bootstrap";
import ProfilePhoto from "../assets/profile-photo.png";


function Profilepage() {
  const [state] = useContext(AuthContext)

  let {data: profile} = useQuery("profileCache", async () => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    const response = await API.get("/user/" + state.user.id)
    return response.data.data.user
  })
  console.log(profile)
  return (
    <>
      <NavbarComponent />
      <Container fluid className="profile-wrapper">
        <Row>
          <Col lg={6}>
            <h1 className="profile-heading">My Profile</h1>
            <Row>
              <Col style={{flexGrow: 0}}>
                <img src={ProfilePhoto} alt="profile" />
              </Col>
              <Col>
                <div className="profile-detail-wrapper">
                  <div className="profile-detail-info">
                    <p className="profile-detail-heading">Full Name</p>
                    <p className="profile-detail-content">{profile?.fullName}</p>
                  </div>
                  <div className="profile-detail-info">
                    <p className="profile-detail-heading">Email</p>
                    <p className="profile-detail-content">{profile?.email}</p>
                  </div>
                  <div className="profile-detail-info">
                    <p className="profile-detail-heading">Phone</p>
                    <p className="profile-detail-content">0839727213912</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <h1 className="profile-heading">History Donation</h1>
            <Row>
              <Col>
                <div className="donation-box">
                  <h3 className="donation-heading">
                    The Strength of a People. Power of Community
                  </h3>
                  <p className="donation-date">
                    <strong style={{ fontWeight: 900 }}>Saturday, </strong>12
                    April 2021
                  </p>
                  <p className="donation-total">Total : Rp. 45.000</p>
                  <Button href="#" className="donation-status">
                    Finished
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profilepage;
