import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import LibroComponent from './LibroComponent';
import axios from 'axios';

function HomeComponent(props) { 

  const api_url = "/libros";
  const [libros, setLibros] = useState([])

  useEffect(() => {
    axios.get(api_url, {crossdomain:true})
      .then( res=>{
          console.log(res)
          setLibros(res.data)
      })
      .catch( err =>{
          console.log(err)
    })
  }, [libros])

  //console.log(libros);
  return (
      <Container className="mt-5">
          <Row>
              <Col><h1>Todos los libros: </h1> </Col>
          </Row>
          <Row>
              {
                  libros.map((libro, index) => (
                  <Col key={index}>
                      <LibroComponent 
                          isbn={libro.isbn} 
                          title={libro.title} 
                          subtitle={libro.subtitle} 
                          author={libro.author} 
                          category={libro.category}
                          imagenes={libro.imagenes}
                      />
                  </Col>
                  ))
              }
          </Row>
      </Container>
  )
}

export default HomeComponent

