import { useHistory } from "react-router-dom"
import { Card, ProgressBar, Button } from "react-bootstrap"

import convertRupiah from "rupiah-format"

function DonateCardComponent(props) {
  const {
    image,
    title,
    total,
    desc,
    progress,
    isLogin,
    handleShowLogin,
    id,
    btn,
  } = props

  const history = useHistory()
  const handleDonate = () => {
    history.push("/fund/" + id)
  }
  return (
    <Card>
      <Card.Img variant="top" src={image} className="donate-card-img" />
      <Card.Body>
        <Card.Title className="donate-title">{title}</Card.Title>
        <Card.Text className="donate-desc">{desc}</Card.Text>
        <ProgressBar
          className="donate-progress"
          variant="danger"
          now={progress}
        />
        <div className="donate-box-bottom">
          <p className="donate-collected">{convertRupiah.convert(total)}</p>
          <Button
            onClick={isLogin === "true" ? handleDonate : handleShowLogin}
            className="donate-btn"
            variant="primary"
          >
            {btn ? btn : "Donate"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default DonateCardComponent
