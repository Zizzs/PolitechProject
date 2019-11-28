import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

class RangeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0
    };
  }

  handleChangeStart = () => {
    //console.log("Change event started");
  };

  handleChange = value => {
    this.setState({
      value: value
    });
    //console.log(this.state.value);
  };

  handleChangeComplete = () => {
    //console.log("Change event completed");
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
        <div className="value">{value}</div>
      </div>
    );
  }
}

export default RangeSlider;
