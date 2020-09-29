import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Data extends React.Component {
    render() {
        return (
            <div className='box'>
                <div className='sub-title'>Data
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-center"></use>
                    </svg>
                </div>
            </div>
        );
    }
}

class Relation extends React.Component {
    render() {
        return (
            <div className='box'>
                <div className='sub-title'>Relation</div>
            </div>
        );
    }
}

class Encoding extends React.Component {
    render() {
        return (
            <div className='box' style={{width: '220px', height:'620px'}}>
                <div className='sub-title'>Encoding
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-save"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-set"></use>
                    </svg>
                </div>
            </div>
        );
    }
}

class Grammar extends React.Component {
    render() {
        return (
            <div className='box' style={{width: '200px', height:'620px'}}>
                <div className='sub-title'>Grammar
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-download"></use>
                    </svg>
                </div>
            </div>
        );
    }
}

class Render extends React.Component {
    render() {
        return (
            <div className='box' style={{width: '180px', height:'120px'}}>
                <div className='sub-title'>Render</div>

            </div>
        );
    }
}

class Template extends React.Component {
    render() {
        return (
            <div className='box' style={{width: '600px', height:'120px'}}>
                <div className='sub-title'>Template
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-download"></use>
                    </svg>
                </div>

            </div>
        );
    }
}

class Preview extends React.Component {
    render() {
        return (
            <div className='box' style={{width: '800px', height:'475px'}}>
                <div className='sub-title'>Preview
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-play"></use>
                    </svg>
                </div>

            </div>
        );
    }
} 

class Board extends React.Component {
  render() {
      return (
          <div className='board'>
              <div className='title'> DNetV </div>
              <div className='row'>
                <div className='col'>
                    <Data/> 
                    <Relation/>
                </div>
                <div className='col'><Encoding/></div>
                <div className='col'><Grammar/></div>
                
                <div className='col'>
                    <div className='row'>
                    <Render style={{float:'left'}}/>
                    <Template style={{float:'left'}}/>
                    </div>
                    <Preview/>
                </div>
             </div>
          </div>
      );
  }
}


let script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://at.alicdn.com/t/font_2104982_8vm48h259qs.js';
document.getElementById('root').appendChild(script); 

ReactDOM.render(
  <Board />,
  document.getElementById('root'),
);