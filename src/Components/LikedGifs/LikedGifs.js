import "./LikedGifs.css";
import uuidv1 from "uuid/v1";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { remove_gif } from "../../Actions/rootActionCreator"
import { NavLink } from "react-router-dom";

class AllLikedGifs extends Component {

  handleRemoveGif = (searchTerm) => {
    const { remove_gif } = this.props;
    remove_gif(searchTerm);
    this.forceUpdate();
  }

  render() {
    if (this.props.likedGifs.length < 5) {
      return (
        < div id="rightBackground" >
          <div id="likedGifGrid">
            {
              this.props.likedGifs.map(el => (
                <div key={uuidv1()}>
                  <div>
                    <p id="gifListTitle">Title: {el.gifTitle}</p>
                    <p id="gifListWeirdness">Weirdness: {el.gifWeirdness}</p>
                    <p>Search Term: {el.gifSearchTerm}</p>
                    <img alt="" src={el.gifURL} height={100} /></div>
                  <div>
                    <button onClick={() => this.handleRemoveGif(el.gifSearchTerm)} id="unlikeButton">X</button>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <p>You must <i>like</i> {5 - this.props.likedGifs.length} more gifs to calculate score.</p>
          </div>
        </div >
      )
    }
    if (this.props.likedGifs.length === 5) {
      return (
        < div id="rightBackground" >
          <div id="likedGifGrid">
            {
              this.props.likedGifs.map(el => (
                <div key={uuidv1()}>
                  <div>
                    <p id="gifListTitle">Title: {el.gifTitle}</p>
                    <p id="gifListWeirdness">Weirdness: {el.gifWeirdness}</p>
                    <p>Search Term: {el.gifSearchTerm}</p>
                    <img alt="" src={el.gifURL} height={100} /></div>
                  <div>
                    <button onClick={() => this.handleRemoveGif(el.gifSearchTerm)} id="unlikeButton">X</button>
                  </div>
                </div>
              ))}
          </div>
          <div id="calculateScoreDiv">
            <NavLink to="/results"><button>Calculate Score</button></NavLink>
            <p>You have <i>liked</i> {this.props.likedGifs.length} gifs. Calculate your score to see your weirdness level!</p>
          </div>
        </div >
      )
    }
  }

};

const mapStateToProps = state => {
  return { likedGifs: state.likedGifs };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  remove_gif: remove_gif
}, dispatch)

export default AllLikedGifs = connect(mapStateToProps, mapDispatchToProps)(AllLikedGifs);
