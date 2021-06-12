import React, { Component } from 'react'
import axios from 'axios';
import { Col, Container, Row, Button } from 'react-bootstrap';

export default class LibroInfoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isbn: this.props.match.params.isbn,
            author: '',
            title: '',
            subtitle: '',
            published: '',
            publisher: '',
            pages: '',
            website: '',
            category: '',
            description: '',
            imagenesID: [],
            imagenesSrc: [],
            img_insert: '',
            img_file: null
        }
    }


    componentDidMount(){
        const api_img = `/libros/get_imgs/`;
        const api_src = "/imagenes/";
        const api_delete = "/libros/";

        axios.get("/libros/"+this.state.isbn)
        .then( res=>{
            this.setState(res.data);
            //console.log(res.data);
        });
        axios.get(api_img+this.state.isbn)
        .then( res=>{
            this.setState(prevState => ({
                imagenesID: res.data.imagenes
            }));
            
        }).finally( () =>{
            if(this.state.imagenesID !== null){
                if(this.state.imagenesID.length !== 0){
                    for (let index = 0; index < this.state.imagenesID.length; index++) {
                        axios.get(api_src+this.state.imagenesID[index])
                    .then( res=>{
                        // this.setState(prevState => ({
                        //     imagenesSrc: res.data
                        // }));
                        this.setState({ imagenesSrc: [...this.state.imagenesSrc, res.data] }) 
                    });
                        
                    }
                    
                }
            }
        });
    }
   
    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value, img_file: e.target.files[0]});
    }

    submitHandler = e => {
        e.preventDefault();

        let img = this.state.img_file;
        let isbn = this.state.isbn;
        var bodyFormData = new FormData();
        bodyFormData.append('isbn', isbn);
        bodyFormData.append('file', img);

        let url = "/imagenes";

        const options = {
            method: 'POST',
            headers: {  'Content-Type': 'multipart/form-data',"Access-Control-Allow-Origin": "*", },
            data: bodyFormData,
            url,
            };
        axios(options);
    }
    
    

    render() {
        
        return (
            <div>
                
                <Container>
                    <Row>
                        <Col xs={6} className="text-left mt-5">
                            <h2 className=" mb-3">Información completa del libro</h2>
                            <h5>Title: {this.state.title}</h5>
                            <span className="d-block">Subtitle: {this.state.subtitle}</span>
                            <span className="d-block">Author: {this.state.author}</span>
                            <span className="d-block">Isbn: {this.state.isbn}</span>
                            <span className="d-block">Published: </span>
                            <span className="d-block">Publisher: {this.state.publisher}</span>
                            <span className="d-block">Pages: {this.state.pages}</span>
                            <span className="d-block">Website:<a href={`${this.state.website}`}>{this.state.website}</a></span>
                            <span className="d-block">Category: {this.state.category}</span>
                            <span className="d-block">Description: {this.state.description}</span>

                            <form className="mt-4" onSubmit={this.submitHandler}>
                                <h5>Insertar una nueva imagen: </h5>
                                <input name="img-insert" type="file" onChange={this.changeHandler}
                                />
                                <div className="d-block mt-4">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                                
                            </form>
                        </Col>

                        <Col xs={6} className="mt-5">
                            <Row>
                                <h2 className="w-100 d-block mb-3">Imagenes del libro</h2>
                                {
                                   this.state.imagenesSrc.map((img, index) => (
                                    <Col key={index}>
                                         <img className="mx-w-200" src={`../${img}`} />
                                    </Col>
                                    )) 
                                }       
                            </Row>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}
