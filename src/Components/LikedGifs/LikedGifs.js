import React from "react";
import "./LikedGifs.css";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

const mapStateToProps = state => {
  return { likedGifs: state.likedGifs };
};

const AllLikedGifs = ({ likedGifs }) => (
  <div>
    <div id="rightBackground">
      <ul>
        {likedGifs.map(el => (
          <li key={uuidv1()}><p>Title: {el.gifTitle} | Weirdness: {el.gifWeirdness}</p><img src={el.gifURL} height={250} /></li>
        ))}
      </ul>
    </div>
    <div id="calculateScoreDiv">
      <button>Calculate Score</button>
      <p>You must <i>like</i> {5 - likedGifs.length} more gifs to calculate score.</p>
    </div>
  </div>
);

const LikedGifs = connect(mapStateToProps)(AllLikedGifs);
export default LikedGifs;
