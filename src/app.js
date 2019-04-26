import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
import './icon.css'

class App extends Component {

  config = {
    pages: [
      "pages/index/index",
      "pages/detail/index",
      "pages/detailMap/index",
    ]
  }

  render () {
    return (
        <Index />
    )
  }
}

export default App