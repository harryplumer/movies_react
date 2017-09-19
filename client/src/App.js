import React, { Component } from 'react';
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'
import axios from 'axios'
import {Container, Grid, Header} from 'semantic-ui-react'

class App extends Component {
state = {movies: []}

componentDidMount(){
  axios.get('api/movies')
    .then( res => this.setState({movies: res.data}))
}

addMovie = (data) => { 
  axios.post('/api/movies', data)
    .then( res => this.setState({ movies: res.data }) )
}

destroyMovie = (id) => {
  axios.delete(`/api/movies/${id}`)
  .then( () => {
    const { movies } = this.state
    this.setState({ movies: movies.filter( t => t.id !== id ) })
  })
}

updateMovie = (id, data) => {
  axios.put(`api/movies/${id}`, data)
  .then( res => this.setState({ movies: res.data }) )
}
  
  render() {
    return (
       <Container>
        <Grid centered columns={2}>
          <Grid.Column>
            <Header as="h1" textAlign="center">Hank's Movie Site <br />
            <MovieForm addMovie={this.addMovie} /></Header>
            
            <MovieList destroyMovie={this.destroyMovie} 
            addMovie={this.addMovie}
            updateMovie={this.updateMovie}
            movies = {this.state.movies}
          />
          </Grid.Column>
        </Grid>
       </Container>
    )
  }
}

export default App;
