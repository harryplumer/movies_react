import React from 'react'
import {Item, Button} from 'semantic-ui-react'
import MovieForm from './MovieForm'

class Movie extends React.Component{

  render(){
    const {movie} = this.props
    return(
      <Item>
        <Item.Image size='tiny' src={movie.img_url} />
        <Item.Content>
          <Item.Header as='h3'>{movie.title} ({movie.release_year})</Item.Header>
          <Item.Description>
            {movie.summary}
          </Item.Description>
          <Item.Extra>
            <MovieForm 
              movie = {movie}
              updateMovie = {this.props.updateMovie}
              editing = {true}
            />
            <Button size='tiny' color='red' inverted onClick={() => this.props.destroyMovie(movie.id)}>Delete</Button>
          </Item.Extra>
      </Item.Content>
    </Item>
    )

  }

}

export default Movie