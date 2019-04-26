import Taro, { Component } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'

class SearchBar extends Component {

    constructor () {
        super(...arguments)
        this.state = {
          value: ''
        }
      }
      onChange (value) {
        this.setState({
          value: value
        })
      }
      onActionClick () {
        console.log('开始搜索')
      }

      render () {
        return (
          <View>
            <AtSearchBar
                showActionButton
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onActionClick={this.onActionClick.bind(this)}
            />
          </View>
        )
      }
}

export default SearchBar