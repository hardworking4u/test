import React from 'react';
import 'antd/dist/antd.css';
import {Col, Row} from "antd";
import RedPacketItem from "./RedPacketComponent";
import Button from "antd/es/button";
import axios from "axios";
import IntegerStep from "./IntegerStep";

class RedPacketPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: false,
            status: 0,  // 0: 等待拆开 1: 拆开后
            active1: true,
            niceList: [],
            badList: [],
            dataSource: [{"prizeWord0": '谢谢参与', "prizeWord1": '下个学期要继续努力呀💪'}, {
                "prizeWord0": '谢谢参与',
                "prizeWord1": '下个学期要继续努力呀💪'
            }, {"prizeWord0": '谢谢参与', "prizeWord1": '下个学期要继续努力呀💪'}, {
                "prizeWord0": '谢谢参与',
                "prizeWord1": '下个学期要继续努力呀💪'
            }, {"prizeWord0": '谢谢参与', "prizeWord1": '下个学期要继续努力呀💪'}],
        };
        this.openRedPacket = this.openRedPacket.bind(this);//手动绑定
        this.stopAnimation = this.stopAnimation.bind(this);//手动绑定
        this.showResult = this.showResult.bind(this);//手动绑定
    }


    componentDidMount() {
        // .nice, badList: response.data.bad
        console.log('进入componentDidMount')
        axios.get('./assets/js/奖励1.json').then((response) => {
            this.setState({niceList: response.data})
            //
            let arrIdxList = [];
            let stepLong = this.state.niceList.length
            for (let i = 0; i < 5; i++) {
                let tmp = 0
                do {
                    tmp = Math.floor(Math.random() * stepLong);
                } while (arrIdxList.indexOf(tmp) !== -1)
                arrIdxList.push(tmp);
            }
            let resultTmp = []
            arrIdxList.forEach((item) => {
                resultTmp.push(this.state.niceList[item])
            })
            this.setState({dataSource: resultTmp})
        })
        axios.get('./assets/js/惩罚1.json').then((response) => {
            console.log(response.data)
            this.setState({badList: response.data})
            console.log(this.state.badList)
        })
        //
    }

    stopAnimation() {
        this.setState({animation: false});
    }

    showResult() {
        this.setState({status: 1});
    }

    refreshMe = () => {
        console.log('尝试回退')
        //
        this.props.getState(3);
    };

    backMe() {
        console.log('....')
        // 页面刷新
        window.location.reload()
    }

    handleIntegerStepState = (childState) => {
        console.log('随机位置为' + childState)
        // 更新红包背后可见
        // console.log(this.state.niceList)
        // console.log(this.state.badList)
        //
        let niceCount = childState
        let badCount = 5 - childState
        let arrIdxList = [];
        let resultTmp = []
        let stepLong = this.state.niceList.length
        for (let i = 0; i < niceCount; i++) {
            let tmp = 0
            do {
                tmp = Math.floor(Math.random() * stepLong);
            } while (arrIdxList.indexOf(tmp) !== -1)
            arrIdxList.push(tmp);
        }
        arrIdxList.forEach((item) => {
            resultTmp.push(this.state.niceList[item])
        })
        arrIdxList = [];
        stepLong = this.state.badList.length
        for (let i = 0; i < badCount; i++) {
            let tmp = 0
            do {
                tmp = Math.floor(Math.random() * stepLong);
            } while (arrIdxList.indexOf(tmp) !== -1)
            arrIdxList.push(tmp);
        }
        arrIdxList.forEach((item) => {
            resultTmp.push(this.state.badList[item])
        })
        // 打乱顺序
        for (let i = 0; i < 5; i++) {
            let tmp = Math.floor(Math.random() * 500);
            let dax = resultTmp[i]
            resultTmp[i] = resultTmp[tmp % 5]
            resultTmp[tmp % 5] = dax
        }
        console.log(resultTmp)
        this.setState({dataSource: resultTmp})
    }

    openRedPacket() {
        this.setState({animation: true});
        setTimeout(this.stopAnimation, 3000);
        setTimeout(this.showResult, 4000);
    }

    render() {
        return (
            <div className='redpack-container' id='redpack-container'>
                <Row>
                    <Col span={7} offset={2}>
                        <RedPacketItem activeWords={'学有所成'} activeWords1={'没有艰辛，便无所获'}
                                       activeStatus={true}
                                       prizeWord0={this.state.dataSource[0].prizeWord0}
                                       prizeWord1={this.state.dataSource[0].prizeWord1}
                                       prizeWord2={'好好学习，天天向上'}
                                       imageIcon={'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2582628840,2433056210&fm=26&gp=0.jpg'}/>
                    </Col>
                    <Col span={7}>
                        <RedPacketItem activeWords={'天天开心'} activeWords1={'笑口常开,积极向上'}
                                       activeStatus={false}
                                       prizeWord0={this.state.dataSource[1].prizeWord0}
                                       prizeWord1={this.state.dataSource[1].prizeWord1}
                                       prizeWord2={'好好学习，天天向上'}
                                       imageIcon={'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4040687782,187066668&fm=26&gp=0.jpg'}/>
                    </Col>
                    <Col span={7}>
                        <RedPacketItem activeWords={'茁壮成长'} activeWords1={'早睡早起，强壮身体'}
                                       activeStatus={true}
                                       prizeWord0={this.state.dataSource[2].prizeWord0}
                                       prizeWord1={this.state.dataSource[2].prizeWord1}
                                       prizeWord2={'好好学习，天天向上'}
                                       imageIcon={'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3229546207,666368212&fm=26&gp=0.jpg'}/>
                    </Col>
                </Row>

                <Row>
                    <Col span={8} offset={4}>
                        <RedPacketItem activeWords={'一鸣惊人'} activeWords1={'厚积薄发，更进一步'}
                                       activeStatus={true}
                                       prizeWord0={this.state.dataSource[3].prizeWord0}
                                       prizeWord1={this.state.dataSource[3].prizeWord1}
                                       prizeWord2={'好好学习，天天向上'}
                                       imageIcon={'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3259786518,3396651188&fm=26&gp=0.jpg'}/>
                    </Col>
                    <Col span={8}>
                        <RedPacketItem activeWords={'学无止境'} activeWords1={'百尺竿头,更进一步'}
                                       activeStatus={true}
                                       prizeWord0={this.state.dataSource[4].prizeWord0}
                                       prizeWord1={this.state.dataSource[4].prizeWord1}
                                       prizeWord2={'好好学习，天天向上'}
                                       imageIcon={'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3284412043,2876888588&fm=26&gp=0.jpg'}/>
                    </Col>
                    <Col span={4}>
                        <div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <Button type="primary" ghost onClick={this.refreshMe}>
                                刷新页面
                            </Button>
                            <br/>
                            <br/>
                            <Button type="primary" ghost disabled>
                                覆盖打乱
                            </Button>
                            <br/>
                            <br/>
                            <Button type="primary" ghost onClick={this.backMe}>
                                回退主页
                            </Button>
                            <br/>
                            <br/>
                            <br/>
                            <IntegerStep defaultInputVal={5} defaultNumVal={100}
                                         showToolTip={false}
                                         sliderLeftMargin={50}
                                         getState={this.handleIntegerStepState}/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

function RedPackOneX({openOrNot, animationStatus, openRedPacket}) {
    if (openOrNot) {
        return (<div className='redpack'>
            <div className='topcontent'>
                <div className='redpack-avatar'>
                    <img src='../assets/maybe.jpg' alt='头像' width='80' height='80'/>
                </div>
                <h2 className='white-text'>学业进步</h2>
                <span className='redpack-text'>感谢你这个学期的工作💪</span>
            </div>

            <div id='redpack-open' className={animationStatus ? 'rotate' : ''}
                 onClick={openRedPacket}>
                <span className='showMe'>点击打开</span>
            </div>
            <div className='redpack-description white-text'>萌萌老师给你发了一个红包</div>
        </div>)
    } else {
        return (
            <div className='redpack-container' id='redpack-container'>
                <div className='redpack'>
                    <div className='topcontent-open'>
                        <div className='redpack-avatar'>
                            <span id='close'/>
                        </div>
                        <h1 className='white-text' style={{marginTop: 180}}> 谢谢参与 </h1>
                        <span className='redpack-text'>多多参与的奖励的机会更多哦</span>
                        <div className="redpack-description-div">
                            <a className='redpack-description white-text' style={{textDecoration: 'underline'}}>
                                好好学习，天天向上
                            </a>
                        </div>
                    </div>

                    <div id='redpack-opened'>
                        <div className='redpack-avatar'>
                            <img src='./assets/maybe.jpg' alt='头像' width='80' height='80'/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default RedPacketPane
