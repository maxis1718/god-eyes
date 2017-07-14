function handleMsg(msg) {
  if (VISIBLE) {
    addData(msg.pub, msg.subs);
  }
}

// Get a reference to the database service
var mockGeoMap = []
var database = firebase.database()
var starCountRef = firebase.database().ref('events')
starCountRef.on('value', function(data) {
  Object.values(data.val()).forEach(function(d) {
    mockGeoMap.push({
      channel: d.id,
      lat: parseFloat(d.rLatitude),
      lng: parseFloat(d.rLongitude),
      geos: []
    })
    mockGeoMap.push({
      channel: d.id,
      lat: null,
      lng: null,
      geos: [[parseFloat(d.sLatitude), parseFloat(d.sLongitude)]]
    })
  })
})

var k;
var z = setInterval(function() {
  var x = exPubSub(mockGeoMap);
  // mockGeoMap = [];
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
