const $container = $('.header-col-title');

const $menu = $('<div class="dropdown-menu dropdown-menu-right"></div>');
const $element = $('<div class="menu-responsive dropdown d-xl-none"></div>')
  .append($('<button class="btn dropdown-toggle" type="button" data-toggle="dropdown">'))
  .append($menu);

$('.header-menu a').each((i, element) => {
  $(element).clone().addClass('dropdown-item').appendTo($menu);
})

$menu.append($('<div class="dropdown-divider"></div>'));

$('.lang-switcher .dropdown-item').clone().appendTo($menu);

$container.append($element);
