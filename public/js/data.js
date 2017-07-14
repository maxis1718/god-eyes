function handleMsg(msg) {
  if (VISIBLE) {
    addData(msg.pub, msg.subs);
  }
}

let mockGeoMap = [{
  // sub
  channel: 'kerker',
  lat: 25,
  lng: 121,
  geos: []
}, {
  // sub
  channel: 'kerker',
  lat: 25,
  lng: 121,
  geos: []
}, {
  // sub
  channel: 'kerker',
  lat: 25,
  lng: 121,
  geos: []
}, {
  // pub
  channel: 'kerker',
  lat: null,
  lng: null,
  geos: [[25, 121], [25, 121], [25, 121]]
}]

var pubnub = PUBNUB.init({
  publish_key   : "demo",
  subscribe_key : "e19f2bb0-623a-11df-98a1-fbd39d75aa3f",
  ssl           : true
});
var timeStamps = [];
pubnub.subscribe({
  channel  : "rts-xNjiKP4Bg4jgElhhn9v9-geo-map",
  callback : function(msg){
    // console.log('>>> msg:', msg.geo_map.filter(x => x.geos.length > 0))
    // msg.map(x => x.channel)
    // timeStamps = timeStamps.concat(msg.geo_map);
    // console.log('>> msg.geo_map:', msg.geo_map)
    timeStamps = mockGeoMap
  }
});
var k;
var z = setInterval(function() {
  var x = exPubSub(timeStamps);
  timeStamps = [];
  var count = 0;
  clearInterval(k);
  k = setInterval(function() {
    if (count >= 30) {
      clearInterval(k);
    }
    if (typeof(x[count]) === "undefined") {
      clearInterval(k);
    }
    else {
      handleMsg(x[count]);
      count++;
    }
  }, 100);
}, 3000);
