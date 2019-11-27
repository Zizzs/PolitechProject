import React from "react";
import "./LikedGifs.css";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { likedGifs: state.likedGifs };
};

const AllLikedGifs = ({ likedGifs }) => (
  <ul>
    {likedGifs.map(el => (
      <li key={el.id}>{el.title}</li>
    ))}
  </ul>
);

const LikedGifs = connect(mapStateToProps)(AllLikedGifs);
export default LikedGifs;
