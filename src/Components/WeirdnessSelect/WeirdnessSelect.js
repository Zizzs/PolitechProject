import React, { Component } from "react";
import "./WeirdnessSelect.css";
import { connect } from "react-redux";
import { AddGif } from "../../Actions/rootActions";

function mapDispatchToProps(dispatch) {
  return {
    AddGif: gif => dispatch(AddGif(gif))
  };
}

class WeirdnessSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifTitle: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGifSubmit = this.handleGifSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleGifSubmit(event) {
    event.preventDefault(event);
    const { title } = this.state;
    this.props.AddGif({ title });
    this.setState({ title: "" });
  }

  render() {
    const { title } = this.state;
    return (
      <div>
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
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">SAVE</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(WeirdnessSelect);
