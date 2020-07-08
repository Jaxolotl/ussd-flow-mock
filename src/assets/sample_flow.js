
/**
 * FLOW DEFINITION
 */

function displayHomeMenu () {
  return render({
    content: `Menu
    ${datasetToList(home)}`,
    dataset: home
  })
}

function displaySenders () {
  return render({
    content: `Enter sender
    ${datasetToList(senders)}`,
    dataset: senders
  })
}

function displayReceivers()  {
  return render({
    content: `Enter receiver
    ${datasetToList(receivers)}`,
    dataset: receivers
  })
}

function displayPickupLocations () {
  return render({
    content: `Enter pickup location
    ${datasetToList(pickUpLocations)}`,
    dataset: pickUpLocations
  })
}

function displayDropOffLocations () {
  return render({
    content: `Enter drop off location
    ${datasetToList(dropOffLocations)}`,
    dataset: dropOffLocations
  })
}

function displayGoods () {
  return render({
    content: `Select what's being shipped
    ${datasetToList(goods)}`,
    dataset: goods
  })
}

function displayThanks () {
  return render({
    content: "Thank you for requesting a shipment",
    status: 'final'
  })
}

function displayArbitrarySender () {
  return render({
    content: "Enter sender phone number",
    dataset: displayPickupLocations,
    status: 'answerStandby'
  })
}

function displayArbitraryReceiver () {
  return render({
    content: "Enter receiver phone number",
    dataset: displayDropOffLocations,
    status: 'answerStandby'
  })
}

var home = [
  null,
  { title: "Request a shipment", confirm: displaySenders },
  { title: "Check shipment status" },
  { title: "Repeat recent jobs" },
  { title: "Register new user or location" },
  { title: "Help / Other services" },
]

var people = [
  { title: "Me", },
  { title: "Doreen Gashuga" },
  { title: "Pacific Tuyishime" },
  { title: "Angelique Kantengwa" },
  { title: "Viola Dub" },
  { title: "Manuel Arzuah" },
]

var senders = [
  ...people.map(item => { return { ...item, confirm: displayPickupLocations } }),
  { title: "Someone else", confirm: displayArbitrarySender },
]

var receivers = [
  ...people.map(item => { return { ...item, confirm: displayDropOffLocations } }),
  { title: "Someone else", confirm: displayArbitraryReceiver },
]

var locations = [
  { title: "Saved location 1" },
  { title: "Saved location 2" },
  { title: "Saved location 3" },
  { title: "Find public location near me" },
  { title: "Enter a location code" },
  { title: "MTN branch code" },
]

var pickUpLocations = locations.map(item => { return { ...item, confirm: displayReceivers } });

var dropOffLocations = locations.map(item => { return { ...item, confirm: displayGoods } });

var goods = [
  { title: "Loose goods", confirm: displayThanks, },
  { title: "Packaged goods", confirm: displayThanks, },
  { title: "Livestock", confirm: displayThanks, },
  { title: "Unusual shapes", confirm: displayThanks, },
]
