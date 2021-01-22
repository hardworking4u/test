import React from 'react';
import RedPacketPane from "./RedPacketContainer";

import NineLottery from "./NiceLotteryContainer";
import {Button, Col, Row, Spin} from "antd";

class MainContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            status: 2,  // 0 默认九宫格 1: 红包；2：主页
        };
    }

    updateContainer1(val) {
        console.log('checkoutM ')
        this.setState({status: 1})
    }

    updateContainer0(val) {
        this.setState({status: 0})
    }

    handlerChildrenVal0 = (childState) => {
        // 可以在这里刷新子Item的值
        this.setState({status: childState})
        setTimeout(() => {
            this.setState({status: 0})
        }, 200)
    }

    handlerChildrenVal1 = (childState) => {
        // 可以在这里刷新子Item的值
        this.setState({status: childState})
        setTimeout(() => {
            this.setState({status: 1})
        }, 200)
    }

    render() {
        if (this.state.status === 0) {
            return (
                <div>
                    <NineLottery getState={this.handlerChildrenVal0}/>
                </div>);
        } else if (this.state.status === 1) {
            return (
                <div>
                    <RedPacketPane getState={this.handlerChildrenVal1}/>
                </div>);
        } else if (this.state.status === 2) {
            return (
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        <Col span={8} offset={8}>
                            <Button type="primary" style={{width: 200}} onClick={() => this.updateContainer0()}>
                                九宫格抽奖
                            </Button>
                            <br/>
                            <br/>
                            <Button type="primary" style={{width: 200}}
                                    onClick={() => this.updateContainer1()}>
                                红包抽奖
                            </Button>
                            <br/>
                            <br/>
                            <Button type="primary" style={{width: 200}} disabled>
                                其他模式
                            </Button>
                        </Col>
                    </Row>
                </div>);
        } else {
            return (
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        <Col span={8} offset={11}>
                            <Spin size="large"/>
                        </Col></Row>

                </div>
            )
        }
    }
}

export default MainContainer
