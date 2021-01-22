import React from 'react';
import {Col, Row} from "antd";
import Slider from "antd/es/slider";
import InputNumber from "antd/es/input-number";

class IntegerStep extends React.Component {
    state = {
        inputValue: this.props.defaultInputVal,
        numberValue: this.props.defaultNumVal,
    };

    onChange = value => {
        this.props.getState(value);
        this.setState({
            inputValue: value,
            numberValue: (value * 100 / 8).toFixed(0)
        });
    };

    formatter = (value) => {
        return `设置奖励的个数为${value}`;
    }

    render() {
        const {inputValue, numberValue} = this.state;
        return (
            <Row>
                <Col span={12} style={{marginLeft: this.props.sliderLeftMargin}}>
                    <Slider
                        min={0}
                        tipFormatter={this.formatter}
                        max={this.props.defaultInputVal}
                        onChange={this.onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Col>
                {this.props.showToolTip && <Col span={12}>
                    中奖概率为:
                    <InputNumber
                        min={0}
                        max={this.props.defaultNumVal}
                        style={{margin: '0 16px'}}
                        value={numberValue}
                        onChange={this.onChange}
                        disabled
                    />%
                </Col>}
            </Row>
        );
    }
}

export default IntegerStep
