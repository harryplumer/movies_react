class Api::MoviesController < ApplicationController
  before_action :get_movie, only: [:update, :destroy]
  
  def index
    render json: Movie.order(:title).to_json( only: [:id, :title, :summary, :release_year], methods: :img_url)
  end

  def create
    attrs = params.permit(:title, :summary, :release_year, :poster)
    movie = Movie.new(attrs)
    if movie.save
      render json: Movie.order(:title).to_json( only: [:id, :title, :summary, :release_year], methods: :img_url)
    else
      render_error(movie)
    end
  end

  def update
    if params[:poster] == nil
      attrs = params.permit(:id, :title, :summary, :release_year)
    else
      attrs = params.permit(:id, :title, :summary, :release_year, :poster)
    end 
    
    if @movie.update(attrs)
      render json: Movie.order(:title).to_json( only: [:id, :title, :summary, :release_year], methods: :img_url)
    else
      render_error(@movie)
    end
  end

  def destroy
    @movie.destroy
  end

  private
    def movie_params 
      params.require(:movie).permit(:title, :summary, :release_year, :poster)
    end

    def get_movie
      @movie = Movie.find(params[:id])
    end

    def render_error
      errors = movie.errors.full_messages.join(",")
      render json: {errors: errors}, status: 418
    end
end