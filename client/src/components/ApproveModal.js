import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import Struk from '../assets/struk.png'

function ApproveModalComponent(props) {
    const {showDonate, handleCloseDonate} = props

    return (
        <Modal show={showDonate} onHide={handleCloseDonate} contentClassName="w-100 m-auto">
        <Modal.Body>
          <Row className="d-flex justify-content-center">
            
            <Col lg="11">
            <h1 className="view-donate-heading">Zain</h1>
              <Form /*onSubmit={handleOnSubmit}*/>
                <Form.Group className="mt-3 mb-3" controlId="formNominalDonation">
                  <Form.Control
                    className="form-color"
                    // onChange={handleOnChange}
                    // value={state.fullname}
                    name="fullname"
                    size="sm"
                    type="text"
                    placeholder="45.000.000"
                  />
                </Form.Group>
                <img src={Struk} alt="struk"></img>               
                <Button
                  onClick={handleCloseDonate}
                  className="attach-donate-btn mt-3 mb-3"
                  style={{ width: "100%" }}
                >
                  Approve
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    )
}

export default ApproveModalComponent