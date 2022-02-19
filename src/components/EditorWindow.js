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
        };
      }),
      newCounter: 0,
      images: [],
      navBar: false,
      navbarItems: [],
      navbarItemCnt: 0,
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onAddPic = this.onAddPic.bind(this);
    this.onAddCarousel = this.onAddCarousel.bind(this);
    this.onAddNavBar = this.onAddNavBar.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.setImages = this.setImages.bind(this);
    this.setNavbarItems = this.setNavbarItems.bind(this);
    this.setDropdownItems = this.setDropdownItems.bind(this);
  }

  // for switch in the return expression
  renderSwitch(param) {
    switch (param) {
      case "text":
        return <Editor />;
      case "picture":
        return <UploadAndDisplayImage />;
      case "carousel":
        return <Carousel images={this.state.images} />;
      default:
        return;
    }
  }

  setImages(newImages) {
    this.setState({
      images: newImages,
    });
  }

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

    return (
      <div key={i} data-grid={el} className="text-box">
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>

        {this.renderSwitch(type)}
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        type: "text",
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    });
  }

  onAddPic() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        type: "picture",
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    });
  }

  onAddCarousel() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    // console.log(this.state.images);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        type: "carousel",
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
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
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <button onClick={this.onAddItem}>Add Text</button>
          <button onClick={this.onAddPic}>Add Pic</button>
          <Popup
            trigger={<button> Add Carousel</button>}
            position="right center"
            modal
          >
            <CarouselEditor
              addCarousel={this.onAddCarousel}
              images={this.state.images}
              setImages={this.setImages}
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
        </div>
        <div className="main">
          {this.state.navBar ? (
            <div className="navbar">
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
