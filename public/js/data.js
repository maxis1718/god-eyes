// constants
let QUEUE_SIZE = 30
let CONSUME_DELAY = 200
let EXTRACT_DELAY = 3000

function handleMsg(msg) {
  if (VISIBLE) {
    addData(msg.pub, msg.subs);
  }
}

// Get a reference to the database service
var mockGeoMap = []
var database = firebase.database()
console.log('>>> [firebase] connect')
var starCountRef = firebase.database().ref('events')
console.log('>>> [firebase] subscribe')
starCountRef.on('value', function(data) {
  Object.values(data.val()).forEach(function(d) {
    mockGeoMap.push({
      channel: d.id,
      eventType: d.eventType || 'message',
      lat: parseFloat(d.rLatitude),
      lng: parseFloat(d.rLongitude),
      geos: []
    })
    mockGeoMap.push({
      channel: d.id,
      eventType: d.eventType || 'message',
      lat: null,
      lng: null,
      geos: [[parseFloat(d.sLatitude), parseFloat(d.sLongitude)]]
    })
  })
})

var k;
var z = setInterval(function() {
  // extract pub/sub every 3000 ms
  var x = exPubSub(mockGeoMap);
  // mockGeoMap = [];
  var count = 0;
  clearInterval(k);
  // addData every 500 ms
  k = setInterval(function() {
    if (count >= QUEUE_SIZE) {
      clearInterval(k);
    }
    if (typeof(x[count]) === "undefined") {
      clearInterval(k);
    }
    else {
      handleMsg(x[count]);
      count++;
    }
  }, CONSUME_DELAY);
}, EXTRACT_DELAY);
