import React, { Component } from "react";

import "./WeirdnessSelect.css";
import RangeSlider from "../RangeSlider/RangeSlider";

import { connect } from "react-redux";
import { add_gif } from "../../Actions/rootActionCreator";

function mapDispatchToProps(dispatch) {
  return {
    add_gif: gif => dispatch(add_gif(gif))
  };
}

class WeirdnessSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifTitle: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleGifSubmit = event => {
    event.preventDefault(event);
    const { gifTitle } = this.state;
    this.props.add_gif({ title: gifTitle });
    this.setState({ gifTitle: "" });
  };

  render() {
    const { gifTitle } = this.state;
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
            When you find a GIF you like, press the <i>Like</i> button. Once you
            like 5 GIFs, we'll show you how weird you are.
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
        </div>
        <RangeSlider />{" "}
        {/*Normally, I would attempt to create my own range slider, but due to time constraints, I'm choosing to use a library to simplify it*/}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(WeirdnessSelect);
