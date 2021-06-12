import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";

function LibroComponent(props) {
    const default_img = "https://hackr.io/blog/media/1570190914QbX1K3UnuL.jpg";
    const api_img = `/libros/get_imgs/`;
    const api_src = "/imagenes/";
    const api_delete = "/libros/";


    let [imagenesId, setImagenesId] = useState([])
    let [imagenes_src, setImagenesSrc] = useState([])
    

    useEffect(() => {
        axios.get(api_img+props.isbn)
        .then( res=>{
            setImagenesId(res.data.imagenes)
        });

    }, [props.isbn])


    useEffect(() => {
        if(imagenesId !== null){
            if(imagenesId.length != 0){
                axios.get(api_src+imagenesId[0])
                .then( res=>{
                    setImagenesSrc(res.data)
                });
            }
        }
        
    }, [imagenesId])

    function eliminarLibro(isbn){
        axios.delete(api_delete+isbn)
            .then( res=>{
                console.log(res);
            });
    }

    return (
        
        <div>
            <Card className="my-2" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imagenes_src} />
                <Card.Body>
                    <Card.Title>{props.title} </Card.Title>
                    <Card.Text>
                        Isbn: {props.isbn}
                    </Card.Text>
                    <div className="d-flex flex-column">
                        <Link className="text-white d-block" to={`/libros/${props.isbn}`}><Button className="w-100" variant="primary">Más info</Button></Link>
                        <Button className="mt-3" variant="danger" onClick={(e) => eliminarLibro(props.isbn)}>Eliminar</Button>
                    </div>
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default LibroComponent

