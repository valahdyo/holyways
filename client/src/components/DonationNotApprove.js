import {useState} from 'react'
import { Button, Container, Row, Col } from "react-bootstrap";
import ApproveModalComponent from './ApproveModal';

function DonationNotApproveComponent() {
  const [showDonate, setShowDonate] = useState(false)

    const handleShowDonate = () => {
        setShowDonate(true)
    }

    const handleCloseDonate = () => {
        setShowDonate(false)
    }

  return (
    <>
    <Container>
      <h1 className="profile-heading pt-5 mb-4">
        Donation has not been approved (10)
      </h1>
      <Row className='justify-content-center'>
        <Col lg={12}>
          <div className="d-flex justify-content-between donation-box mb-4 pt-4 pl-4">
            <div className="w-50">
              <h3 className="donation-heading">Zain</h3>
              <p className="donation-date">
                <strong style={{ fontWeight: 900 }}>Saturday, </strong>12 April
                2021
              </p>
              <p className="donation-total">Total : Rp. 45.000</p>
            </div>
            <div className="align-self-center">
              <Button onClick={handleShowDonate} className="donate-btn" variant="primary">
                View
              </Button>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className="d-flex justify-content-between donation-box mb-4 pt-4 pl-4">
            <div className="w-50">
              <h3 className="donation-heading">Malik</h3>
              <p className="donation-date">
                <strong style={{ fontWeight: 900 }}>Saturday, </strong>12 April
                2021
              </p>
              <p className="donation-total">Total : Rp. 45.000</p>
            </div>
            <div className="align-self-center">
              <Button onClick={handleShowDonate} className="donate-btn" variant="primary">
                View
              </Button>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className="d-flex justify-content-between donation-box mb-4 pt-4 pl-4">
            <div className="w-50">
              <h3 className="donation-heading">Hahiha</h3>
              <p className="donation-date">
                <strong style={{ fontWeight: 900 }}>Saturday, </strong>12 April
                2021
              </p>
              <p className="donation-total">Total : Rp. 45.000</p>
            </div>
            <div className="align-self-center">
              <Button onClick={handleShowDonate} className="donate-btn" variant="primary">
                View
              </Button>
            </div>
          </div>
        </Col>
        <p className="donate-info-desc">Load More</p>
      </Row>
    </Container>
    <ApproveModalComponent showDonate={showDonate} handleCloseDonate={handleCloseDonate} />
    </>
  );
}

export default DonationNotApproveComponent;
