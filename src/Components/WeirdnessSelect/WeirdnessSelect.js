import React from "react";
import "./WeirdnessSelect.css";
import { connect } from "react-redux";

function WeirdnessSelect() {
  return (
    <div>
      <p>
        Find out how weird you are by selecting the GIFs that make you laugh.
        We'll show you the least weird ones to start, but you can move the
        slider to make them weirder.
      </p>
      <br />
      <p>
        When you find a GIF you like, press the <i>Like</i> button. Once you
        like 5 GIFs, we'll show you how weird you are.
      </p>
    </div>
  );
}

export default connect()(WeirdnessSelect);
