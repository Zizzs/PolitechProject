import React, { Component } from "react";

import "./WeirdnessSelect.css";
import RangeSlider from "../RangeSlider/RangeSlider";
import RotateLoader from "react-spinners/RotateLoader";

import { connect } from "react-redux";
import { getGif, getGifError, getGifPending } from '../../Reducers/rootReducer';
import fetchGifAction from '../../GiphyAPI';
import { add_gif } from "../../Actions/rootActionCreator";
import { bindActionCreators } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux";

class WeirdnessSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifTitle: "",
      gifWeirdness: 0,
    };
  }

  shouldComponentRender = () => {
    return this.props.loading;
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleGifSubmit = event => {
    event.preventDefault(event);
    const { gifTitle, gifWeirdness } = this.state;
    const { fetchGif } = this.props
    console.log("Starting fetch");
    fetchGif(gifTitle, gifWeirdness);
  };

  //   handleGifSubmit = event => {
  //     event.preventDefault(event);
  //     const { gifTitle } = this.state;
  //     this.props.add_gif({ title: gifTitle });
  //     this.setState({ gifTitle: "" });
  //   };



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
              <div>
                <label htmlFor="gifTitle">Title</label>
                <input
                  type="text"
                  id="gifTitle"
                  value={gifTitle}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit">SAVE</button>
            </form>
            <div id="shownGif">
              <img alt="Random Gif" src={this.props.shownGif.gifURL} />
            </div>
          </div>
          <RangeSlider />
          {/*Normally, I would attempt to create my own range slider, but due to time constraints, I'm choosing to use a library to simplify it*/}
        </div>
      );
    }
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     add_gif: gif => dispatch(add_gif(gif)),
//     fetchGif: (title, weirdness) => dispatch(fetchGif(title, weirdness))
//   };
// }

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGif: fetchGifAction
}, dispatch)

const mapStateToProps = state => ({
  error: getGifError(state),
  shownGif: getGif(state),
  loading: getGifPending(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeirdnessSelect);
