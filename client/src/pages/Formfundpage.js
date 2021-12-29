import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavbarComponent from "../components/Navbar";

function Formfundpage() {
  let history = useHistory()
  const handlePublishFund = () => history.push('/raisefund')

  const inputRef = useRef()
  const handleUpload = () => {
    inputRef.current?.click();
  };
  
  return (
    <>
      <NavbarComponent />
      <Container>
      <div className="profile-heading text-left h3 mt-5 mb-5">Make Raise Fund</div>
        <Row className="d-flex justify-content-left">
          <Col lg="11">
            <Form /*onSubmit={handleOnSubmit}*/>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Control className="form-color"
                  // onChange={handleOnChange}
                  // value={state.fullname}
                  name="fullname"
                  size="sm"
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <input ref={inputRef} className="d-none" type="file" />
              <Button onClick={handleUpload} className="donate-btn mb-3" style={{width: "15%"}}>Attach Thumbnail</Button>
              <Form.Group className="mb-3" controlId="formBasicGoals">
                <Form.Control className="form-color"
                  // onChange={handleOnChange}
                  // value={state.email}
                  name="email"
                  size="sm"
                  type="email"
                  placeholder="Goals Donation"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Control className="form-color"
                  // onChange={handleOnChange}
                  // value={state.password}
                  as="textarea"
                  rows={6}
                  name="password"
                  size="sm"
                  type="password"
                  placeholder="Description"
                />
              </Form.Group>

              <Button onClick={handlePublishFund} style={{marginLeft:"75%"}} className="mt-5 donate-btn w-25" type="submit" size="sm">
                Public Fundraising
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Formfundpage;
