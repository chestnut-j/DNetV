import React from "react"
import ReactJson from "react-json-view"
import { Upload } from "antd"
import FileSaver from "file-saver"

export default class Grammar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: "example.json",
            jsonData: [
                {
                    nodes: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
                    links: [{ source: "a", target: "b" }],
                },
                {
                    nodes: [{ id: "b" }, { id: "c" }],
                    links: [{ source: "b", target: "c" }],
                },
                {
                    nodes: [{ id: "b" }, { id: "c" }, { id: "d" }],
                    links: [
                        { source: "b", target: "c" },
                        { source: "c", target: "d" },
                    ],
                },
            ],
            jsonOptions: {
                displayDataTypes: false,
                name: null,
                indentWidth: 2,
                collapseStringsAfterLength: 20,
                onEdit: (edit) => {
                    console.log("编辑", edit)
                },
            },
        }
    }
    componentDidMount() {}

    Export = () => {
        let content = JSON.stringify(this.state.jsonData)
        let type = "data:application/json;charset=utf-8"
        let blob = new Blob([content], { type: type })

        let isFileSaverSupported = false
        try {
            isFileSaverSupported = !!new Blob()
        } catch (e) {
            console.log(e)
        }

        if (isFileSaverSupported) {
            FileSaver.saveAs(blob, this.state.filename)
        } else {
            FileSaver.open(encodeURI(type + "," + content))
        }
    }
    render() {
        const { fileList } = this.state
        const props = {
            name: "UploadFile", //name得看接口需求，name与接口需要的name一致
            showUploadList: false,
            data: {}, //接口需要的参数，无参数可以不写
            beforeUpload: (file) => {
                console.log(file)
                const reader = new FileReader()
                reader.readAsText(file)
                reader.onload = () => {
                    console.log(reader.result)
                    let myData = reader.result
                    let myJson = JSON.parse(myData)
                    this.setState((state) => ({
                        fileList: [file],
                        jsonData: myJson,
                        filename: file.name,
                    }))
                    if (this.props.onSubmit) {
                        const { filename, jsonData } = this.state
                        this.props.onSubmit({ filename, jsonData })
                    }
                }
                console.log(file.data)
                return false
            },
        }
        return (
            <div className="grammar-box">
                <div className="sub-title">
                    &nbsp;Grammar
                    <Upload
                        className="upload-item"
                        {...props}
                        fileList={fileList}
                    >
                        　
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-add"></use>
                        </svg>
                    </Upload>
                    <svg
                        className="icon"
                        aria-hidden="true"
                        onClick={this.Export}
                    >
                        <use xlinkHref="#icon-download"></use>
                    </svg>
                </div>
                <div className="filename">{this.state.filename}</div>
                <div className="json-text">
                    <ReactJson
                        className="json-box"
                        {...this.state.jsonOptions}
                        src={this.state.jsonData}
                    />
                </div>
            </div>
        )
    }
}
