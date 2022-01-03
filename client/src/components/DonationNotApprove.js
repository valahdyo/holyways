import { useState } from "react"
import { Button, Container, Row, Col } from "react-bootstrap"
import ApproveModalComponent from "./ApproveModal"

import convertRupiah from "rupiah-format"

function DonationNotApproveComponent({ list, refetch, total }) {
  const [showDonate, setShowDonate] = useState({
    showModal: false,
    data: null,
  })

  const handleShowDonate = (e, index) => {
    setShowDonate({ showModal: true, modalId: index })
  }

  const handleCloseDonate = (e, index) => {
    setShowDonate({ showModal: false, data: null })
  }

  return (
    <>
      <Container>
        <h1 className="profile-heading pt-5 mb-4">
          Donation has not been approved ({total.notApprove})
        </h1>
        <Row className="justify-content-center">
          {list?.map((item, index) => {
            if (item.status === "pending") {
              let date = new Date(item.createdAt)
              date = date.toDateString().split(" ")
              return (
                <>
                  <Col lg={12} key={index}>
                    <div className="d-flex justify-content-between donation-box mb-4 pt-4 pl-4">
                      <div className="w-50">
                        <h3 className="donation-heading">
                          {item.userDetail.fullName}
                        </h3>
                        <p className="donation-date">
                          <strong style={{ fontWeight: 900 }}>
                            {date[0]},{" "}
                          </strong>
                          {date[1]} {date[2]} {date[3]}
                        </p>
                        <p className="donation-total">
                          Total: {convertRupiah.convert(item.donateAmount)}
                        </p>
                      </div>
                      <div className="align-self-center">
                        <Button
                          onClick={() =>
                            setShowDonate({ showModal: true, data: item })
                          }
                          className="donate-btn"
                          variant="primary"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </Col>
                </>
              )
            }
          })}
          {total?.transaction > 3 ? (
            <p className="donate-info-desc">Load More</p>
          ) : (
            ""
          )}
        </Row>
      </Container>
      <ApproveModalComponent
        showDonate={showDonate.showModal}
        handleCloseDonate={handleCloseDonate}
        userDonate={showDonate.data}
        refetch={refetch}
      />
    </>
  )
}

export default DonationNotApproveComponent
