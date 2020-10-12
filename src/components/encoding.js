import React from "react"

export default class Encoding extends React.Component {
    render() {
        return (
            <div className="box" style={{ width: "220px", height: "620px" }}>
                <div className="sub-title">
                    &nbsp;Encoding
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-save"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-set"></use>
                    </svg>
                </div>

                <div className="divider2">Visible</div>
                <div className="divider2">Position</div>
                <div className="divider2">Color</div>
                <div className="divider2">Animation</div>
                <div className="divider2">Link</div>
                <div className="divider2">Glyph</div>
                <div className="divider2">Glyph</div>
            </div>
        )
    }
}
