// import React, { useState} from 'react';

// function View() {
//     const [pageScreenshots, setPageScreenshots] = useState([]);
//     const [pageNames, setPageNames] = useState([]);
//     // pull all page names and screenshots from backend 
//     // state needs to maintain an array of names and screenshots files

//     // use a for loop to parse page name and screenshots from the backend
//     let newPageScreenshot, newPageName;
//     setPageScreenshots(pageScreenshots.push(newPageScreenshot));
//     setPageNames(pageNames.push(newPageName));

//     return (
//         <div className="view">
//            this is view!

            
//         </div>
//     )
// }

// export default View;
import React, {Component} from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default class View extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    isDraggable: false,
    isResizable: false,
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    // let pageNames;
    // let items;
    this.state = {
        items: 0,
        pageNames: [],
        pageScreenshots: []
      };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.generateDOM = this.generateDOM.bind(this);
  }

  componentDidMount() {
    fetch('http://10.224.41.106:8080/api/pages/getAll',{
        'method':'GET',
        headers : {
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFrb3NhaEBnbWFpbC5jb20iLCJleHAiOjE2NTAzNTk0NDh9.dQfR4zcIeUrV9yTFNv83TP-tBCHBWB-eljSuyBoyRXY'
      }
    }).then(response => response.json())
    .then(data1 => {console.log(data1.pages.length);
        // pageNames = data1.pages;
        this.setState({
            items: data1.pages.length,
            pageNames: data1.pages
        });
    },err => {
        alert("error during fetch");
    }   )
  }

  generateDOM() { // change this part to change actual look of elements
    console.log("logging from generateDOM", this.state);
    if (!this.state) {return null;} else {
        return _.map(_.range(this.state.items), function(i) {
       
            return (
                <div key={i}>
                  <span className="text">{this.state.pageNames[i]}</span> 
                  <img src={URL.createObjectURL(this.state.pageScreenshots[i])}></img>
                </div>
              );
        
        });
    }
    
  }

//   generateLayout() {
//     // const p = this.props;
//     console.log("in generateLayout", this.state.items);
//     return _.map(new Array(this.state.items), function(item, i) {
//     //   var y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
//       var y = i * 2;
//       return {
//         x: (i * 4) % 12,
//         y: Math.floor(i / 6) * y,
//         w: 4,
//         h: 6,
//         i: i.toString()
//       };
//     });
//   }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={_.map(new Array(this.state.items), function(item, i) {
    //   var y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      var y = i * 2;
      return {
        x: (i * 4) % 12,
        y: Math.floor(i / 6) * y,
        w: 4,
        h: 6,
        i: i.toString()
      };
    })}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

