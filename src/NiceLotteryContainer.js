import React, {Component} from 'react';
import './App.css';
import {Card, Col, Modal, Result, Row, Skeleton} from "antd";
import 'antd/dist/antd.css';
import axios from "axios"
import Button from "antd/es/button";
import IntegerStep from "./IntegerStep";

// Item组件--所有格子的操作都可以在此进行，如果这些操作都能与"activedId"关联就更好了
class RowItem extends Component {

    getTheResult(key) {
        if (key / 3 === 0) {
            return
        } else {
            return '奖励1'
        }
    }

    render() {
        const {content, toolTip, activedId} = this.props;
        console.log('内容' + content)
        return (
            <div>
                <Row>
                    <Col>
                        <div className={activedId === content ? 'row__item row__item-active' : 'row__item'}
                             id={`row_item_${content}`}>
                            {!toolTip &&
                            <span>💥<span style={{background: 'rgba(148,57,136,0.28)'}}>
                                惩罚
                            </span></span>
                            }
                            {toolTip &&
                            <span> 🎉<span style={{background: 'rgba(57,148,122,0.28)'}}>
                                中奖
                                </span></span>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

class NineLottery extends Component {
    constructor() {
        super()
        this.state = {
            // 九宫格内容list
            list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            numList: [true, true, true, true, true, true, true, true, true],
            // 被选中的格子的ID
            activedId: '',
            activePrizeCount: 0,
            // 中奖ID
            prizeId: null,
            thatKey: '',
            // 获得prizeId之后计算出的动画次数
            times: 0,
            // 当前动画次数
            actTimes: 0,
            // 是否正在抽奖
            isRolling: false,
            isModalVisible: false,
            niceList: [],
            badList: []
        }
    }

    componentDidMount() {
        console.log('进入componentDidMount')
        axios.get('./assets/js/奖励.json').then((response) => {
            this.setState({niceList: response.data})
        })
        axios.get('./assets/js/惩罚.json').then((response) => {
            this.setState({badList: response.data})
        })
    }

    showModal = () => {
        this.setState({isModalVisible: true})
    };

    handleOk = () => {
        this.setState({isModalVisible: false})
    };

    handleCancel = () => {
        this.setState({isModalVisible: false})
    };

    handleBegin() {
        console.log('thatkey')
        console.log(this.state.badList)
        // this.state.isRolling为false的时候才能开始抽，不然会重复抽取，造成无法预知的后果
        if (!this.state.isRolling) {
            // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
            this.setState({
                activedId: '',
                prizeId: null,
                times: 0,
                actTimes: 0,
                isRolling: true
            }, () => {
                // 状态还原之后才能开始真正的抽奖
                this.handlePlay()
            })
        }
    }

    getThePrize(prizeIndex) {
        console.log('index:' + prizeIndex)
        let activeSelect = this.state.numList[prizeIndex]
        if (activeSelect) {
            let prize = Math.floor(Math.random() * (this.state.niceList.length));
            return '恭喜🎉；获得了' + this.state.niceList[prize].name
        } else {
            let prize = Math.floor(Math.random() * (this.state.badList.length));
            return '糟糕😢；抽中了' + this.state.badList[prize].name
        }
    }

    handlePlay() {
        // 随机获取一个中奖ID
        let prize = Math.floor(Math.random() * 9)
        console.log('抽到奖品的位置为' + prize)

        this.setState({
            prizeId: prize,
            thatKey: this.getThePrize(prize),
            activedId: 0
        })
        // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
        let times = this.state.list.length * Math.floor(Math.random() * 5 + 4)
        this.setState({
            times: times
        })
        // 抽奖正式开始↓↓
        this.begin = setInterval(() => {
            let num;

            if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) {
                // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
                clearInterval(this.begin)
                setTimeout(() => {
                    this.setState({
                        isRolling: false,
                        isModalVisible: true
                    })
                }, 300)
                return
            }

            // 以下是动画执行时对id的判断
            if (this.state.activedId === '') {
                num = 0
                this.setState({
                    activedId: num
                })
            } else {
                num = this.state.activedId
                if (num === 8) {
                    num = 0
                    this.setState({
                        activedId: num
                    })
                } else {
                    num = num + 1
                    this.setState({
                        activedId: num
                    })
                }
            }

            this.setState({
                actTimes: this.state.actTimes + 1
            })

        }, 1)
    }

    handleIntegerStepState = (childState) => {
        let thatArray = [true, true, true, true, true, true, true, true]
        let beginIdx = Math.floor(Math.random() * 100) % 8
        console.log('随机位置为' + beginIdx)
        childState = 8 - childState
        console.log('步长为' + childState)
        for (let i = 0; i < childState; i++) {
            thatArray[(i + beginIdx) % 8] = false
        }
        // 可以在这里刷新子Item的值
        this.setState({activePrizeCount: childState, numList: thatArray})
    }

    refreshMe() {
        console.log('....')
        //
        this.props.getState(3);
    }


    backMe() {
        console.log('....')
        // 页面刷新
        window.location.reload()
    }

    render() {
        const {list, activedId, numList} = this.state;
        return (
            <div className="App">
                <br/>
                <br/>
                <br/>
                <Modal title="抽奖结果" visible={this.state.isModalVisible} onOk={this.handleOk}
                       okText="确认"
                       cancelText="关闭"
                       onCancel={this.handleCancel}>
                    <div>
                        <Result
                            status="success"
                            title={this.state.thatKey}
                        />
                    </div>
                </Modal>
                <Row>
                    <Col offset={5} span={6}>
                        <Card title="九宫格抽奖" extra={<a href="#">x</a>} style={{width: '100%'}}>
                            <div className="prize">
                                <div className="prize__container">
                                    <div className="container__area">
                                        <div className="begin__btn" onClick={() => this.handleBegin()}>
                                            点击开始
                                        </div>
                                        <div className="area__row">
                                            <RowItem content={list[0]} toolTip={numList[0]} activedId={activedId}/>
                                            <RowItem content={list[1]} toolTip={numList[1]} activedId={activedId}/>
                                            <RowItem content={list[2]} toolTip={numList[2]} activedId={activedId}/>
                                        </div>
                                        <div className="area__row">
                                            <RowItem content={list[7]} toolTip={numList[7]} activedId={activedId}/>
                                            <RowItem content={list[3]} toolTip={numList[3]} activedId={activedId}/>
                                        </div>
                                        <div className="area__row">
                                            <RowItem content={list[6]} toolTip={numList[6]} activedId={activedId}/>
                                            <RowItem content={list[5]} toolTip={numList[5]} activedId={activedId}/>
                                            <RowItem content={list[4]} toolTip={numList[4]} activedId={activedId}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} offset={2}>
                        <br/>
                        <br/>
                        <br/>
                        <span style={{fontSize: 16, marginLeft: -400}}><b>抽奖规则:</b></span>
                        <br/>
                        <pre style={{marginTop: 20}}>1、调整中奖比例，默认100</pre>
                        <pre>2、点击"开始抽奖"；将开始轮转，3秒后停止开奖</pre>
                        <Skeleton active/>
                        <br/>
                        <IntegerStep defaultInputVal={8} defaultNumVal={100}
                                     showToolTip={true}
                                     getState={this.handleIntegerStepState}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={3} offset={21}>
                        <div>
                            <br/>
                            <br/>
                            <Button type="primary" ghost onClick={() => {
                                this.refreshMe()
                            }}>
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
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NineLottery;
