import "./WeirdnessSelect.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RangeSlider from "../RangeSlider/RangeSlider";
import RotateLoader from "react-spinners/RotateLoader";

import { getGif, getGifError, getGifPending, getLikedGifs } from '../../Reducers/rootReducer';
import { add_gif, clear_state } from "../../Actions/rootActionCreator";
import fetchGifAction from '../../GiphyAPI';


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
  componentWillMount() {
    this.handleClearState();
  }

  handleClearState = () => {
    this.props.clear_state();
  }

  handleChange = event => {
    this.setState({ gifHasSearchedTerm: "", [event.target.id]: event.target.value });
  };

  handleSliderChange = value => {
    this.setState({ gifWeirdness: value });
  };

  handleGifSubmit = event => {
    event.preventDefault(event);
    this.setState({ gifHasSearchedTerm: "" });
    const { gifTitle, gifWeirdness } = this.state;
    const { fetchGif } = this.props;
    fetchGif(gifTitle, gifWeirdness);
  };

  handleLikedGif = () => {
    const { add_gif, shownGif } = this.props;
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

      if (this.props.likedGifs.length === 5) {
        this.setState({ gifHasSearchedTerm: `You have already liked 5 gifs... Unlike one, or calculate your score!` });
      }

      if (!containsSearchTerm && this.props.likedGifs.length < 5) {
        add_gif(shownGif);
      }
    }
  };

  render() {
    const { gifTitle } = this.state;

    if (this.props.loading) {
      return (
        <div id="rotateLoaderDiv">
          <RotateLoader
            css={`display: block, margin: 0 auto, border-color: red`}
            sizeUnit={"px"}
            size={10}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
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
          <RangeSlider shownGifWeirdnessValue={this.props.shownGif.gifWeirdness} handleSliderChange={this.handleSliderChange} />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGif: fetchGifAction,
  add_gif: add_gif,
  clear_state: clear_state
}, dispatch);

const mapStateToProps = state => ({
  likedGifs: getLikedGifs(state),
  error: getGifError(state),
  shownGif: getGif(state),
  loading: getGifPending(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeirdnessSelect);
