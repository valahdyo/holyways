import { Container, Row, Col } from "react-bootstrap";

import convertRupiah from "rupiah-format";

function DonationListComponent({ list, total }) {
  return (
    <Container className="mt-5">
      <h1 className="profile-heading pt-5 mb-4">
        List Donation ({total.transaction})
      </h1>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="donation-box mb-4 pt-4 pl-4">
            <h3 className="donation-heading">Andi</h3>
            <p className="donation-date">
              <strong style={{ fontWeight: 900 }}>Saturday, </strong>12 April
              2021
            </p>
            <p className="donation-total">Total : Rp. 45.000</p>
          </div>
        </Col>
        {list?.map((item, index) => {
          if (item.status === "success") {
            let date = new Date(item.createdAt);
            date = date.toDateString().split(" ");
            return (
              <>
                <Col lg={12}>
                  <div className="donation-box mb-4 pt-4 pl-4">
                    <h3 className="donation-heading">
                      {item.userDetail.fullName}
                    </h3>
                    <p className="donation-date">
                      <strong style={{ fontWeight: 900 }}>{date[0]}, </strong>
                      {date[1]} {date[2]} {date[3]}
                    </p>
                    <p className="donation-total">
                      Total : {convertRupiah.convert(item.donateAmount)}
                    </p>
                  </div>
                </Col>
              </>
            );
          }
        })}
        <p className="donate-info-desc">Load More</p>
      </Row>
    </Container>
  );
}

export default DonationListComponent;
