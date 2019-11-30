import "./CalculateScore.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import uuidv1 from "uuid/v1";

class CalculateScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userScore: 0
        }
    }

    componentDidMount() {
        this.handleScoreCalculation();
    }

    handleScoreCalculation = () => {
        let score = 0;
        for (let gif of this.props.likedGifs) {
            score += gif.gifWeirdness;
        }
        score = Math.round(score / 5);
        this.setState({ userScore: score });
    }

    render() {
        return (
            <div id="calculateScoreDiv">
                <div>
                    <p id="scoreText">You scored an {this.state.userScore} out of 10 on the weirdness scale! </p>
                </div>
                <div id="calculateGifGrid">
                    {
                        this.props.likedGifs.map(el => (
                            <div key={uuidv1()}>
                                <div>
                                    <p id="gifListTitle">Title: {el.gifTitle}</p>
                                    <p id="gifListWeirdness">Weirdness: {el.gifWeirdness}/10</p>
                                    <p>Search Term: {el.gifSearchTerm}</p>
                                    <img alt="" src={el.gifURL} height={100} /></div>
                            </div>
                        ))}
                </div>
                <div id="playAgainDiv">
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
