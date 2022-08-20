import React from "react";
import { json, checkStatus } from "./utils";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      id: props.imdvID,
    };
  }

  // api url is `https://www.omdbapi.com/?i=${this.props.id}&apikey=663da781`
  // api key is 663da781
  // using comonentDidMount() to fetch data from api, whatever I was doing before was not working

  componentDidMount() {
    fetch(
      `https://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=663da781`
    )
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        if (data.Response === "True") {
          this.setState({ movie: data });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  }

  render() {
    if (!this.state.movie) {
      return null;
    }

    const { Title, Year, Plot, Director, imdbRating, Poster } =
      this.state.movie;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-6">
            <h1>{Title}</h1>
            <ul className="list-unstyled">
              <li>
                <p>Year: {Year}</p>
              </li>
              <li>
                <p>Director: {Director}</p>
              </li>
              <li>
                <p>Plot: {Plot}</p>
              </li>
              <li>
                <p>imdbRating: {imdbRating} / 10</p>
              </li>
            </ul>
          </div>
          <div className="col-6">
            <img src={Poster} alt={""} className="img-fluid" />
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;