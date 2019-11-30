import "./CalculateScore.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class CalculateScore extends Component {

    render() {
        console.log(this.props);
        return (
            <div id="calculateScoreDiv">
                <div>
                    gif gif gif gif gif
                </div>
                <div>
                    Your Score
                </div>
                <div>
                    <NavLink to="/"><button>Play Again!</button></NavLink>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { likedGifs: state.likedGifs };
};

export default connect(mapStateToProps)(CalculateScore);
