import { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useHistory } from "react-router-dom";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";

import IconAttach from "../assets/icon-attach-payment.png";

function DonateModalComponent(props) {
  let history = useHistory();
  const { showDonate, handleCloseDonate, fund, refetch } = props;
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    donateAmount: "",
    proofAttachment: "",
  });

  const inputRef = useRef();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      inputRef.current?.files &&
        setUploadedFileName(inputRef.current.files[0].name);
    }
  };

  const resetFile = () => {
    setUploadedFileName(null);
    inputRef.current.file = null;
    form.proofAttachment = "";
  };

  const handleUploadImage = () => {
    inputRef.current?.click();
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (!form.proofAttachment[0]) {
        console.log("error");
        throw new Error("Please provide your proof");
      }
      formData.set(
        "proofAttachment",
        form?.proofAttachment[0],
        form.proofAttachment[0]?.name
      );
      formData.set("donateAmount", form.donateAmount);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      console.log(form);
      const response = await API.post(
        "/transaction/" + fund.id,
        formData,
        config
      );

      handleCloseDonate();
      refetch();
    } catch (error) {
      console.log(error);
      const alert = (
        <Alert variant="danger" className="py-1">
          {error.message}
        </Alert>
      );
      setMessage(alert);
    }
  });

  return (
    <Modal
      show={showDonate}
      onHide={handleCloseDonate}
      contentClassName="w-100 m-auto"
    >
      <Modal.Body>
        {true && message}
        <Row className="d-flex justify-content-center">
          <Col lg="11">
            <Form /*onSubmit={handleOnSubmit}*/>
              <Form.Group className="mt-3 mb-3" controlId="formNominalDonation">
                <Form.Control
                  className="form-color"
                  onChange={handleChange}
                  value={form.donateAmount}
                  name="donateAmount"
                  size="sm"
                  type="number"
                  placeholder="Nominal Donation"
                />
              </Form.Group>
              <div className="mb-5">
                <input
                  ref={inputRef}
                  name="proofAttachment"
                  onChange={handleChange}
                  className="d-none"
                  type="file"
                ></input>
                <Button
                  onClick={handleUploadImage}
                  className="attach-btn"
                  style={{ width: "40%" }}
                >
                  Attach Payment{" "}
                  <img className="ml-2 mb-1" src={IconAttach} alt="attach" />
                </Button>
                {uploadedFileName ? (
                  <>
                    <button
                      onClick={resetFile}
                      type="button "
                      class="close float-none ml-3 mr-2"
                      aria-label=""
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <span className="">{uploadedFileName}</span>
                  </>
                ) : (
                  <p className="mt-2 d-inline ml-2 text-muted text-tnr">
                    *transfers can be made to holyways accounts
                  </p>
                )}
              </div>
              <Button
                onClick={(e) => handleSubmit.mutate(e)}
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
  );
}

export default DonateModalComponent;
