import {useState} from 'react'
import {Button, ProgressBar, Container, Row, Col, } from "react-bootstrap";
import DonateModalComponent from './DonateModal'
import Donate1 from "../assets/donate-1.png"


function DonateInfoComponet() {
    const [showDonate, setShowDonate] = useState(false)

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
                <Col  lg={6}>
                    <img className="donate-info-photo" alt="donate-img" src={Donate1} ></img>
                </Col>
                <Col className="ml-4 pr-5" lg={5}>
                    <h1 className="profile-heading">The Strength of a People. Power of Community</h1>
                    <div className="donate-info-collected">
                        <p className="donate-total">Rp 25.000.000 <span className="ml-7 fs-6 text-muted">gathered from </span><span className="ml-7 donate-total text-muted">Rp 200.000.000</span></p>
                        <ProgressBar className="donate-info-progress" variant="danger" now={60} />
                        <div className="mt-3">
                        <p className="donate-info-detail d-inline">200 <span className="fs-6 text-muted mr-5">Donation</span></p>
                        <p className="ml-40 donate-info-detail d-inline-block">150 <span className="fs-6 text-muted text-right">More Day</span></p>
                        </div>
                    </div>
                    <p className="donate-info-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <Button onClick={handleShowDonate} className="donate-btn w-100">Donate</Button>
                </Col>
            </Row>
        </Container>

        <DonateModalComponent showDonate={showDonate} handleCloseDonate={handleCloseDonate}/>
      </>
    )
}

export default DonateInfoComponet