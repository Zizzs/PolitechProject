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
    console.log(this.props.shownGifWeirdnessValue);
    if (this.props.shownGifWeirdnessValue > 0) {
      this.setState({
        value: this.props.shownGifWeirdnessValue
      })
    } else {
      this.setState({ value: 0 });
    }
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
