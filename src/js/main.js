// eslint-disable-next-line import/no-extraneous-dependencies
// import 'core-js/stable'; // ES Polyfills, include only if needed... around 200k minimized!
import './responsiveMenu';
import ApplicationDetailsModal from './applicationDetailsModal';

if (window.MathsEverywhere.applications) {
  window.MathsEverywhere.applicationsById = Object.fromEntries(
    window.MathsEverywhere.applications.map(each => [each.id, each])
  );
}

const modal = new ApplicationDetailsModal();

// If the modal closes we change the URL. This breaks encapsulation
// but adding an extra event is overkill at this point.
modal.$modal.on('hidden.bs.modal', () => {
  if (window.history.pushState) {
    window.history.pushState(null, null, '#');
  } else {
    window.location.hash = '';
  }
});

/**
 * Redraw the view based on the route
 */
function update() {
  if (window.location.hash.length > 0) {
    const applicationID = window.location.hash.replace('#', '');
    if (window.MathsEverywhere.applicationsById[applicationID] !== undefined) {
      const application = window.MathsEverywhere.applicationsById[applicationID];
      modal.show(application);
    }
  } else {
    modal.hide();
  }
}

$(window).on('hashchange', () => {
  update();
});
update();

// Change the internal links so instead of the default internal
// navigation they change the hash via "location.replace". This
// changes how navigation history is created. If you
// click on an application, close it, open another, close it, etc.
// and then navigate via the back button several times you'll
// go through all the seen applications instead of seeing
// home, application, home, application, etc.
$('.application a').each((i, appLink) => {
  $(appLink).on('click', (ev) => {
    ev.preventDefault();
    window.location.replace($(appLink).attr('href'));
    return false;
  });
});
