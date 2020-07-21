import React, {useEffect, useState} from 'react'
import { Card, CardDeck, Container, Row, Col } from 'react-bootstrap'
import plant from '../../../public/assets/plant.png'
import plus from '../../../public/assets/plus.png'


export function CardTanaman(){

  const [datas, setDatas] = useState([
    {
      "name": "Mangga"
    },
    {
      "name": "Jeruk"
    },
    {
      "name": "Kelapa"
    },
  ])

  function onClick(){
    alert('hai')
  }

  function nambahin(){
    const newData = [...datas, {"name":"pepaya"}]
    setDatas(newData)
  }

  const cardImgStyle = {
    width: 200,
    height: 250,
    cursor: "pointer"
  }

  const cardPlusButton = {
    width:70,
    height:70,
    marginTop:120,
    marginBottom:55,
    cursor: "pointer"
  }

  const cardTitle ={
    fontFamily: "Pacifico",
    fontSize: 30
  }

  return(
    <>
    <Container>
      <Row>
        <div className="scrolling-wrapper row flex-row flex-nowrap pb-4" style={{marginTop:300}}>
        {datas.map((data, idx) => 
          <Col key={idx}>
            <Card.Img onClick={onClick} variant="top" src={plant} style={cardImgStyle}/>
            <Card.Body>
              <Card.Title style={cardTitle}>{data.name}</Card.Title>
            </Card.Body>
          </Col>
        )}
          
        <Col>
            <Card.Img onClick={nambahin} variant="top" src={plus} style={cardPlusButton}/>
        </Col>
          
        </div>

      </Row>
    </Container>

    </>
  )
}