import React from "react"

export default class Encoding extends React.Component {
    render() {
        return (
            <div className='encoding-box'>
                <div className='sub-title'>&nbsp;Encoding
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-save"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-set"></use>
                    </svg>
                </div>

        
              <div className='encoding-item'>
                <div className="encoding-divider">Visible</div>
                <div className='visible-ctrl'>
                  <div className='visible-circle1'></div>
                  <div className='visible-circle2'></div>
                </div>
              </div>
        
              <div className='encoding-item'>
                <div className="encoding-divider">Position</div>
                <div className='position-ctrl'>
                  <div className='position-circle1'></div>
                  <div className='position-circle2'></div>
                </div>
              </div>

              <div className='encoding-item'>
                <div className="encoding-divider">Color</div>
                <div className='color-ctrl'>
                  <div className='color-circle1'></div>
                  <div className='color-circle2'></div>
                </div>
              </div>
                
              <div className='encoding-item'>
                <div className="encoding-divider">Animation</div>
                <div className='animation-ctrl'>
                  <div className='animation-circle1'></div>
                  <div className='ellipse1'></div>
                  <div className='ellipse2'></div>
                  <div className='ellipse3'></div>
                  <div className='animation-circle2'></div>
                </div>
              </div>

              <div className='encoding-item'>
                <div className="encoding-divider">Link</div>
                <div className='link-ctrl'>
                  <div className='link-circle1'></div>
                  <wavy></wavy>
                  <div className='link-circle2'></div>
                </div>
              </div>

              <div className='encoding-item'>
                <div className="encoding-divider">Glyph</div>
                <div className='glyph-ctrl'>
                  <div className='glyph-circle1'></div>
                  <div className='glyph-circle2'></div>
                  <svg className="glyph-icon" aria-hidden="true" >
                        <use xlinkHref="#icon-tick"></use>
                    </svg>
                </div>
              </div>
                
              <div className='encoding-item'>
                <div className="encoding-divider">Glyph</div>
                <div className='glyph-ctrl'>
                  <div className='glyph-circle1'></div>
                  <div className='glyph-circle2'></div>
                  <svg className="glyph-icon" aria-hidden="true" >
                        <use xlinkHref="#icon-tick"></use>
                    </svg>
                </div>
              </div>
                
                
                
            </div>
    )
  }
}
