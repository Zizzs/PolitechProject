import React from "react";
import "./LikedGifs.css";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

const mapStateToProps = state => {
  return { likedGifs: state.likedGifs };
};

const AllLikedGifs = ({ likedGifs }) => (
  <div id="rightBackground">
    <div id="likedGifGrid">
      {likedGifs.map(el => (
        <div key={uuidv1()}><p>Title: {el.gifTitle} | Weirdness: {el.gifWeirdness}</p><img src={el.gifURL} height={100} /><button id="unlikeButton">X</button></div>
      ))}
    </div>
    <div id="calculateScoreDiv">
      <button>Calculate Score</button>
      <p>You must <i>like</i> {5 - likedGifs.length} more gifs to calculate score.</p>
    </div>
  </div>
);

const LikedGifs = connect(mapStateToProps)(AllLikedGifs);
export default LikedGifs;
