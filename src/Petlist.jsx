import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import './petlist.css';

class Petlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: [],
      pseudo: '',
      breed: '',
    }
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  render() {
    return (
      <div>
        <Container className="form-container">
          <Row>
            <Col lg="4">
              <Form>
                <FormGroup>
                  <Input
                    type="text"
                    name="pseudo"
                    id="examplepseudo"
                    value={this.state.pseudo}
                    onChange={this.changeInput}
                    placeholder="Pseudo"
                    required
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Input
                  type="text"
                  name="breed"
                  id="examplebreed"
                  value={this.state.breed}
                  onChange={this.changeInput}
                  placeholder="Breed"
                  required
                />
              </FormGroup>
            </Col>
            <Col lg="2">
              <Button>ADD PET</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Petlist;