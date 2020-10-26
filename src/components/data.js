import React from "react";
import {Modal, List} from 'antd';
import 'antd/dist/antd.css';

const dataset = [
    {
        dataset:"Barley",
        description:"Barley yield by variety across the upper midwest in 1931 and 1932"
    },
    {
        dataset:"Cars",
        description:"Barley yield by variety across the upper midwest in 1931 and 1932"
    },
    {
        dataset:"Crimea",
        description:"Barley yield by variety across the upper midwest in 1931 and 1932"
    },
    {
        dataset:"Driving",
        description:"Barley yield by variety across the upper midwest in 1931 and 1932"
    },
    {
        dataset:"Iris",
        description:"Barley yield by variety across the upper midwest in 1931 and 1932"
    },
]
export default class Data extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            selected: -1,
        }
    }
    handleChangeData = () => {
        console.log("click");
        this.setState({
            modalVisible: true,
        })
    }
    handleCancel = () => {
        this.setState({
            modalVisible: false,
        })
    }
    selectDataset = (index) => {
        console.log("a Select")
        console.log(index)
        //event.preventDefault();
        this.setState({
            selected: index
        })
    }
    render() {
        return (
            <div className='data-box'>
                <div className='sub-title'>   &nbsp; Data
                    <svg className="icon" aria-hidden="true" >
                        <use onClick={this.handleChangeData} xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use  xlinkHref="#icon-center"></use>
                    </svg>
                </div>  
                <div className='divider'>Overview</div>
                <div className='item0'>
                    Name:XXX &nbsp;&nbsp; #Times:12 <br/>
                    #Nodes:222 &nbsp;&nbsp; #Edges:55
    
                </div>
                <div className='divider'>Selection</div>
                <div className='divider'>Group</div>
                <Modal
                    title="Change Dataset"
                    visible={this.state.modalVisible}
                    onCancel={this.handleCancel}
                    footer={[]}
                    >
                    <p>Explore a Sample Dataset</p>
                    <List
                        itemLayout="horizontal"
                        dataSource={dataset}
                        renderItem={(item, index) => (
                            <List.Item >
                                <List.Item.Meta
                                    title={<a href="javascript:void(0)" onClick={()=>this.selectDataset(index)}>{item.dataset}{index===this.state.selected?" selected":""}</a>}
                                    description={item.description}
                                    className={index===this.state.selected?"selected":""}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>


            </div>
        );
    }
}
