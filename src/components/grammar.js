import React from "react"
import ReactJson from 'react-json-view'

export default class Grammar extends React.Component {
    constructor( props ) {
      super( props );
      this.state = {
        filename:'vis.json',
        payerData: {
          name:"util",
          class:"0",
          children:[
              {
                name: "Arrays",
                class: "0",
                value: 8528
            },
            {
                name: "Colors",
                class: "B", 
                children: ["red","black"]
            },
            {
                name: "Displays",
                class: "0",
                value: 12555
            }
          ]
        },
        jsonOptions: {
          displayDataTypes: false,
          name:null,
          indentWidth:2,
          collapseStringsAfterLength: 20,
          onEdit: ( edit ) => {
            console.log('编辑' , edit);
          }
        }
      }
    }
    render() {
        return (
            <div className='grammar-box' >
                <div className='sub-title'>&nbsp;Grammar
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-download"></use>
                    </svg>
                </div>
                <div className='filename'>{this.state.filename}</div>
                <div className='json-text'>
                  <ReactJson { ...this.state.jsonOptions } src={ this.state.payerData } />
                </div>
            </div>
        );
    }
}
