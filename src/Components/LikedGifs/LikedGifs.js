import React, { Component } from "react";
import "./LikedGifs.css";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { remove_gif } from "../../Actions/rootActionCreator"
import { bindActionCreators } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux";

class AllLikedGifs extends Component {

  handleRemoveGif = (event, index) => {
    //event.preventDefault(event);
    console.log(`Removing Gif at index: ${index}`);
    console.log(this.props.likedGifs);
    const { remove_gif } = this.props;
    remove_gif(index);
  }

  render() {
    return (
      < div id="rightBackground" >
        <div id="likedGifGrid">
          {this.props.likedGifs.map(el => (
            <div>
              <div key={uuidv1()}>
                <p id="gifListTitle">Title: {el.gifTitle}</p>
                <p id="gifListWeirdness">Weirdness: {el.gifWeirdness}</p>
                <p>Search Term: {el.gifSearchTerm}</p>
                <img alt="" src={el.gifURL} height={100} /></div>
              <div>
                <button onClick={(event) => this.handleRemoveGif(event, el.gifId)} id="unlikeButton">X</button>
              </div>
            </div>
          ))}
        </div>
        <div id="calculateScoreDiv">
          <button>Calculate Score</button>
          <p>You must <i>like</i> {5 - this.props.likedGifs.length} more gifs to calculate score.</p>
        </div>
      </div >
    )
  }
};

const mapStateToProps = state => {
  return { likedGifs: state.likedGifs };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  remove_gif: remove_gif
}, dispatch)

export default AllLikedGifs = connect(mapStateToProps, mapDispatchToProps)(AllLikedGifs);
