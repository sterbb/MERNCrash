import React, { ReactNode } from 'react'

import {Container, Row, Col} from 'react-bootstrap'

interface Props{
    children:ReactNode;
}

const FormContainer = ({children}: Props) => {
  return (
    <Container fluid className="p-0">
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={6} className="card p-5">
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer