import { useState } from "react";
import { Button, ProgressBar, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import DonateModalComponent from "./DonateModal";
import Donate1 from "../assets/donate-1.png";
import convertRupiah from "rupiah-format";

function DonateInfoComponet({ fund, refetch, total }) {
  let history = useHistory();
  const [showDonate, setShowDonate] = useState(false);

  const handleShowDonate = () => {
    setShowDonate(true);
  };

  const handleCloseDonate = () => {
    setShowDonate(false);
  };

  return (
    <>
      <Container className="donate-info-wrapper">
        <Row>
          <Col lg={6}>
            <img
              className="donate-info-photo"
              alt="donate-img"
              src={fund?.thumbnail}
            ></img>
          </Col>
          <Col className="ml-4 pr-5" lg={5}>
            <h1 className="profile-heading">{fund?.title}</h1>
            <div className="donate-info-collected">
              <p className="donate-total">
                {convertRupiah.convert(total.money)}{" "}
                <span className="ml-7 fs-6 text-muted">gathered from </span>
                <span className="ml-2 donate-total text-muted">
                  {convertRupiah.convert(fund?.goal)}
                </span>
              </p>
              <ProgressBar
                className="donate-info-progress"
                variant="danger"
                now={(total.money / fund?.goal) * 100}
              />
              <div className="mt-3">
                <p className="donate-info-detail d-inline">
                  {total.transaction}{" "}
                  <span className="fs-6 text-muted mr-5">Donation</span>
                </p>
                <p className="ml-50 donate-info-detail d-inline-block">
                  150{" "}
                  <span className="fs-6 text-muted text-right">More Day</span>
                </p>
              </div>
            </div>
            <p className="donate-info-desc">{fund?.description}</p>
            <Button onClick={handleShowDonate} className="donate-btn w-100">
              Donate
            </Button>
          </Col>
        </Row>
      </Container>

      <DonateModalComponent
        fund={fund}
        showDonate={showDonate}
        handleCloseDonate={handleCloseDonate}
        refetch={refetch}
      />
    </>
  );
}

export default DonateInfoComponet;
