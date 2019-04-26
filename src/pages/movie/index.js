import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { AtSearchBar, AtToast} from 'taro-ui'
import { Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import SearchBar from '../../components/search/SearchBar'
import './movie.scss'
import fetch from '../../utils/fetch-data'

import img1 from '../../assets/images/01.png'
import img2 from '../../assets/images/02.png'
import img3 from '../../assets/images/03.png'
import img4 from '../../assets/images/04.png'
import img5 from '../../assets/images/05.png'
import img6 from '../../assets/images/06.png'
import img7 from '../../assets/images/07.png'
import img8 from '../../assets/images/08.png'
import img9 from '../../assets/images/09.png'
import img10 from '../../assets/images/10.png'
import imgad from '../../assets/images/ad.jpg'
import imgMedal from '../../assets/images/medal.png'

class Movie extends Component {

  constructor () {
    super()
    this.state = {
      value: '1',
      swiperList: [],
      recommendList:[],
      height: wx.getSystemInfoSync().windowHeight-62,
      isOpened: false,
      isBottom: false,
      animationData: null
    }
    this.fetchData({})    
  }

  async fetchData() {
    let swiperResult = await fetch({url:'http://localhost:9000/data'})
    let recommendList = (await fetch({url:'http://localhost:9001/data'})).data

    let swiperList = swiperResult.data.map(value => value.imgUrl)
    this.setState({
      swiperList,
      recommendList
    })
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  onActionClick () {
  }

  onScrolltoupper(){
  }

  onScroll() {
  }

  async onScrollToLower(){
    if(this.state.recommendList.length>19){
      this.setState({
        isBottom: true
      })
    } else {
      this.setState({
        isOpened:true
      })
      setTimeout(async()=>{
        let list = (await fetch({url:'http://localhost:9001/data'})).data
        this.setState({
          recommendList: [...this.state.recommendList,...list],
          isOpened:false
        })
      },100)
    }
  }

  clickItemhandler(id){
    console.log(id)
    Taro.navigateTo({
      url:`../detail/index?id=${id}`
    })
  }

  componentWillMount() {

    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      transformOrigin: '75% 50% 0'
    })

    this.animation = animation

    this.setState({
      animationData: animation.export()
    })
    var n = 1;
   //连续动画需要添加定时器,所传参数每次+1就行
    setInterval(function () {
      n=-n;
      this.animation.rotateY(60 * (n)).step()
      this.setState({
        animationData: this.animation.export()
      })
    }.bind(this), 1000)
  }

  render () {
    return (
      <ScrollView
        className='movieContainer'
        scrollY
        scrollWithAnimation
        scrollTop='0'
        style={`height: ${this.state.height}px;`}
        lowerThreshold='20'
        upperThreshold='20'
        onScrolltoupper={this.onScrolltoupper}
        onScrollToLower={this.onScrollToLower}
        onScroll={this.onScroll}>
          <View className="header">
            <View className="cityChoose"><Text>北京</Text></View>
            <View className="searchBar">
              <SearchBar></SearchBar>
            </View>
          </View>

          <View class="swiper-container">
            <Swiper
              className='test-h'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay
            >
            {
              this.state.swiperList.map((item, index) => (
                <SwiperItem key={index}>
                  <View>
                    <Image src={item}></Image>
                  </View>
                </SwiperItem>
              ))
            }
            </Swiper>
          </View>

          <View className="classify">
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img1}></Image>
              </View>
              <View>演唱会</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img2}></Image>
              </View>
              <View>话剧歌剧</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img3}></Image>
              </View>
              <View>休闲展览</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img4}></Image>
              </View>
              <View>音乐会</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img5}></Image>
              </View>
              <View>戏曲艺术</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img6}></Image>
              </View>
              <View>亲子/舞蹈</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img7}></Image>
              </View>
              <View>音乐节</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img8}></Image>
              </View>
              <View>开心麻花</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img9}></Image>
              </View>
              <View>就这样</View>
            </View>
            <View class="classifyItem">
              <View class="imgContainer">
                <Image src={img10}></Image>
              </View>
              <View>更多精彩</View>
            </View>
          </View>
          
          <View class="adContainer">
            <View class="adImg">
              <Image src={imgad}/>
            </View>
          </View>

          <View className="findContainer">
              <Image src={imgMedal} className="smallLeftIcon"  animation="{{animationData}}"/>
              <Text>-发现精彩-</Text>
              <Image src={imgMedal} className="smallRightIcon" animation="{{animationData}}"/>
          </View>

          <View>
            {
              this.state.recommendList.map(value => {
                return (
                  <View className="recommendItem" key={value.id} onClick={this.clickItemhandler.bind(this,value.id)}>
                    <View className="imgLeftCon"> 
                      <Image src={value.verticalPic}/>
                    </View> 
                    <View className="infoRightCon">
                      <View className="title">{value.name}</View>
                      <View className="time">{value.showTime}</View>
                      <View className="address">{value.venueName}</View>
                    </View>
                  </View>
                )
              })
            }
              
          </View>

        <AtToast isOpened={isOpened} status="loading"></AtToast>
        <AtToast isOpened={isBottom} text="到底了" duration={300}></AtToast>
    </ScrollView>
    )
  }
}

export default Movie

