import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { AtDivider, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import fetch from '../../utils/fetch-data'
import './detail.scss'

import imgbg from '../../assets/images/bg.png'


class Detail extends Component{
    config={
        navigationBarTitleText: '详情'
    }
    constructor() {
        this.state = {
            detail: {},
            height: wx.getSystemInfoSync().windowHeight-62,
            a:1,
            bgStyle: {
                height:wx.getSystemInfoSync().windowHeight+'px',
                background: `url(${imgbg}) no-repeat` ,
                backgroundSize: `cover`

            },
            animationData: null,
            atModal: {
                isOpened: true,
            }
        }
        console.log(this.state.height)

        // let cStyle = {
        //     background:url('../../assets/images/bg.png') no-repeat,
        //     height:(this.state.height)+px;
        //     background-size:100% 100%;}
        // }
    }

    async fetchData(id) {
        console.log(id)
        let result = await fetch({
            url: `http://localhost:9001/data?id=${id}`
        })
        this.setState({
            detail:result.data[0]
        })
        console.log(result)
    }

    componentWillMount() {
        // console.log(1)
        this.productId = this.$router.params.id;
        this.fetchData(this.productId)
    }

    clickAddressHandler() {
        let latitude = this.state.detail.latitude;
        let longitude = this.state.detail.longitude;
        wx.openLocation({
            latitude,
            longitude,
            scale: 18
        })
    }

    componentWillMount() {

        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
          transformOrigin: '50% 50% 0'
        })
    
        this.animation = animation
    
        this.setState({
          animationData: animation.export()
        })
        var n = 0.05;
       //连续动画需要添加定时器,所传参数每次+1就行
        setInterval(function () {
        //   n=n+1;
        n = -n
        
        //   this.animation.scale(1.1 * (n)).step()
          this.animation.scale((1+n)).step()
          this.setState({
            animationData: this.animation.export()
          })
        }.bind(this), 500)
      }

    closeModal() {
        this.state.atModal.isOpened = false
        console.log(1)
    }

    shareFriends() {
        console.log('share')
        wx.updateShareMenu({
            withShareTicket: true,
            success() { 
                console.log('asd')
            }
          })
    }

    render(){
       return (
            <View className="detailCon" style={this.state.bgStyle}>
                <View className="box">
                    <View className="headerCon">
                            <Image src={this.state.detail.verticalPic}/>
                            {/* <Image src="https://dpic.tiankong.com/3d/rv/QJ6198973640.jpg?x-oss-process=style/670ws"/> */}
                    </View>
                    <View className="addressCon" onClick={this.clickAddressHandler}>
                        <Text className="iconfont icon-address" style="font-size:30px"></Text>
                        <Text className="addressInfo">{this.state.detail.venueName} </Text>
                        <Text className="iconfont icon-next" style="font-size:24px; float:right"></Text>
                        
                    </View>

                    <AtDivider />

                    <View className="showDetail">
                        <View>演出详情</View>
                        <View className="showDetailName">{this.state.detail.name}</View>
                        <View className="showDetailActor">{this.state.detail.actores}</View>
                        
                        <View className="shareBox">
                            <View className="shareFriends" animation="{{animationData}}">分享好友，一起砍价</View>
                        </View>

                        <View className="shoeDetailrecReason">{this.state.detail.recReason}</View>
                    </View>
                </View>

                <View className="footerOrder">
                    <View className="btn">立即预订</View>
                </View>               
{/* 
                <AtModal
                    isOpened={this.state.atModal.isOpened}
                    title='标题'
                    cancelText='取消'
                    confirmText='确认'
                    onClose={ this.handleClose }
                    onCancel={ this.handleCancel }
                    onConfirm={ this.handleConfirm }
                    content='欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室'
                />                 */}
                <AtModal isOpened={this.state.atModal.isOpened} className="atModal">
                    
                    <View className="closebtn" onClick={this.closeModal}><Text className="iconfont icon-close" style="font-size:30px"></Text></View> 
                    {/* <AtModalContent><Image src="https://dpic.tiankong.com/3d/rv/QJ6198973640.jpg?x-oss-process=style/670ws"/></AtModalContent> */}
                    
                    <AtModalContent><Image src={this.state.detail.verticalPic}/></AtModalContent>
                    <AtModalContent>
                       您已砍了27.89元，人多力量大，快喊小伙伴来帮忙~
                    </AtModalContent>
                    <AtModalContent>
                        <View className="atModalShareBox">
                            <View className="atModalShareFriends" onClick={this.shareFriends}  animation="{{animationData}}"><View className="shareText">分享好友，一起砍价</View></View>
                        </View>
                    </AtModalContent>
                    
                </AtModal>
           </View>
       )
    }
}

export default Detail