import React from 'react';
import {Modal, Form, Button} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

class MovieForm extends React.Component{

state = {movie: {id: 0, title: "", summary: "", release_year: "", file: ""}, editing: false, modalOpen: false}

  handleChange = (propertyName) => (event) => {
    const { movie } = this.state
    const newMovie = {
      ...movie,
      [propertyName]: event.target.value
    };
    this.setState({ movie: newMovie })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {movie} = this.state
    let data = new FormData()
    const{title, file, summary, release_year} = movie
    data.append('title', title)
    data.append('summary', summary)
    data.append('release_year', release_year)
    debugger
    if (file)
      data.append('poster', file)
    if (this.state.editing === false)
      this.props.addMovie(data)
    else
      this.props.updateMovie(this.state.movie.id, data)    
    
    this.setState({movie: {id:0, title: "", summary: "", release_year: "", file: ""}, modalOpen: false})
  }

  handleOpen = () => {
  if (this.props.editing){
    this.setState({movie: this.props.movie, editing: true})
  }
    this.setState({ modalOpen: true })
  }

  onDrop = (files) => {
    const {movie} = this.state 
    const newMovie = {
      ...movie,
      file: files[0]
    };
    this.setState({ movie: newMovie })
  }

  render(){
    const {movie} = this.state 
    const {editing} = this.props
    return(
      <Modal
      trigger={editing ?  <Button color="yellow" inverted size='tiny' onClick={this.handleOpen}>Edit</Button> :
      <Button primary onClick={this.handleOpen}>Add New Movie</Button>  }
      open={this.state.modalOpen}
    >
      <Modal.Header>
        {editing ? "Edit Movie" : "Add A Movie"}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              required
              label="Title"
              value={movie.title}
              onChange={this.handleChange("title")}
              width={12}
            />
            <Form.Input
              required
              label="Release Year"
              value={movie.release_year}
              onChange={this.handleChange("release_year")}
              width={4}
            />
          </Form.Group>
          <Form.TextArea label="Summary" 
          value={movie.summary}
           onChange={this.handleChange("summary")} 
           placeholder="Add a description..." 
          />
          <Dropzone
            style = {{
              marginBottom: '10px',
              border: 'dashed 1px black',
              width: '100%',
              height: '50px',
              textAlign: 'center'
            }}
            onDrop={this.onDrop}
            multiple={false}
          >
            Add the movie poster here!
          </Dropzone>
          <Form.Button color='green' inverted>
          {editing ? "Save" : "Submit"}
        </Form.Button>
        </Form>
        <Button color='red' inverted onClick={() => {this.setState({modalOpen: false})}}>
          Cancel
        </Button>
      </Modal.Content>
    </Modal>
    )
  }
}


export default MovieForm