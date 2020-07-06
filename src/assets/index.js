

/**
 * utils
 */

const DEFAULT_STATUS = `options`;

const datasetToList = (dataset = []) => dataset.map((item, index) => item && `${index}: ${item.title}`).filter(item => item).join('\n');

/**
 * DEFAULT RENDERING FUNCTIONS
 */

const displayError = async (message = `:( oops, please try again`) => {
  return await showOverlay({
    content: message,
    status: `error`
  })
}

const answerIdle = async (message = `Insert option number`) => {
  return await showOverlay({
    content: message,
    status: `answerIdle`
  });
}

const answering = async (value) => {
  return await showOverlay({
    content: value,
    status: `answering`
  });
}

const answer = (index, dataset = []) => {

  const confirmAction = dataset[index] && dataset[index].confirm;

  if (!confirmAction) {
    return Promise.reject(`:( 
      Error selecting option ${index}.
      
      Please try again.`);
  }

  return confirmAction();
}

const setStatus = async status => {
  $('.app').attr('data-status', status)
  return status;
};

const showOverlay = async ({ content = '', status = DEFAULT_STATUS } = {}) => {
  $('.app')
    .find('.overlay').html(content).show();

  return { content, status };
}

const hideOverlay = async ({ status = DEFAULT_STATUS } = {}) => {
  $('.app')
    .find('.overlay').html('').hide();

  return { status };
}

const showTransition = async ({ transitionSpeed = 1000 } = {}) => {
  await showOverlay({ content: `CONNECTING ...`, status: `transition` }).then(({ status }) => setStatus(status));
  await new Promise(resolve => setTimeout(resolve, transitionSpeed));
  await hideOverlay();

  return;
}

const render = async ({ content = '', dataset = [], status = DEFAULT_STATUS } = {}) => {

  await showTransition();

  $('.app')
    .find('.content').html(content)
    .end()
    .data('dataset', dataset);

  return { content, dataset, status }
}

/**
 * UI BINDINGS
 */

$(() => {
  displayHomeMenu().then(({ status }) => setStatus(status));

  $('.numPad').on('click.numPad', '.btn', event => {

    const status = $('.app').attr('data-status');

    switch (status) {
      case 'answerIdle':
      case 'answering':
        {
          const index = $(event.target).attr('data-action');
          answering(index).then(({ status }) => setStatus(status))
        }
        break;
    }
  })

  $('.navPad').on('click.confirm', '.confirm', event => {

    const status = $('.app').attr('data-status');

    switch (status) {
      case DEFAULT_STATUS:
        answerIdle().then(({ status }) => setStatus(status));
        break;
      case 'answering':
        {
          const value = $('.overlay').text();
          const dataset = $('.app').data('dataset');

          answer(value, dataset)
            .then(({ status }) => hideOverlay({ status }))
            .catch(reason => {
              return displayError(reason)
                .then(({ status }) => setStatus(status))
                .then(() => new Promise(resolve => setTimeout(resolve, 3000)))
                .then(hideOverlay);
            })
            .then(({ status }) => setStatus(status));
        }
        break;
    }
  }).on('click.confirm', '.cancel', event => {
    const status = $('.app').attr('data-status');

    switch (status) {
      case 'answerIdle':
        hideOverlay().then(({ status }) => setStatus(status));
        break;
      case 'answering':
        answerIdle().then(({ status }) => setStatus(status));
        break;
      default:
        displayHomeMenu().then(({ status }) => setStatus(status))
        break;
    }
  })
});
