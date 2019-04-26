import Taro, { Component } from '@tarojs/taro'

class DetailMap extends Component {

    constructor() {
        console.log(1,this.$router.params)
        this.state = {
            longitude:this.$router.params.longitude,
            latitude:this.$router.params.latitude
        }
    }
    componentWillMount() {
        console.log(2,this.$router.params)
        // this.productId = this.$router.params.id;
        // this.fetchData(this.productId)
    }

    render() {
        return (
            <View>
                <map
                id="map"
                longitude={this.state.longitude}
                latitude={this.state.latitude}
                scale="14"
                controls="{{controls}}"
                bindcontroltap="controltap"
                markers="{{markers}}"
                bindmarkertap="markertap"
                polyline="{{polyline}}"
                bindregionchange="regionchange"
                show-location
                style="width: 100%; height: 300px;"
                ></map>
            </View>
        )
    }
   
}

export default DetailMap