import { useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query"
import { API } from "../config/api"
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert
} from "react-bootstrap";
import NavbarComponent from "../components/Navbar";

function Formfundpage() {
  let history = useHistory();

  const [state] = useContext(AuthContext)

  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [message, setMessage] = useState(null)
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    goal:"",
    description: ""
  });

  const {title, goal, description} = form

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
      if (e.target.type === "file") {
        inputRef.current?.files &&
        setUploadedFileName(inputRef.current.files[0].name);
      }
    }
  const handleUploadImage = () => {
    inputRef.current?.click();
  };
    
  const resetFile = () => {
    setUploadedFileName(null)
    inputRef.current.file = null
    form.thumbnail = ""
  }

  const handleSubmit = useMutation(async e => {
    try {
      e.preventDefault()

      const formData = new FormData()
      if (!form.thumbnail[0]) {
        console.log("error")
        throw new Error("Please upload the thumbnail")
      }
      formData.set("thumbnail", form?.thumbnail[0], form.thumbnail[0]?.name)
      formData.set("title", form.title)
      formData.set("goal", form.goal)
      formData.set("description", form.description)
      formData.set("idUser", state.user.id)

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
      console.log(form);
      const response = await API.post("/fund", formData, config)
      history.push("/raisefund")
    } catch (error) {
      console.log(error)
      const alert = (
        <Alert variant="danger" className="py-1">
          {error.message}
        </Alert>
      );
      setMessage(alert);
    }
  })

  return (
    <>
      <NavbarComponent />
      <Container>
        <div className="profile-heading text-left h3 mt-5 mb-5">
          Make Raise Fund
        </div>
        <Row className="d-flex justify-content-left">
          <Col lg="11">
          {true && message}
            <Form /*onSubmit={handleOnSubmit}*/>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Control
                  className="form-color"
                  onChange={handleChange}
                  value={title}
                  name="title"
                  size="sm"
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <div className="mb-3">
                <input
                  ref={inputRef}
                  onChange={handleChange}
                  name="thumbnail"
                  className="d-none"
                  type="file"
                />
                <Button
                  onClick={handleUploadImage}
                  className="donate-btn"
                  style={{ width: "15%" }}
                >
                  Attach Thumbnail
                </Button>
                {uploadedFileName ? <><button onClick={resetFile} type="button" class="close float-none ml-3" aria-label="">
                  <span aria-hidden="true">&times;</span>
                </button>
                <span className="ml-2">{uploadedFileName}</span></> : ""}
              </div>
              <Form.Group className="mb-3" controlId="formBasicGoals">
                <Form.Control
                  className="form-color"
                  onChange={handleChange}
                  value={goal}
                  name="goal"
                  size="sm"
                  type="number"
                  placeholder="Goals Donation"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Control
                  className="form-color"
                  onChange={handleChange}
                  value={description}
                  as="textarea"
                  rows={6}
                  name="description"
                  size="sm"
                  type="text"
                  placeholder="Description"
                />
              </Form.Group>

              <Button
                onClick={(e) => handleSubmit.mutate(e)}
                style={{ marginLeft: "75%" }}
                className="mt-5 donate-btn w-25"
                type="submit"
                size="sm"
              >
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
