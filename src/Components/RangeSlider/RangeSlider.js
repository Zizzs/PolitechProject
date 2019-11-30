import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./RangeSlider.css";

class RangeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.shownGifWeirdnessValue
    })
  }

  handleChange = value => {
    this.setState({
      value: value,
    });
    this.props.handleSliderChange(value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="slider">
        <Slider
          min={0}
          max={10}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div id="value">{value}</div>
      </div>
    );
  }
}

export default RangeSlider;
