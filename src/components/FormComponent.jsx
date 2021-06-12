import React, { Component } from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios';

export class FormComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isbn: '',
            author: '',
            title: '',
            subtitle: '',
            published: '',
            publisher: '',
            pages: '',
            website: '',
            category: '',
            description: ''
        }
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = e => {
        e.preventDefault();
        //console.log(this.state);

        let url = "/libros";

        const options = {
            method: 'POST',
            headers: {  'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*", },
            data: this.state,
            url,
            };
        axios(options);
        
    }

    render() {
        const { isbn, author, title, subtitle, published, publisher, pages, website, category, description } = this.state
        return (
            <div>
                <h2 className="my-5">Formulario para insertar un nuevo libro:</h2>
                <Form onSubmit={this.submitHandler}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formIsbn">
                                <Form.Control type="text" placeholder="Isbn" name="isbn" onChange={this.changeHandler} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formAuthor">
                                <Form.Control type="text" placeholder="Author"  name="author" onChange={this.changeHandler}  />
                            </Form.Group>
                            
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formTitle">
                                <Form.Control type="text" placeholder="Title"  name="title" onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formSubtitle">
                                <Form.Control type="text" placeholder="Subtitle" name="subtitle" onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Form.Group controlId="formPublished">
                                <Form.Control type="date" placeholder="Published"  name="published" onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPublisher">
                                <Form.Control type="text" placeholder="Publisher"  name="publisher"  onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPages">
                                <Form.Control type="number" placeholder="Pages" name="pages" onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>

                    </Row>
                    
                    <Row>
                        <Col>
                            <Form.Group controlId="formWebsite">
                                <Form.Control type="textarea" placeholder="Website" name="website" onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Category">
                                <Form.Control type="textarea" placeholder="Category" name="category" onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>
                    </Row>
                   
                    <Row>
                        <Col>
                            <Form.Group controlId="formDescription">
                                <Form.Control as="textarea" rows={3} placeholder="Description" name="description" onChange={this.changeHandler}  />
                            </Form.Group>
                        </Col>
                    </Row>         

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default FormComponent
