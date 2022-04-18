import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import Editor from "./Editor";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import Carousel from "./Carousel";
import CarouselEditor from "./CarouselEditor";
import Popup from "reactjs-popup";
import Navbar from "./Navbar";
import NavbarButtonEditor from "./NavbarButtonEditor";
import NavbarDropdownEditor from "./NavbarDropdownEditor";
import "reactjs-popup/dist/index.css";
import "./EditorWindow.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class EditorWindow extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [].map(function (i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === list.length - 1,
          type: "text",
          uid: i
        };
      }),
      newCounter: 0,
      uniqueCounter: 0,
      carouselImages: new Map(),
      navBar: false,
      navbarItems: [],
      navbarItemCnt: 0,
      singleImages: new Map() // stores state of picture items
      // carouselEditorID: 0 // each time we create a carousel, the editor should be cleared of images from previous carousel creations
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onAddPic = this.onAddPic.bind(this);
    this.onAddCarousel = this.onAddCarousel.bind(this);
    this.onAddNavBar = this.onAddNavBar.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.setCarouselImages = this.setCarouselImages.bind(this);
    this.setNavbarItems = this.setNavbarItems.bind(this);
    this.setDropdownItems = this.setDropdownItems.bind(this);
    this.generatePage = this.generatePage.bind(this);
    this.setPic = this.setPic.bind(this); // function to be passed to and called by child component
    // this.updateCarouselEditorID = this.updateCarouselEditorID.bind(this);
  }

  // for switch in the return expression
  renderSwitch(param, uid) {
    switch (param) {
      case "text":
        return <Editor />;
      case "picture":
        return <UploadAndDisplayImage picItemID={uid} setPic={this.setPic}/>;
      case "carousel": 
        return <Carousel images={this.state.carouselImages.get(uid)} />;
      default:
        return;
    }
  }

  setCarouselImages(newImages, uid) {
    this.setState((prevState) => {
      const newCarouselImages = new Map(prevState.carouselImages);
      return {carouselImages: newCarouselImages.set(uid, newImages)}
    });
  }

  setPic(img, idx) {
    this.setState((prevState) => {
      const newSingleImages = new Map(prevState.singleImages);
      // console.log(prevState.singleImages);
      return {singleImages: newSingleImages.set(idx, img)}
    });
  }

  // updateCarouselEditorID() {
  //   this.setState((prevState) => {
  //     return {carouselEditorID : prevState.carouselEditorID + 1}
  //   });
  // }

  setNavbarItems(navbarItem) {
    this.setState({
      navbarItems: this.state.navbarItems.concat({
        i: this.state.navbarItemCnt,
        text: navbarItem,
        type: "button",
        items: [],
      }),
      navbarItemCnt: this.state.navbarItemCnt + 1,
    });
  }

  setDropdownItems(dropdownItems) {
    this.setState({
      navbarItems: this.state.navbarItems.concat({
        i: this.state.navbarItemCnt,
        text: "",
        type: "dropdown",
        items: dropdownItems,
      }),
      navbarItemCnt: this.state.navbarItemCnt + 1,
    });
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
      zIndex: 3,
    };
    const i = el.i;
    const type = el.type;
    const uid = el.uid;

    return (
      <div id={"mainItem"+i} key={uid} data-grid={el} className="text-box">
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>

        {this.renderSwitch(type, uid)}
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    // console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: this.state.newCounter.toString(),
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        type: "text",
        uid: this.state.uniqueCounter
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
      uniqueCounter: this.state.uniqueCounter + 1
    });
  }

  onAddPic() {
    /*eslint no-console: 0*/
    // console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: this.state.newCounter.toString(),
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        type: "picture",
        // picID: this.state.picItemCnt,
        uid: this.state.uniqueCounter
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
      // picItemCnt: this.state.picItemCnt + 1,
      uniqueCounter: this.state.uniqueCounter + 1
    });
  }

  onAddCarousel() {
    /*eslint no-console: 0*/
    // console.log("adding", "n" + this.state.newCounter);
    // console.log(this.state.images);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: this.state.newCounter.toString(),
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        type: "carousel",
        uid: this.state.uniqueCounter
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
      uniqueCounter: this.state.uniqueCounter + 1
    });
  }

  onAddNavBar() {
    this.setState({
      navBar: !this.state.navBar,
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    // console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }), newCounter: this.state.newCounter - 1 });

  }

  generatePage() {
    let x, y, w, h, textX, textY, textW, textH;
    let maml = "";
    if (this.state.navBar) {
      x = document.getElementById("navbar").getBoundingClientRect().x;
      y = document.getElementById("navbar").getBoundingClientRect().y;
      w = document.getElementById("navbar").getBoundingClientRect().width;
      h = document.getElementById("navbar").getBoundingClientRect().height;
      maml = maml.concat("{\"type\":\"rect\",\"x\":", x, ",\"y\":", y, ",\"w\":", w, ",\"h\":", h, ",\"color\":\"#808080\"}\n");
      for (let i = 0; i < this.state.navbarItemCnt; i++) {
        x = document.getElementById("navbarButton" + i).getBoundingClientRect().x;
        y = document.getElementById("navbarButton" + i).getBoundingClientRect().y;
        w = document.getElementById("navbarButton" + i).getBoundingClientRect().width;
        h = document.getElementById("navbarButton" + i).getBoundingClientRect().height;
        if (this.state.navbarItems[i].type === "button") {
          maml = maml.concat("{\"type\":\"button\",\"template\":\"POST\",\"txt\":\"", this.state.navbarItems[i].text, "\",\"txtFields\":\"0\",\"x\":", x, ",\"y\":", y, ",\"w\":", w, ",\"h\":", h, ",\"target\":\"sample.com\"}\n");
        } else {
          maml = maml.concat("{\"type\":\"dropdown\",\"template\":\"POST\",\"items\":[", this.state.navbarItems[i].items.map((el) => "\"" + el.value + "\""), "],\"txtFields\":", this.state.navbarItems[i].items.length, ",\"x\":", x, ",\"y\":", y, ",\"w\":", w, ",\"h\":", h, ",\"target\":\"sample.com\"}\n");
        }
      }
    }

    for (let i = 0; i < this.state.newCounter; i++) {
      // console.log("DEBUG",i);
      console.log("CURRENT STATE: ",this.state);
      x = document.getElementById("mainItem" + i).getBoundingClientRect().x;
      y = document.getElementById("mainItem" + i).getBoundingClientRect().y;
      w = document.getElementById("mainItem" + i).getBoundingClientRect().width;
      h = document.getElementById("mainItem" + i).getBoundingClientRect().height;
      if (this.state.items[i].type === "text") {
        let textBox = document.querySelector("#mainItem" + i + " .ql-editor");
        let text = textBox.firstChild;
        const style = getComputedStyle(text);
        // get the dimensions of the actual text
        textX = text.getBoundingClientRect().x;
        textY = text.getBoundingClientRect().y;
        textW = text.getBoundingClientRect().width;
        textH = text.getBoundingClientRect().height;
        x = document.querySelector("#mainItem" + i).getBoundingClientRect().x;
        y = document.querySelector("#mainItem" + i).getBoundingClientRect().y;
        w = document.querySelector("#mainItem" + i).getBoundingClientRect().width;
        h = document.querySelector("#mainItem" + i).getBoundingClientRect().height;
        maml = maml.concat("{\"type\":\"txt\",\"txt\":\"", text.innerHTML, "\",\"txtFields\":\"0\",\"x\":", x, ",\"y\":", y, ",\"w\":", w, ",\"h\":", h, ",\"textX\":", textX, ",\"textY\":", textY, ",\"textW\":", textW, ",\"textH\":", textH, ",\"font\":\"",style.fontSize,"\",\"font-family\":\"",style.fontFamily,"\",\"color\":\"",style.color,"\"}\n");
      } else if (this.state.items[i].type === "picture") {
        let image = document.querySelector("#mainItem" + i + " img");
        x = image.getBoundingClientRect().x;
        y = image.getBoundingClientRect().y;
        w = image.getBoundingClientRect().width;
        h = image.getBoundingClientRect().height;
        let imageNameList = this.state.singleImages.get(i).name.split('.');
        let format = imageNameList[imageNameList.length - 1];
        maml = maml.concat("{\"type\":\"img\",\"uid\":\"", this.state.items[i].uid, "\",\"format\":\"", format, "\",\"x\":", x, ",\"y\":", y, ",\"w\":", w, ",\"h\":", h, "}\n");
      } else if (this.state.items[i].type === "carousel") {
        let carousel = document.querySelector("#mainItem" + i);
        x = carousel.getBoundingClientRect().x;
        y = carousel.getBoundingClientRect().y;
        w = carousel.getBoundingClientRect().width;
        h = carousel.getBoundingClientRect().height;
        let imageArray = this.state.carouselImages.get(i);
        let imageCnt = imageArray.length;
        let formats = [];
        for (let j = 0; j < imageCnt; j++) {
          let nameList = imageArray[j].file.name.split('.');
          formats.push("\"" + nameList[nameList.length - 1] + "\"");
        }
        maml = maml.concat("{\"type\":\"carousel\",\"uid\":\"", this.state.items[i].uid, "\",\"imageCnt\":", imageCnt, ",\"formats\":[", formats, "],\"x\":", x, ",\"y\":", y, ",\"w\":", w, ",\"h\":", h, "}\n");
      }
    }
    console.log(maml);
    // console.log(this.state.singleImages);
    // make a group of images and the maml object and send to the backend
    const data = new FormData();
    data.append('maml', maml);
    this.state.singleImages.forEach((value, key) => {
      let nameList = value.name.split('.');
      let fileExtension = nameList[nameList.length - 1];
      data.append('files[]', value, key + '.' + fileExtension);
    });
    this.state.carouselImages.forEach((value, key) => {
      value.forEach((pic, picIdx) => {
        console.log(pic.file);
        console.log(key);
        console.log(picIdx);
        let nameList = pic.file.name.split('.');
        let fileExtension = nameList[nameList.length - 1];
        data.append('carousels[]', pic.file, "c" + key + "-" + picIdx + '.' + fileExtension);
      });
    });
  
    console.log("DEBUG NOW:", data.get("files[]"));
    const data2 = {
      "email":"akosah@gmail.com",
      "password":"akosah"
    }

    // fetch('http://10.224.41.106:8080/api/users/login',{
    //         'method':'POST',
    //          headers : {
    //         'Content-Type':'application/json',
    //   },
    //   body:JSON.stringify(data2)
    // }).then(response => response.json())
    // .then(data => console.log(data));

    fetch('http://10.224.41.106:8080/api/pages/upload',{
            'method':'POST',
             headers : {
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFrb3NhaEBnbWFpbC5jb20iLCJleHAiOjE2NDk3NTYzNjR9._RqbjV7nQrRy4YGbThdh5NKIcPYks3_caAoxtr_AKkU'
      },
      body:data
    }).then(response => response.json())
    .then(data1 => {console.log(data1);
      console.log("DEBUG DATA AFTER:", maml, data.get("files"))});

  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <button onClick={this.onAddItem}>Add Text</button>
          <button onClick={this.onAddPic}>Add Pic</button>
          {/* <button onClick={this.onAddCarousel}>Add Pic</button> */}
          <Popup
            trigger={<button> Add Carousel</button>}
            position="right center"
            modal
          >
            <CarouselEditor
              addCarousel={this.onAddCarousel}
              images={this.state.carouselImages}
              setImages={this.setCarouselImages}
              uid={this.state.uniqueCounter}
              // editorID={this.state.carouselEditorID}
              // updateID={this.updateCarouselEditorID}
            />
          </Popup>
          <button onClick={this.onAddNavBar}>Toggle Navbar</button>
          <Popup
            trigger={<button> Add Navbar Button</button>}
            position="right center"
            modal
          >
            <NavbarButtonEditor setNavbarItems={this.setNavbarItems} />
          </Popup>
          <Popup
            trigger={<button> Add Navbar Dropdown</button>}
            position="right center"
            modal
          >
            <NavbarDropdownEditor setDropdownItems={this.setDropdownItems} />
          </Popup>
          <button onClick={this.generatePage}>Generate Page</button>
        </div>
        <div className="main">
          {this.state.navBar ? (
            <div className="navbar" id="navbar">
              <Navbar navbarItems={this.state.navbarItems} />
            </div>
          ) : null}
          <ResponsiveReactGridLayout
            //   onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
            draggableCancel=".my-editing-area"
            autoSize={true}
            margin={[1, 1]}
          >
            {_.map(this.state.items, (el) => this.createElement(el))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then(fn => fn.default(AddRemoveLayout));
// }
