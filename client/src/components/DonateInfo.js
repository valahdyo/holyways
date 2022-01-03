import { useState } from "react"
import { Button, ProgressBar, Container, Row, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import DonateModalComponent from "./DonateModal"
import Donate1 from "../assets/donate-1.png"
import convertRupiah from "rupiah-format"

function DonateInfoComponet({ fund, refetch, total }) {
  let history = useHistory()
  const [showDonate, setShowDonate] = useState(false)

  const getDays = (date1, date2) => {
    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000
    console.log(date1, date2)

    const diffInMilliseconds = Math.abs(
      new Date(date1).getTime() - new Date(date2).getTime()
    )
    const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS
    return parseInt(diffInDays)
  }

  const handleShowDonate = () => {
    setShowDonate(true)
  }

  const handleCloseDonate = () => {
    setShowDonate(false)
  }

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
              <div className="donate-total d-flex justify-content-between">
                <p>{convertRupiah.convert(total.money)} </p>
                <span className="pt-1 fs-6 text-muted">gathered from</span>
                <span className="donate-total text-muted">
                  {convertRupiah.convert(fund?.goal)}
                </span>
              </div>
              <ProgressBar
                className="donate-info-progress w-90"
                variant="danger"
                now={(total.money / fund?.goal) * 100}
              />
              <div className="mt-3 d-flex justify-content-between">
                <p className="donate-info-detail">
                  {total.transaction}{" "}
                  <span className="fs-6 text-muted">Donation</span>
                </p>
                <p className="donate-info-detail">
                  {getDays(fund?.targetDate, new Date().toISOString())}
                  <span className="ml-1 fs-6 text-muted text-right">
                    More Day
                  </span>
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
  )
}

export default DonateInfoComponet
