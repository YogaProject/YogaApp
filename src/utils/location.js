/* eslint-disable no-irregular-whitespace */
export function getLocation () {
  var _this = this
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // locationSuccess 获取成功的话
      function (position) {
        _this.getLongitude = position.coords.longitude // position就是我们通过api获取的信息，而我们想获取的经纬度就在coords下，随后将经纬度分别赋值给外部data设定好的变量
        _this.getLatitude = position.coords.latitude // 记住如果这里直接写this可能会导致找不到外部的变量而报错，所以提前设置一下this的指向
        alert(_this.getLatitude)　　　　　　　　　　　　　　 // 弹出经度测试
      },
      // locationError  获取失败的话
      function (error) {
        var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时']
        alert(errorType[error.code - 1])
      }
    )
  }
}
