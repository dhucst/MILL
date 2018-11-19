import React, { Component } from 'react';
import { fabric } from 'fabric';

import './App.css';

class App extends Component {
  state = {
    isDrawingMode: false,
  };
  img = {
    width: 250,
    height: 250,
    leftTopPoint: {
      left: 0,
      top: 0,
    },
    rightTopPoint: {
      left: 0 + 500,
      top: 0,
    },
    leftBottomPoint: {
      left: 0,
      top: 0 + 500,
    },
    rightBottomPoint: {
      left: 0 + 500,
      top: 0 + 500,
    },
    tolerance: 5,
  };
  componentDidMount() {
    this.canvas = new fabric.Canvas('MILL', {
      width: 500,
      height: 500,
      backgroundColor: '#eee',
    });

    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = '#0f0';

    const that = this;
    this.canvas.on('mouse:up', function(options) {
      console.log(that.canvas.getObjects());
      const len = that.canvas.getObjects().length;

      if (len === 0) return;
      const lastItem = that.canvas.item(len - 1);

      const pointLen = lastItem.path.length;
      const pathFirstPoint = lastItem.path[0];
      const pathLastPoint = lastItem.path[pointLen - 1];

      // pre-close for drawing
      lastItem.set('fill', 'rgba(0, 255, 0, 0.5)');
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
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        // handle two point let it into the image
        const pathFirstPoint = {
          left: x1 < x2 ? x2 : x1,
          top: y1 < y2 ? y2 : y1,
        };
        const pathLastPoint = {
          left: x3 < x2 ? x2 : x3,
          top: y3 < y2 ? y2 : y3,
        };
        const crossPoint = {
          left: Math.min(pathFirstPoint.left, pathLastPoint.left),
          top: Math.min(pathFirstPoint.top, pathLastPoint.top),
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (pathFirstPoint.left > pathLastPoint.left) {
          leftPoint = pathLastPoint;
          rightPoint = pathFirstPoint;
        } else {
          leftPoint = pathFirstPoint;
          rightPoint = pathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (rightPoint.top - y2 <= 5 && leftPoint.left - x2 <= 5) {
          const pathContent = `M ${pathFirstPoint.left} ${
            pathFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${pathLastPoint.left} ${
            pathLastPoint.top
          }`;
          const newPath = new fabric.Path(pathContent);
          newPath.set('fill', 'rgba(0, 255, 0, 0.5)');
          const groupPath = new fabric.Group([newPath, lastItem]);
          groupPath.set('fill', 'rgba(0, 255, 0, 0.5)');
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
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        // handle two point let it into the image
        const pathFirstPoint = {
          left: x1 > x2 ? x2 : x1,
          top: y1 < y2 ? y2 : y1,
        };
        const pathLastPoint = {
          left: x3 > x2 ? x2 : x3,
          top: y3 < y2 ? y2 : y3,
        };
        const crossPoint = {
          left: Math.max(pathFirstPoint.left, pathLastPoint.left),
          top: Math.min(pathFirstPoint.top, pathLastPoint.top),
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (pathFirstPoint.left > pathLastPoint.left) {
          leftPoint = pathLastPoint;
          rightPoint = pathFirstPoint;
        } else {
          leftPoint = pathFirstPoint;
          rightPoint = pathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (leftPoint.top - y2 <= 5 && x2 - rightPoint.left <= 5) {
          const pathContent = `M ${pathFirstPoint.left} ${
            pathFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${pathLastPoint.left} ${
            pathLastPoint.top
          }`;
          const newPath = new fabric.Path(pathContent);
          newPath.set('fill', 'rgba(0, 255, 0, 0.5)');
          const groupPath = new fabric.Group([newPath, lastItem]);
          groupPath.set('fill', 'rgba(0, 255, 0, 0.5)');
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
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        // handle two point let it into the image
        const pathFirstPoint = {
          left: x1 < x2 ? x2 : x1,
          top: y1 > y2 ? y2 : y1,
        };
        const pathLastPoint = {
          left: x3 < x2 ? x2 : x3,
          top: y3 > y2 ? y2 : y3,
        };
        const crossPoint = {
          left: Math.min(pathFirstPoint.left, pathLastPoint.left),
          top: Math.max(pathFirstPoint.top, pathLastPoint.top),
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (pathFirstPoint.left > pathLastPoint.left) {
          leftPoint = pathLastPoint;
          rightPoint = pathFirstPoint;
        } else {
          leftPoint = pathFirstPoint;
          rightPoint = pathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (leftPoint.left - x2 <= 5 && y2 - rightPoint.top <= 5) {
          const pathContent = `M ${pathFirstPoint.left} ${
            pathFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${pathLastPoint.left} ${
            pathLastPoint.top
          }`;
          const newPath = new fabric.Path(pathContent);
          newPath.set('fill', 'rgba(0, 255, 0, 0.5)');
          const groupPath = new fabric.Group([newPath, lastItem]);
          groupPath.set('fill', 'rgba(0, 255, 0, 0.5)');
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
          Math.pow(that.img.width, 2) &&
        Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) <=
          Math.pow(that.img.width, 2)
      ) {
        // handle two point let it into the image
        const pathFirstPoint = {
          left: x1 > x2 ? x2 : x1,
          top: y1 > y2 ? y2 : y1,
        };
        const pathLastPoint = {
          left: x3 > x2 ? x2 : x3,
          top: y3 > y2 ? y2 : y3,
        };
        const crossPoint = {
          left: Math.max(pathFirstPoint.left, pathLastPoint.left),
          top: Math.max(pathFirstPoint.top, pathLastPoint.top),
        };

        // For convenient calculate
        let leftPoint = null;
        let rightPoint = null;
        if (pathFirstPoint.left > pathLastPoint.left) {
          leftPoint = pathLastPoint;
          rightPoint = pathFirstPoint;
        } else {
          leftPoint = pathFirstPoint;
          rightPoint = pathLastPoint;
        }

        // if vertical, is special circumstance, start drawing path and group path
        if (y2 - leftPoint.top <= 5 && x2 - rightPoint.left <= 5) {
          const pathContent = `M ${pathFirstPoint.left} ${
            pathFirstPoint.top
          } L ${crossPoint.left} ${crossPoint.top} L ${pathLastPoint.left} ${
            pathLastPoint.top
          }`;
          const newPath = new fabric.Path(pathContent);
          newPath.set('fill', 'rgba(0, 255, 0, 0.5)');
          const groupPath = new fabric.Group([newPath, lastItem]);
          groupPath.set('fill', 'rgba(0, 255, 0, 0.5)');
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
    this.filename = file.name;

    const reader = new FileReader();
    const img = document.querySelector('img');

    reader.addEventListener('load', function() {
      img.src = reader.result;
      img.onload = function() {
        const image = new fabric.Image(img);
        that.setBackground(image);
      };
      that.canvas.isDrawingMode = true;
      that.setState({
        isDrawingMode: true,
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
      isDrawingMode: this.canvas.isDrawingMode,
    });
  };

  handleSaveImage = () => {
    this.canvas.setBackgroundImage(null);
    this.canvas.setBackgroundColor('#000');
    this.canvas.getObjects().forEach(obj => {
      if (obj._objects) {
        obj.item(0).set('stroke', '#fff');
        obj.item(0).set('fill', '#fff');
        obj.item(1).set('stroke', '#fff');
        obj.item(1).set('fill', '#fff');
      } else {
        obj.set('stroke', '#fff');
        obj.set('fill', '#fff');
      }
    });
    const imageURL = this.canvas.toDataURL({
      format: 'jpeg',
      multiplier: 0.5,
    });
    const downloadImage = document.getElementById('downloadImage');
    downloadImage.href = imageURL;
    downloadImage.download = `${this.filename.split('.').slice(0, -1)[0]}_anno`;

    // restore canvas
    const imgDom = document.getElementById('hiddenImg');
    const image = new fabric.Image(imgDom);
    this.canvas.getObjects().forEach(obj => {
      if (obj._objects) {
        obj.item(0).set('stroke', '#0f0');
        obj.item(0).set('fill', 'rgba(0, 255, 0, 0.5)');
        obj.item(1).set('stroke', '#0f0');
        obj.item(1).set('fill', 'rgba(0, 255, 0, 0.5)');
      } else {
        obj.set('stroke', '#0f0');
        obj.set('fill', 'rgba(0, 255, 0, 0.5)');
      }
    });

    this.setBackground(image);
  };

  setBackground = image => {
    this.canvas.setBackgroundImage(
      image,
      this.canvas.renderAll.bind(this.canvas),
      {
        scaleX: this.canvas.getWidth() / this.img.width,
        scaleY: this.canvas.getHeight() / this.img.height,
      },
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
            <input type="file" onChange={this.handleChange} />
            <button onClick={this.handleUndo}>撤销</button>
            <button onClick={this.handleDelete}>删除标记</button>
            <button onClick={this.handleToggleRead}>
              {this.state.isDrawingMode ? '画图模式' : '只读模式'}
            </button>
            <img src="" alt="" style={{ display: 'none' }} id="hiddenImg" />
            <a href="" id="downloadImage" onClick={this.handleSaveImage}>
              下载标注图
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
