import React from "react";
import "./HomeWrapper.css";
import LikedGifs from "../LikedGifs/LikedGifs";
import WeirdnessSelect from "../WeirdnessSelect/WeirdnessSelect";

function HomeWrapper() {
  return (
    <div id="mainGrid">
      <div>
        <WeirdnessSelect />
      </div>
      <div>
        <LikedGifs />
      </div>
    </div>
  );
}

export default HomeWrapper;
