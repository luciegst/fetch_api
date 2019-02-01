import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import './petlist.css';

class Petlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      id: 500000,
      pseudo: '',
      breed: '',
    }
    this.changeInput = this.changeInput.bind(this);
    this.addPet = this.addPet.bind(this);
    this.deletePet = this.deletePet.bind(this);
  }

  //change form input//
  changeInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //fetch api//
  componentDidMount() {
    fetch(`https://api.yummypets.com/pets/`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          lists: data.collection,
        });
      });
  }

  //delete an element of the list//
  deletePet(id) {
    const newlist = this.state.lists.filter(item => item.resource.id !== id)
    this.setState({
      lists: newlist
    })
  }

  //add an element on the list//
  addPet() {
    this.setState({
      id: this.state.id + 1
    })
    const obj = {
      resource: {
        avatar: {
          thumb: "../../assets/petpaw.jpeg"
        },
        breed: {
          lib: this.state.breed
        },
        id: this.state.id,
        pseudo: this.state.pseudo
      }
    };
    this.setState({
      lists: [...this.state.lists, obj]
    })
  };

  render() {

    //limit the list of 10 items//
    //sort pseudos alphabetically from A to Z//
    const listsfilter = this.state.lists.slice(-10).sort((a,b) => a.resource.pseudo.localeCompare(b.resource.pseudo))
    return (
      <div>
        <Container className="form-container">
          <Row className="row-pet-list">
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
              <Button onClick={this.addPet}>ADD PET</Button>
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col>
              <ol className="list-container">
                {listsfilter.map(list => (
                  <li key={list.resource.id} className="list-of-pets">
                    <img src={list.resource.avatar.thumb} alt="thumb" width="40px" className="thumb" />
                    <span className="pseudo mr-3">{list.resource.pseudo}</span>
                    <span className="breed">{list.resource.breed.lib}</span>
                    <button className="button-list " onClick={() => this.deletePet(list.resource.id)}>Delete</button>
                  </li>
                ))}
              </ol>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Petlist;