import { useRef } from "react"
import {Modal, Form, Button, Row, Col, } from "react-bootstrap";

import IconAttach from "../assets/icon-attach-payment.png"

function DonateModalComponent(props) {
  
  const inputRef = useRef()
  const handleUpload = () => {
    inputRef.current?.click()
  }

    const {showDonate, handleCloseDonate} = props
    return (
        <Modal show={showDonate} onHide={handleCloseDonate} contentClassName="w-100 m-auto">
        <Modal.Body>
          <Row className="d-flex justify-content-center">
            <Col lg="11">
              <Form /*onSubmit={handleOnSubmit}*/>
                <Form.Group className="mt-3 mb-3" controlId="formNominalDonation">
                  <Form.Control
                    className="form-color"
                    // onChange={handleOnChange}
                    // value={state.fullname}
                    name="fullname"
                    size="sm"
                    type="text"
                    placeholder="Nominal Donation"
                  />
                </Form.Group>
                <div className="d-flex justify-content-between mb-5">
                <input ref={inputRef} className="d-none" type="file"></input><Button
                  onClick={handleUpload}
                  className="attach-btn"
                  style={{ width: "40%" }}
                >
                  Attach Payment <img className="ml-2 mb-1" src={IconAttach} alt="attach"/>
                </Button><p className='mt-2 align-self-center text-muted text-tnr'>*transfers can be made to holyways accounts</p></div>
                <Button
                  onClick={handleCloseDonate}
                  className="attach-donate-btn mb-3"
                  style={{ width: "100%" }}
                >
                  Donate
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    )
}

export default DonateModalComponent