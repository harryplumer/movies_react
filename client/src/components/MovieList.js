import React from 'react'
import {Item} from 'semantic-ui-react'
import Movie from './Movie'

class MovieList extends React.Component{
  state = {movies: []}

  render(){
    const moviesArr = this.props.movies.map(m => <Movie key={m.id} movie={m} 
    destroyMovie={this.props.destroyMovie} addMovie={this.props.addMovie} updateMovie={this.props.updateMovie} />)
    return(
      <Item.Group>
        {moviesArr}
      </Item.Group>
    )
  }

}

export default MovieList