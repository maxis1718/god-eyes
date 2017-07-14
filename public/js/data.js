function buildMessageLink(msg) {
  if (VISIBLE) {
    addData(msg.pub, msg.subs);
  }
}

// Get a reference to the database service
var database = firebase.database()
console.log('>>> [firebase] connect')
var starCountRef = firebase.database().ref('events')

var msgState = {
  lastEventTriggerTime: null,
  lastMsgTime: null
}
starCountRef.on('value', function(data) {
  var dataVal = data.val()
  if(dataVal.eventType == 'message') {
    if(msgState.lastEventTriggerTime){
      var dis = new Date(dataVal.createdAt).getTime() - msgState.lastMsgTime.getTime()
      var sendWhen = (msgState.lastEventTriggerTime.getTime() + dis) - new Date().getTime()
      console.log(sendWhen)
      setTimeout(function(){
        handleMsg(dataVal);
      }, sendWhen)
    }else{
      handleMsg(dataVal);
    }
    msgState.lastEventTriggerTime = new Date()
    msgState.lastMsgTime = new Date(dataVal.createdAt)
  }
})

function msgGenerator(d) {
  var mockMsg = []
  mockMsg.push({
    channel: d.id,
    lat: parseFloat(d.rLatitude),
    lng: parseFloat(d.rLongitude),
    geos: []
  })
  mockMsg.push({
    channel: d.id,
    lat: null,
    lng: null,
    geos: [[parseFloat(d.sLatitude), parseFloat(d.sLongitude)]]
  })
  return mockMsg
}

function handleMsg(data){
  var mockGeoMap = msgGenerator(data)
  var x = exPubSub(mockGeoMap)
  for(var count = 0 ; count < x.length ; count++) {
    buildMessageLink(x[count])
  }
}
