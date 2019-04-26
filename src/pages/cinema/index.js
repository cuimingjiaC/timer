import Taro, { Component } from '@tarojs/taro'
import './cinema.scss'

class Cinema extends Component {
    render() {
        return (
            
                <View class="cinemaContainer">
                    <View class="search-container">
                        <View class="choose-city">
                            <span>北京</span>
                        </View>
                        <View>
                            <View>
                                <span class="iconfont icon-like"></span>
                            </View>
                        </View>
                    </View>
                </View>
            
        )
    }
}

export default Cinema