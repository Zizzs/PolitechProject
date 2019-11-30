import React, { Component } from "react";

import RangeSlider from "../RangeSlider/RangeSlider";
import RotateLoader from "react-spinners/RotateLoader";

import "./WeirdnessSelect.css";

import { connect } from "react-redux";
import { getGif, getGifError, getGifPending, getLikedGifs } from '../../Reducers/rootReducer';
import { add_gif } from "../../Actions/rootActionCreator";
import fetchGifAction from '../../GiphyAPI';
import uuidv1 from "uuid/v1";
import { bindActionCreators } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux";

class WeirdnessSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifTitle: "",
      gifWeirdness: 0,
      gifPreviousLikedTerms: "",
      gifHasSearchedTerm: ""
    };
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  shouldComponentRender = () => {
    return this.props.loading;
  };

  handleChange = event => {
    this.setState({ gifHasSearchedTerm: "", [event.target.id]: event.target.value });
  };

  handleSliderChange = value => {
    this.setState({ ...this.state, gifWeirdness: value });
  };

  handleGifSubmit = event => {
    event.preventDefault(event);
    this.setState({ gifHasSearchedTerm: "" });
    const { gifTitle, gifWeirdness } = this.state;
    const { fetchGif } = this.props
    console.log("Starting fetch");
    fetchGif(gifTitle, gifWeirdness);
  };

  handleLikedGif = () => {
    const { add_gif, shownGif } = this.props;
    //this.setState({ gifPreviousLikedTerm: shownGif.gifSearchTerm });
    //if (this.state.gifTitle === shownGif.gifSearchTerm)
    if (this.props.likedGifs.length === 0) {
      add_gif(shownGif);
    } else {
      let containsSearchTerm = false;
      for (let gif of this.props.likedGifs) {
        if (gif.gifSearchTerm === shownGif.gifSearchTerm) {
          containsSearchTerm = true;
          this.setState({ gifHasSearchedTerm: `You have already liked a ${shownGif.gifSearchTerm} gif... try another term!` });
        }
      }

      if (!containsSearchTerm) {
        add_gif(shownGif);
      }
    }

    // if (!this.props.likedGifs.includes(shownGif)) {
    //   add_gif(shownGif);
    // }
  };

  render() {
    const { gifTitle } = this.state;

    if (this.shouldComponentRender()) {
      return (
        <RotateLoader
          css={`display: block, margin: 0 auto, border-color: red`}
          sizeUnit={"px"}
          size={10}
          color={"#123abc"}
          loading={this.state.loading}
        />
      );
    } else {
      return (
        <div id="leftBackground">
          <div>
            <p>
              Find out how weird you are by selecting the GIFs that make you
              laugh. We'll show you the least weird ones to start, but you can
              move the slider to make them weirder.
            </p>
            <br />
            <p>
              When you find a GIF you like, press the <i>Like</i> button. Once
              you like 5 GIFs, we'll show you how weird you are.
            </p>
          </div>
          <div>
            <form onSubmit={this.handleGifSubmit}>

              <label htmlFor="gifTitle">Search Term</label>
              <input
                type="text"
                id="gifTitle"
                value={gifTitle}
                onChange={this.handleChange}
              />

              <button id="submitButton" type="submit">Search</button>
            </form>
          </div>
          <div id="shownGifDiv">
            <p>{this.props.shownGif.gifTitle}</p>
            <img alt="" src={this.props.shownGif.gifURL} height={250} /><br />
            <button id="likeButton" onClick={this.handleLikedGif}>Like</button>
            <p>{this.state.gifHasSearchedTerm}</p>
          </div>
          <RangeSlider handleSliderChange={this.handleSliderChange} />
          {/*Normally, I would attempt to create my own range slider, but due to time constraints, I'm choosing to use a library to simplify it*/}
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGif: fetchGifAction,
  add_gif: add_gif
}, dispatch)

const mapStateToProps = state => ({
  likedGifs: getLikedGifs(state),
  error: getGifError(state),
  shownGif: getGif(state),
  loading: getGifPending(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeirdnessSelect);
