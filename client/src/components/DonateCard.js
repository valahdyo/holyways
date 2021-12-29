import { useHistory } from 'react-router-dom'
import {Card, ProgressBar, Button} from 'react-bootstrap'


function DonateCardComponent(props) {
    const {image, title, total, desc, progress, isLogin, handleShowLogin} = props

    const history = useHistory()
    const handleDonate = () => {
      history.push('/donate')
    }
    return (

        <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title className="donate-title">
                  {title}
                </Card.Title>
                <Card.Text className="donate-desc">
                  {desc}
                </Card.Text>
                <ProgressBar className="donate-progress" variant="danger" now={progress} />
                <div className="donate-box-bottom">
                <p className="donate-collected">{total}</p>
                <Button onClick={isLogin === "true" ? handleDonate : handleShowLogin} className="donate-btn" variant="primary">Donate</Button>
                </div>
                
              </Card.Body>
            </Card>
    )
}

export default DonateCardComponent