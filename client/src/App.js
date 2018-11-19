import React, { Component } from "react";
import { fabric } from "fabric";
import { Switch, Icon, Button } from "antd";

import "./App.css";

const BASE_WIDTH = 1680;

class App extends Component {
  state = {
    isDrawingMode: false
  };
  img = {
    width: 250,
    height: 250,
    leftTopPoint: {
      left: 0,
      top: 0
    },
    rightTopPoint: {
      left: 0 + 500,
      top: 0
    },
    leftBottomPoint: {
      left: 0,
      top: 0 + 500
    },
    rightBottomPoint: {
      left: 0 + 500,
      top: 0 + 500
    },
    tolerance: 5
  };
  componentDidMount() {
    const actualWidth = window.screen.width;
    this.canvas = new fabric.Canvas("MILL", {
      width: (actualWidth / BASE_WIDTH) * 500,
      height: (actualWidth / BASE_WIDTH) * 500,
      backgroundColor: "#eee"
    });

    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = "#0f0";

    const that = this;
    this.canvas.on("mouse:up", function(options) {
      console.log(that.canvas.getObjects());
      const len = that.canvas.getObjects().length;

      if (len === 0) return;
      const lastItem = that.canvas.item(len - 1);

      const pointLen = lastItem.path.length;
      const pathFirstPoint = lastItem.path[0];
      const pathLastPoint = lastItem.path[pointLen - 1];

      /*
       * There are many circumstances need judge
       * & tolerate 5px error
       * & four area
       */

      /*
       * In the lef-top area
       *
       */

      let x1 = pathFirstPoint[1];
      let y1 = pathFirstPoint[2];
      let x2 = that.img.leftTopPoint.left;
      let y2 = that.img.leftTopPoint.top;
      let x3 = pathLastPoint[1];
      let y3 = pathLastPoint[2];

      // handle two point let it into the image
      const handledPathFirstPoint = {
        left: x1,
        top: y1
      };
      const handledPathLastPoint = {
        left: x3,
        top: y3
      };

      if (
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <=
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        const crossPoint = {
          left: Math.min(handledPathFirstPoint.left, handledPathLastPoint.left),
          top: Math.min(handledPathFirstPoint.top, handledPathLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledPathFirstPoint.left > handledPathLastPoint.left) {
          leftPoint = handledPathLastPoint;
          rightPoint = handledPathFirstPoint;
        } else {
          leftPoint = handledPathFirstPoint;
          rightPoint = handledPathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (rightPoint.top - y2 <= 5 && leftPoint.left - x2 <= 5) {
          const pathContentOne = ["L", crossPoint.left, crossPoint.top];
          const pathContentTwo = [
            "L",
            handledPathFirstPoint.left,
            handledPathFirstPoint.top
          ];
          lastItem.path.push(pathContentOne, pathContentTwo);
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        } else {
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        }

        return;
      }

      /*
       * In the right-top area
       *
       */
      x2 = that.img.rightTopPoint.left;
      y2 = that.img.rightTopPoint.top;
      if (
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <=
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        const crossPoint = {
          left: Math.max(handledPathFirstPoint.left, handledPathLastPoint.left),
          top: Math.min(handledPathFirstPoint.top, handledPathLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledPathFirstPoint.left > handledPathLastPoint.left) {
          leftPoint = handledPathLastPoint;
          rightPoint = handledPathFirstPoint;
        } else {
          leftPoint = handledPathFirstPoint;
          rightPoint = handledPathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (leftPoint.top - y2 <= 1 && x2 - rightPoint.left <= 1) {
          const pathContentOne = ["L", crossPoint.left, crossPoint.top];
          const pathContentTwo = [
            "L",
            handledPathFirstPoint.left,
            handledPathFirstPoint.top
          ];
          lastItem.path.push(pathContentOne, pathContentTwo);
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        } else {
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        }

        return;
      }

      /*
       * In the left-bottom area
       *
       */
      x2 = that.img.leftBottomPoint.left;
      y2 = that.img.leftBottomPoint.top;
      if (
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <=
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        const crossPoint = {
          left: Math.min(handledPathFirstPoint.left, handledPathLastPoint.left),
          top: Math.max(handledPathFirstPoint.top, handledPathLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledPathFirstPoint.left > handledPathLastPoint.left) {
          leftPoint = handledPathLastPoint;
          rightPoint = handledPathFirstPoint;
        } else {
          leftPoint = handledPathFirstPoint;
          rightPoint = handledPathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (leftPoint.left - x2 <= 5 && y2 - rightPoint.top <= 5) {
          const pathContentOne = ["L", crossPoint.left, crossPoint.top];
          const pathContentTwo = [
            "L",
            handledPathFirstPoint.left,
            handledPathFirstPoint.top
          ];
          lastItem.path.push(pathContentOne, pathContentTwo);
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        } else {
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        }

        return;
      }

      /*
       * In the right-bottom area
       *
       */
      x2 = that.img.rightBottomPoint.left;
      y2 = that.img.rightBottomPoint.top;
      if (
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <=
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        const crossPoint = {
          left: Math.max(handledPathFirstPoint.left, handledPathLastPoint.left),
          top: Math.max(handledPathFirstPoint.top, handledPathLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledPathFirstPoint.left > handledPathLastPoint.left) {
          leftPoint = handledPathLastPoint;
          rightPoint = handledPathFirstPoint;
        } else {
          leftPoint = handledPathFirstPoint;
          rightPoint = handledPathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (y2 - leftPoint.top <= 5 && x2 - rightPoint.left <= 5) {
          const pathContentOne = ["L", crossPoint.left, crossPoint.top];
          const pathContentTwo = [
            "L",
            handledPathFirstPoint.left,
            handledPathFirstPoint.top
          ];
          lastItem.path.push(pathContentOne, pathContentTwo);
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        } else {
          lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
          that.canvas.renderAll();
        }

        return;
      }

      lastItem.set("fill", "rgba(0, 255, 0, 0.5)");
      that.canvas.renderAll();
    });
  }

  handleChange = e => {
    const that = this;
    const file = e.target.files[0];
    this.filename = file.name;

    const reader = new FileReader();
    const img = document.querySelector("img");

    reader.addEventListener("load", function() {
      img.src = reader.result;
      img.onload = function() {
        const image = new fabric.Image(img);
        that.setBackground(image);
      };
      that.canvas.isDrawingMode = true;
      that.setState({
        isDrawingMode: true
      });
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleUndo = () => {
    const len = this.canvas.getObjects().length;
    const lastItem = this.canvas.item(len - 1);
    this.canvas.remove(lastItem);
  };

  handleDelete = () => {
    const activeItem = this.canvas.getActiveObject();
    this.canvas.remove(activeItem);
  };

  handleToggleRead = () => {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    this.setState({
      isDrawingMode: this.canvas.isDrawingMode
    });
  };

  handleSaveImage = () => {
    this.canvas.setBackgroundImage(null);
    this.canvas.setBackgroundColor("#000");
    this.canvas.getObjects().forEach(obj => {
      obj.set("stroke", "#fff");
      obj.set("fill", "#fff");
    });
    const imageURL = this.canvas.toDataURL({
      format: "jpeg",
      multiplier: 0.5
    });
    const downloadImage = document.getElementById("downloadImage");
    downloadImage.href = imageURL;
    downloadImage.download = `${this.filename.split(".").slice(0, -1)[0]}_anno`;

    // restore canvas
    const imgDom = document.getElementById("hiddenImg");
    const image = new fabric.Image(imgDom);
    this.canvas.getObjects().forEach(obj => {
      obj.set("stroke", "#0f0");
      obj.set("fill", "rgba(0, 255, 0, 0.5)");
    });

    this.setBackground(image);
  };

  setBackground = image => {
    this.canvas.setBackgroundImage(
      image,
      this.canvas.renderAll.bind(this.canvas),
      {
        scaleX: this.canvas.getWidth() / this.img.width,
        scaleY: this.canvas.getHeight() / this.img.height
      }
    );
    this.canvas.renderAll();
  };

  render() {
    return (
      <div className="App">
        <div>
          <div className="canvasContainer">
            <canvas id="MILL" />
          </div>
          <div className="toolContainer">
            <Button
              type="primary"
              className="add-margin-left-8 add-margin-right-8"
            >
              <input
                type="file"
                onChange={this.handleChange}
                className="input-file"
              />
              上传图片
            </Button>
            <Button
              onClick={this.handleUndo}
              className="add-margin-left-8 add-margin-right-8"
            >
              撤销
            </Button>
            <Button
              onClick={this.handleDelete}
              className="add-margin-left-8 add-margin-right-8"
            >
              删除标记
            </Button>
            <Switch
              checkedChildren="画图模式"
              unCheckedChildren="只读模式"
              onClick={this.handleToggleRead}
              className="add-margin-left-8 add-margin-right-8"
            />
            <img src="" alt="" style={{ display: "none" }} id="hiddenImg" />
            <a
              href=""
              id="downloadImage"
              onClick={this.handleSaveImage}
              className="add-margin-left-8 add-margin-right-8"
            >
              下载标注图
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
