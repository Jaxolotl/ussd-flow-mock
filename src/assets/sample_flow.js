
/**
 * FLOW DEFINITION
 */


const displayHomeMenu = () => {
  return render({
    content: `Menu
    ${datasetToList(home)}`,
    dataset: home
  })
}

const displaySenders = () => {
  return render({
    content: `Enter sender
    ${datasetToList(senders)}`,
    dataset: senders
  })
}

const displayReceivers = () => {
  return render({
    content: `Enter receiver
    ${datasetToList(receivers)}`,
    dataset: receivers
  })
}

const displayPickupLocations = () => {
  return render({
    content: `Enter pickup location
    ${datasetToList(pickUpLocations)}`,
    dataset: pickUpLocations
  })
}

const displayDropOffLocations = () => {
  return render({
    content: `Enter drop off location
    ${datasetToList(dropOffLocations)}`,
    dataset: dropOffLocations
  })
}

const displayGoods = () => {
  return render({
    content: `Select what's being shipped
    ${datasetToList(goods)}`,
    dataset: goods
  })
}

const displayThanks = () => {
  return render({
    content: "Thank you for requesting a shipment",
    status: 'final'
  })
}

const displayArbitrarySender = () => {
  return render({
    content: "Enter sender phone number",
    dataset: displayPickupLocations,
    status: 'answerStandby'
  })
}

const displayArbitraryReceiver = () => {
  return render({
    content: "Enter receiver phone number",
    dataset: displayDropOffLocations,
    status: 'answerStandby'
  })
}

const home = [
  null,
  { title: "Request a shipment", confirm: displaySenders },
  { title: "Check shipment status" },
  { title: "Repeat recent jobs" },
  { title: "Register new user or location" },
  { title: "Help / Other services" },
]

const people = [
  { title: "Me", },
  { title: "Doreen Gashuga" },
  { title: "Pacific Tuyishime" },
  { title: "Angelique Kantengwa" },
  { title: "Viola Dub" },
  { title: "Manuel Arzuah" },
]

const senders = [
  ...people.map(item => { return { ...item, confirm: displayPickupLocations } }),
  { title: "Someone else", confirm: displayArbitrarySender },
]

const receivers = [
  ...people.map(item => { return { ...item, confirm: displayDropOffLocations } }),
  { title: "Someone else", confirm: displayArbitraryReceiver },
]

const locations = [
  { title: "Saved location 1" },
  { title: "Saved location 2" },
  { title: "Saved location 3" },
  { title: "Find public location near me" },
  { title: "Enter a location code" },
  { title: "MTN branch code" },
]

const pickUpLocations = [
  ...locations.map(item => { return { ...item, confirm: displayReceivers } }),
]

const dropOffLocations = [
  ...locations.map(item => { return { ...item, confirm: displayGoods } }),
]

const goods = [
  { title: "Loose goods", confirm: displayThanks, },
  { title: "Packaged goods", confirm: displayThanks, },
  { title: "Livestock", confirm: displayThanks, },
  { title: "Unusual shapes", confirm: displayThanks, },
]
