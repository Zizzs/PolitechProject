import React from "react";
import "./LikedGifs.css";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

const mapStateToProps = state => {
  return { likedGifs: state.likedGifs };
};

const AllLikedGifs = ({ likedGifs }) => (
  <ul>
    {likedGifs.map(el => (
      <li key={uuidv1()}>{el.title}</li>
    ))}
  </ul>
);

const LikedGifs = connect(mapStateToProps)(AllLikedGifs);
export default LikedGifs;
