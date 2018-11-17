import React, { Component } from "react";
import { fabric } from "fabric";
import { Button, Upload, Icon, message } from "antd";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.canvas = new fabric.Canvas("MILL", {
      width: 400,
      height: 400,
      backgroundColor: "#eee"
    });
    this.canvas.add();

    const that = this;
    this.canvas.on("mouse:up", function(options) {
      const len = that.canvas.getObjects().length;
      const lastItem = that.canvas.item(len - 1);
      lastItem.set("fill", "#000");
      that.canvas.renderAll();
    });
  }

  handleChange = e => {
    const that = this;
    const file = e.target.files[0];
    var reader = new FileReader();
    var img = document.querySelector("img");

    reader.addEventListener("load", function() {
      img.src = reader.result;
      img.onload = function() {
        const image = new fabric.Image(img);
        that.canvas.setBackgroundImage(image);
        that.canvas.renderAll();
      };
      that.canvas.isDrawingMode = true;
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <div className="App">
        <canvas id="MILL" />
        <input type="file" onChange={this.handleChange} />
        <img src="" alt="" style={{ display: "none" }} />
      </div>
    );
  }
}

export default App;
