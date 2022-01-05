import { useState, useRef } from "react"
import {
  Button,
  ProgressBar,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap"
import DatePicker from "react-datepicker"
import { useHistory } from "react-router-dom"
import { useContext } from "react"
import { useMutation } from "react-query"
import { API } from "../config/api"
import { AuthContext } from "../context/AuthContext"

import DonateModalComponent from "./DonateModal"
import Donate1 from "../assets/donate-1.png"
import convertRupiah from "rupiah-format"

function DonateInfoComponet({ fund, refetch, total }) {
  let history = useHistory()
  const [state] = useContext(AuthContext)
  const [showDonate, setShowDonate] = useState(false)

  const getDays = (date1, date2) => {
    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000

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

  //Edit Fund//
  const [editFund, setEditFund] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState(null)
  const [message, setMessage] = useState(null)
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    goal: "",
    description: "",
  })

  const { title, goal, description } = form

  const inputRef = useRef(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })
    if (e.target.type === "file") {
      if (inputRef.current?.files) {
        setUploadedFileName(inputRef.current.files[0].name)
        let url = URL.createObjectURL(e.target.files[0])
        setPreview(url)
      }
    }
  }
  const handleUploadImage = () => {
    inputRef.current?.click()
  }

  const resetFile = () => {
    setUploadedFileName(null)
    inputRef.current.file = null
    form.thumbnail = ""
  }

  const handleChangeDate = (date) => {
    setStartDate(date)
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData()
      if (form.thumbnail[0]) {
        formData.set("thumbnail", form?.thumbnail[0], form.thumbnail[0]?.name)
      }
      form.title.length !== 0 && formData.set("title", form.title)
      form.goal.length !== 0 && formData.set("goal", form.goal)
      form.description.length !== 0 &&
        formData.set("description", form.description)
      form.startDate &&
        formData.set("targetDate", new Date(startDate).toISOString())

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      const response = await API.patch("/fund/" + fund?.id, formData, config)
      setEditFund(false)
      setMessage(null)
      refetch()
      history.push("/fund/" + fund.id)
    } catch (error) {
      console.log(error)
      const alert = (
        <Alert variant="danger" className="py-1">
          Cannot Update Fund Detail
        </Alert>
      )
      setMessage(alert)
    }
  })

  return (
    <>
      <Container className="donate-info-wrapper">
        <Row>
          <Col className="ml-4 pr-5" lg={6}>
            <img
              className="donate-info-photo"
              alt="donate-img"
              src={fund?.thumbnail}
            ></img>
          </Col>

          {editFund && (
            <Col lg={5}>
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
                    placeholder={fund?.title}
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
                    style={{ width: "50%" }}
                  >
                    Edit Thumbnail
                  </Button>
                  {uploadedFileName && (
                    <>
                      <button
                        onClick={resetFile}
                        type="button"
                        class="close float-none ml-3"
                        aria-label=""
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <span className="ml-2">{uploadedFileName}</span>
                    </>
                  )}
                </div>
                <Form.Group className="mb-3" controlId="formBasicGoals">
                  <Row>
                    <Col lg={6}>
                      <Form.Control
                        className="form-color"
                        onChange={handleChange}
                        value={goal}
                        name="goal"
                        size="sm"
                        type="number"
                        placeholder={fund?.goal}
                      />
                    </Col>

                    <Col lg={4}>
                      <DatePicker
                        selected={startDate}
                        onChange={handleChangeDate}
                        dateFormat="yyyy/MM/dd"
                        isClearable
                        className="form-color form-control-sm form-control"
                        minDate={new Date()}
                        placeholderText={new Date(
                          fund?.targetDate
                        ).toLocaleString()}
                      />
                    </Col>
                  </Row>
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
                    placeholder={fund?.description}
                  />
                </Form.Group>

                <Button
                  onClick={(e) => handleSubmit.mutate(e)}
                  // style={{ marginLeft: "75%" }}
                  className="mt-5 donate-btn w-100"
                  type="submit"
                  size="sm"
                >
                  Edit Fund
                </Button>
              </Form>
            </Col>
          )}

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
            {fund?.idUser === state.user.id ? (
              <div className="d-flex justify-content-between">
                <Button
                  onClick={() => {
                    setEditFund(true)
                  }}
                  className="donate-btn w-45"
                >
                  Edit Fund
                </Button>
                <Button onClick={handleShowDonate} className="donate-btn w-45">
                  Donate
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <Button onClick={handleShowDonate} className="donate-btn w-45">
                  Donate
                </Button>
                <Button
                  onClick={() => history.push("/chat/" + fund?.id)}
                  className="donate-btn w-45"
                >
                  Chat Fundraiser
                </Button>
              </div>
            )}
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
