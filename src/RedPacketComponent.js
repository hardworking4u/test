import React from 'react';

class RedPacketItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: false,
            status: 0,  // 0: 等待拆开 1: 拆开后
        };
        this.stopAnimation = this.stopAnimation.bind(this);//手动绑定
        this.showResult = this.showResult.bind(this);//手动绑定
        this.openRedPacket = this.openRedPacket.bind(this);//手动绑定
    }

    stopAnimation() {
        this.setState({animation: false});
    }

    showResult() {
        this.setState({status: 1});
    }

    openRedPacket() {
        console.log('showMe')
        this.setState({animation: true});
        setTimeout(this.stopAnimation, 1500);
        setTimeout(this.showResult, 2000);
    }

    render() {
        const {prizeWord0, prizeWord1, prizeWord2} = this.props
        if (this.state.status !== 1) {
            return (<div className='redpack'>
                <div className='topcontent'>
                    <div className='redpack-avatar'>
                        <img src={this.props.imageIcon} alt='头像' width='80' height='80'/>
                    </div>
                    <h2 className='white-text'>{this.props.activeWords}</h2>
                    <span className='redpack-text'>{this.props.activeWords1}</span>
                </div>

                <div id='redpack-open' className={this.state.animation ? 'rotate' : ''}
                     onClick={this.openRedPacket}>
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
                            <h1 className='white-text' style={{marginTop: 180}}> {prizeWord0} </h1>
                            <span className='redpack-text' style={{marginTop: 210}}>{prizeWord1}</span>
                            <div className="redpack-description-div">
                                <a className='redpack-description white-text'
                                   style={{textDecoration: 'underline'}}>
                                    {prizeWord2}
                                </a>
                            </div>
                        </div>

                        <div id='redpack-opened'>
                            <div className='redpack-avatar'>
                                <img src={this.props.imageIcon} alt='头像' width='80' height='80'/>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default RedPacketItem
