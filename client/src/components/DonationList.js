import { Container, Row, Col } from "react-bootstrap";

function DonationListComponent() {
  return (
    <Container className="mt-5">
        <h1 className="profile-heading pt-5 mb-4">List Donation (200)</h1>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="donation-box mb-4 pt-4 pl-4">
            <h3 className="donation-heading">
              Andi
            </h3>
            <p className="donation-date">
              <strong style={{ fontWeight: 900 }}>Saturday, </strong>12 April
              2021
            </p>
            <p className="donation-total">Total : Rp. 45.000</p>
          </div>
        </Col>
        <Col lg={12}>
          <div className="donation-box mb-4 pt-4 pl-4">
            <h3 className="donation-heading">
              Udin
            </h3>
            <p className="donation-date">
              <strong style={{ fontWeight: 900 }}>Saturday, </strong>12 April
              2021
            </p>
            <p className="donation-total">Total : Rp. 45.000</p>
          </div>
        </Col>
        <Col lg={12}>
          <div className="donation-box mb-4 pt-4 pl-4">
            <h3 className="donation-heading">
              Jamal
            </h3>
            <p className="donation-date">
              <strong style={{ fontWeight: 900 }}>Saturday, </strong>12 April
              2021
            </p>
            <p className="donation-total">Total : Rp. 45.000</p>
          </div>
        </Col>
        <p className="donate-info-desc">Load More</p>
      </Row>
    </Container>
  );
}

export default DonationListComponent;
