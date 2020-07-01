

/**
 * utils
 */

const datasetToList = dataset => dataset.map((item, index) => `${index}: ${item.title}`).join('\n');

/**
 * DEFAULT RENDERING FUNCTIONS
 */

const displayError = (message = `:( oops, please try again`) => {
  showOverlay({
    content: message,
    status: `error`
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

const answerIdle = (message = `Insert option number`) => {
  showOverlay({
    content: message,
    status: `answerIdle`
  })
}

const answering = value => {
  showOverlay({
    content: value,
    status: `answering`
  })
}

const answer = (index, dataset) => {

  const confirmAction = dataset[index] && dataset[index].confirm;

  if (!confirmAction) {
    return Promise.reject(`:( 
      Error selecting option ${index}.
      
      Please try again.`);
  }

  return Promise.resolve(confirmAction());
}

const render = ({ content, dataset } = {}) => {
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

  $('.navPad').on('click.confirm', '.confirm', event => {

    const status = $('.app').attr('data-status');

    switch (status) {
      case 'options':
        answerIdle()
        break;
      case 'answering':
        const value = $('.overlay').text();
        const dataset = $('.app').data('dataset');

        answer(value, dataset)
          .then(() => hideOverlay())
          .catch(reason => {
            displayError(reason);
            setTimeout(hideOverlay, 3000)
          });

        break;
    }
  }).on('click.confirm', '.cancel', event => {
    const status = $('.app').attr('data-status');

    switch (status) {
      case 'answerIdle':
        hideOverlay();
        break;
      case 'answering':
        answerIdle();
        break;
      default:
        displayHomeMenu()
        break;
    }
  })
});
