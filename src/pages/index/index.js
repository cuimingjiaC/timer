import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtTabBar ,AtIcon } from 'taro-ui'

import Cinema from '../cinema/'
import Match from '../match/'
import Movie from '../movie/'
import My from '../my/'
import Show from '../show/'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 2
    }
  }

  handleClick(current) {
    this.setState({
      current
    })
  }
  

  render () {

    return (
      <View className='index'>
      
     { this.state.current === 0 && <Cinema/> }
     { this.state.current === 1 && <Match/> }
     { this.state.current === 2 && <Movie/> }
     { this.state.current === 3 && <My/> }
     { this.state.current === 4 && <Show/> }

      <AtTabBar
          tabList={[
            { title: '影院', iconType: 'iconfont icon-favor', color: '#ff0000',},
            { title: '电影', iconType: 'iconfont icon-emoji' },
            { title: '演出', iconType: 'iconfont icon-home' },
            { title: '赛事', iconType: 'iconfont icon-like' },
            { title: '我的', iconType: 'iconfont icon-my' },
          ]}
          fixed
          color='#333333'
          selectedColor='#fe403a'
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}

export default Index
