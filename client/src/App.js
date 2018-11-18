import React, { Component } from "react";
import { fabric } from "fabric";
import { Button, Upload, Icon, message } from "antd";

import "./App.css";

class App extends Component {
  state = {
    isDrawingMode: false
  };
  img = {
    width: 250,
    height: 250,
    leftTopPoint: {
      left: 75,
      top: 75
    },
    rightTopPoint: {
      left: 75 + 250,
      top: 75
    },
    leftBottomPoint: {
      left: 75,
      top: 75 + 250
    },
    rightBottomPoint: {
      left: 75 + 250,
      top: 75 + 250
    },
    tolerance: 5
  };
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

      const pointLen = lastItem.path.length;
      const pathFirstPoint = lastItem.path[0];
      const pathLastPoint = lastItem.path[pointLen - 1];

      // pre-close for drawing
      lastItem.set("fill", "#000");
      that.canvas.renderAll();

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
      if (
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <=
          Math.pow(that.img.width / 2, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width / 2, 2)
      ) {
        // handle two point let it into the image
        const handledFirstPoint = {
          left: x1 < x2 ? x2 : x1,
          top: y1 < y2 ? y2 : y1
        };
        const handledLastPoint = {
          left: x3 < x2 ? x2 : x3,
          top: y3 < y2 ? y2 : y3
        };
        const crossPoint = {
          left: Math.min(handledFirstPoint.left, handledLastPoint.left),
          top: Math.min(handledFirstPoint.top, handledLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledFirstPoint.left > handledLastPoint.left) {
          leftPoint = handledLastPoint;
          rightPoint = handledFirstPoint;
        } else {
          leftPoint = handledFirstPoint;
          rightPoint = handledLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (rightPoint.top - y2 <= 5 && leftPoint.left - x2 <= 5) {
          const pathContent = `M ${handledFirstPoint.left} ${
            handledFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${handledLastPoint.left} ${
            handledLastPoint.top
          }`;
          console.log("path", pathContent);
          const newPath = new fabric.Path(pathContent);
          const groupPath = new fabric.Group([newPath, lastItem]);
          lastItem.set("fill", "#000");
          groupPath.set("fill", "#000");
          that.canvas.remove(lastItem);
          that.canvas.add(groupPath);
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
          Math.pow(that.img.width / 2, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width / 2, 2)
      ) {
        // handle two point let it into the image
        const handledFirstPoint = {
          left: x1 > x2 ? x2 : x1,
          top: y1 < y2 ? y2 : y1
        };
        const handledLastPoint = {
          left: x3 > x2 ? x2 : x3,
          top: y3 < y2 ? y2 : y3
        };
        const crossPoint = {
          left: Math.max(handledFirstPoint.left, handledLastPoint.left),
          top: Math.min(handledFirstPoint.top, handledLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledFirstPoint.left > handledLastPoint.left) {
          leftPoint = handledLastPoint;
          rightPoint = handledFirstPoint;
        } else {
          leftPoint = handledFirstPoint;
          rightPoint = handledLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (leftPoint.top - y2 <= 5 && x2 - rightPoint.left <= 5) {
          const pathContent = `M ${handledFirstPoint.left} ${
            handledFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${handledLastPoint.left} ${
            handledLastPoint.top
          }`;
          const newPath = new fabric.Path(pathContent);
          const groupPath = new fabric.Group([newPath, lastItem]);
          lastItem.set("fill", "#000");
          groupPath.set("fill", "#000");
          that.canvas.remove(lastItem);
          that.canvas.add(groupPath);
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
          Math.pow(that.img.width / 2, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width / 2, 2)
      ) {
        // handle two point let it into the image
        const handledFirstPoint = {
          left: x1 < x2 ? x2 : x1,
          top: y1 > y2 ? y2 : y1
        };
        const handledLastPoint = {
          left: x3 < x2 ? x2 : x3,
          top: y3 > y2 ? y2 : y3
        };
        const crossPoint = {
          left: Math.min(handledFirstPoint.left, handledLastPoint.left),
          top: Math.max(handledFirstPoint.top, handledLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledFirstPoint.left > handledLastPoint.left) {
          leftPoint = handledLastPoint;
          rightPoint = handledFirstPoint;
        } else {
          leftPoint = handledFirstPoint;
          rightPoint = handledLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (leftPoint.left - x2 <= 5 && y2 - rightPoint.top <= 5) {
          const pathContent = `M ${handledFirstPoint.left} ${
            handledFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${handledLastPoint.left} ${
            handledLastPoint.top
          }`;
          const newPath = new fabric.Path(pathContent);
          const groupPath = new fabric.Group([newPath, lastItem]);
          lastItem.set("fill", "#000");
          groupPath.set("fill", "#000");
          that.canvas.remove(lastItem);
          that.canvas.add(groupPath);
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
          Math.pow(that.img.width / 2, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width / 2, 2)
      ) {
        // handle two point let it into the image
        const handledFirstPoint = {
          left: x1 > x2 ? x2 : x1,
          top: y1 > y2 ? y2 : y1
        };
        const handledLastPoint = {
          left: x3 > x2 ? x2 : x3,
          top: y3 > y2 ? y2 : y3
        };
        const crossPoint = {
          left: Math.max(handledFirstPoint.left, handledLastPoint.left),
          top: Math.max(handledFirstPoint.top, handledLastPoint.top)
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (handledFirstPoint.left > handledLastPoint.left) {
          leftPoint = handledLastPoint;
          rightPoint = handledFirstPoint;
        } else {
          leftPoint = handledFirstPoint;
          rightPoint = handledLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (y2 - leftPoint.top <= 5 && x2 - rightPoint.left <= 5) {
          const pathContent = `M ${handledFirstPoint.left} ${
            handledFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${handledLastPoint.left} ${
            handledLastPoint.top
          }`;
          const newPath = new fabric.Path(pathContent);
          const groupPath = new fabric.Group([newPath, lastItem]);
          lastItem.set("fill", "#000");
          groupPath.set("fill", "#000");
          that.canvas.remove(lastItem);
          that.canvas.add(groupPath);
          that.canvas.renderAll();
        }

        return;
      }
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
        const imgWidth = (that.img.width = this.width);
        const imgHeight = (that.img.height = this.height);
        const canvasWidth = that.canvas.getWidth();
        const canvasHeight = that.canvas.getHeight();

        const image = new fabric.Image(img);

        that.canvas.setBackgroundImage(
          image,
          that.canvas.renderAll.bind(that.canvas),
          {
            left: (canvasWidth - imgWidth) / 2,
            top: (canvasHeight - imgHeight) / 2
          }
        );
        that.canvas.renderAll();
      };
      that.canvas.isDrawingMode = true;
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
    // save binary-image
    this.canvas.setBackgroundImage(null);
    const imageURL = this.canvas.toDataURL("jpg");
    const downloadImage = document.getElementById("downloadImage");
    downloadImage.href = imageURL;

    // restore backgroundImage
    const imgDom = document.getElementById("hiddenImg");
    const imgWidth = this.img.width;
    const imgHeight = this.img.height;
    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();

    const image = new fabric.Image(imgDom);

    this.canvas.setBackgroundImage(
      image,
      this.canvas.renderAll.bind(this.canvas),
      {
        left: (canvasWidth - imgWidth) / 2,
        top: (canvasHeight - imgHeight) / 2
      }
    );
    this.canvas.renderAll();
  };

  render() {
    return (
      <div className="App">
        <canvas id="MILL" />
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleUndo}>撤销</button>
        <button onClick={this.handleDelete}>删除标记</button>
        <button onClick={this.handleToggleRead}>
          {this.state.isDrawingMode ? "进入画图模式" : "进入只读模式"}
        </button>
        <img src="" alt="" style={{ display: "none" }} id="hiddenImg" />
        <a href="" id="downloadImage" download onClick={this.handleSaveImage}>
          下载图片
        </a>
      </div>
    );
  }
}

export default App;
