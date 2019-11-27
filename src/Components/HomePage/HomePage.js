import React from "react";
import "./HomePage.css";
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

const HomePage = connect(mapStateToProps)(AllLikedGifs);
export default HomePage;
