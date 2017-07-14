var MSG_SPEED_UP = 60
var LESSON_SPEED_UP = 60

function buildMessageLink(msg) {
  if (VISIBLE) {
    addData(msg.pub, msg.subs);
  }
}

// Get a reference to the database service
// var database = firebase.database()
// console.log('>>> [firebase] connect')
// var starCountRef = firebase.database().ref('events')

var msgState = {
  firstEventTriggerTime: null,
  firstMsgTime: null
}

firebaseData.message.forEach(dataVal => {
  if (msgState.firstEventTriggerTime) {
    var dis = new Date(dataVal.createdAt).getTime() - msgState.firstMsgTime.getTime()
    var sendWhen = (msgState.firstEventTriggerTime.getTime() + dis) - new Date().getTime()
    setTimeout(function(){
      handleMsg(dataVal);
    }, sendWhen / MSG_SPEED_UP)
  } else{
    handleMsg(dataVal);
    msgState.firstEventTriggerTime = new Date()
    msgState.firstMsgTime = new Date(dataVal.createdAt)
  }
})

var lessonState = {
  firstEventTriggerTime: null,
  firstLessonTIme: null
}

firebaseData.lesson.forEach(dataVal => {
  if (lessonState.firstEventTriggerTime) {
    var dis = new Date(dataVal.createdAt).getTime() - lessonState.firstMsgTime.getTime()
    var sendWhen = (lessonState.firstEventTriggerTime.getTime() + dis) - new Date().getTime()
    setTimeout(function(){
      handleLesson(dataVal);
    }, sendWhen / LESSON_SPEED_UP)
  } else{
    handleLesson(dataVal);
    msgState.firstEventTriggerTime = new Date()
    msgState.firstMsgTime = new Date(dataVal.createdAt)
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

function handleMsg(data) {
  var mockGeoMap = msgGenerator(data)
  var x = exPubSub(mockGeoMap)
  for(var count = 0 ; count < x.length ; count++) {
    buildMessageLink(x[count])
  }
}

function handleLesson(data) {
  appPointData({
    lat: data.sLatitude,
    lng: data.sLongitude,
    amount: data.amount
  })
}
