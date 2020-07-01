

/**
 * FLOW DEFINITION
 */


const displayHomeMenu = () => {
  render({
    content: `Menu
    ${datasetToList(home)}`,
    dataset: home
  })
}

const displaySenders = () => {
  render({
    content: `Enter sender
    ${datasetToList(senders)}`,
    dataset: senders
  })
}

const displayReceivers = () => {
  render({
    content: `Enter receiver
    ${datasetToList(receivers)}`,
    dataset: receivers
  })
}

const displayPickupLocations = () => {
  render({
    content: `Enter pickup location
    ${datasetToList(pickUpLocations)}`,
    dataset: pickUpLocations
  })
}

const displayDropOffLocations = () => {
  render({
    content: `Enter drop off location
    ${datasetToList(dropOffLocations)}`,
    dataset: dropOffLocations
  })
}

const displayGoods = () => {
  render({
    content: `Select what's being shipped
    ${datasetToList(goods)}`,
    dataset: goods
  })
}

const displayThanks = () => {
  render({
    content: "Thank you for requesting a shipment",
    dataset: 'thanks'
  })
}

const home = [
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
  { title: "Someone else" },
]

const receivers = [
  ...people.map(item => { return { ...item, confirm: displayDropOffLocations } }),
  { title: "Someone else" },
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

/**
 * utils
 */

const datasetToList = dataset => dataset.map((item, index) => `${index}: ${item.title}`).join('\n');

/**
 * DEFAULT RENDERING FUNCTIONS
 */

const displayError = () => {
  render({
    content: ":( oops, please try again",
  })
}

const showOverlay = ({ content, status = 'transition' } = {}) => {
  $('.app')
    .find('.overlay').html(content).show()
    .end()
    .attr('data-status', status);
}

const hideOverlay = ({ status = 'options' } = {}) => {
  $('.app')
    .find('.overlay').html('').hide()
    .end()
    .attr('data-status', status);
}

const answerIdle = () => {
  showOverlay({
    content: 'Insert option number',
    status: 'answerIdle'
  })
}

const answering = value => {
  showOverlay({
    content: value,
    status: 'answering'
  })
}

const answer = (index, dataset) => {

  const confirmAction = dataset[index] && dataset[index].confirm;

  if (!confirmAction) {
    return false;
  }

  confirmAction();
  return true;
}

const render = ({ content, dataset, showTransition = true } = {}) => {
  $('.app')
    .find('.content').html(content)
    .end()
    .data('dataset', dataset);
}

/**
 * UI BINDINGS
 */

$(() => {
  displayHomeMenu()
  $('.numPad').on('click.numPad', '.btn', event => {

    const status = $('.app').attr('data-status');

    switch (status) {
      case 'answerIdle':
      case 'answering':
        const index = $(event.target).attr('data-action');
        answering(index)
        break;
    }


  })

  $('.navPad .confirm').on('click.confirm', event => {
    switch ($('.app').attr('data-status')) {
      case 'options':
        answerIdle()
        break;
      case 'answering':
        const value = $('.overlay').text();
        const dataset = $('.app').data('dataset');
        answer(value, dataset) || alert('unavailable option');

        hideOverlay();
        break;
    }
  })

  $('.navPad .cancel').on('click.confirm', event => {
    switch ($('.app').attr('data-status')) {
      case 'answerIdle':
        hideOverlay()
        break;
      case 'answering':
        answerIdle()
        break;
      default:
        displayHomeMenu()
        break;
    }
  })
});
