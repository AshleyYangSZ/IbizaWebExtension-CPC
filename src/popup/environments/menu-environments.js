/// Startup code
var activeEnv = "";
var urltInputs =
  '<tr><td><input type="url" placeholder="From"></td>' +
  '<td><input type="url" placeholder="To"></td></tr>';

var usertInputs =
  '<tr><td><input type="email"></td>' +
  '<td><input type="password"></td></tr>';

$('form').on('submit', function(event) {
  newEnvironment($('#newEnvironment').val());
  $('#newEnvironment').val('');
  event.preventDefault();
});

// Hide table change button
$('#saveAllChanges').hide();

/// Functions
// Click handler
var clickHandler = function(click) {
  var target = click.target;
  if (target.className === "pure-menu-link") {
    changeActiveEnvironment(target);
  }
  else if (target.id === "saveAllChanges") {
    saveAllChanges();
  }
  else if (target.className === "pure-button close-button") {
    deleteEnvironment(target);
  }
};
document.addEventListener("click", clickHandler);

// Change active environment
function changeActiveEnvironment(target) {
  // If target is current, take no action
  if (target === activeEnv) {
    return;
  }
  // disable last active
  else if (activeEnv) {
    $(activeEnv).removeClass('selected');
    $(activeEnv.nextSibling.nextSibling).removeClass('active');
  }

  // set new active
  activeEnv = target;
  $(target).addClass('selected');
  $(target.nextSibling.nextSibling).addClass('active');
}

// Save from localStorage chrome.storage.sync

// Load from localStorage

// Add new env to localStorage and menu
function newEnvironment(name) {
  // build the section header
  var $listItem = $('<li />').addClass('pure-menu-item');
  var $link = $('<a>' + name + '</a>').addClass('pure-menu-link');
  var $close = $('<button>X</button>').addClass('pure-button close-button');
  $listItem.append($link);
  $listItem.append($close);

  // build the URL redirection table
  var $urlTable = $('<table></table>').attr('id', 'url' + name).addClass('pure-table pure-table-bordered url-table');
  var $urltHead = $('<thead><tr><th>From</th><th>To</th></tr></thead>');
  $urlTable.append($urltHead);
  var $urltBody = $('<tbody></tbody>');
  $urltBody.append($(urltInputs));
  $urlTable.append($urltBody);
  $listItem.append($urlTable);

  // build the User table
  var $userTable = $('<table></table>').attr('id', 'user' + name).addClass('pure-table pure-table-bordered user-table');
  var $usertHead = $('<thead><tr><th>User</th><th>Password</th></tr></thead>');
  $userTable.append($usertHead);
  var $usertBody = $('<tbody></tbody>');
  $usertBody.append($(usertInputs));
  $userTable.append($usertBody);
  $listItem.append($userTable);

  $('#envList').append($listItem);

  // Add a new row on change
  $('input', $urlTable).on('change', function() {
    addTableRow($urlTable);
  });
  $('input', $userTable).on('change', function() {
    addTableRow($userTable);
  });
}

// Add a new row to the active table
function addTableRow($table) {
  // only add new row if the bottom row is changed
  if ($('tr:last input', $table).val() !== '') {
    $('tbody', $table).append($($table).hasClass('url-table') ? $(urltInputs): $(usertInputs));
  }

  // add the change event to the new row
  $('input', $table).on('change', function() {
    addTableRow($table);
  });

  $('#saveAllChanges').show();
}

// Add new item to localStorage and menu
function saveAllChanges() {
  // iterate over the input fields
  $('table tbody tr td input').each(function (i) {

  });

  $('#saveAllChanges').hide();
}

// Delete env (and items) from localStorage and menu
function deleteEnvironment(target) {
  // delete from localStorage

  // delete from menu
  $(target.parentElement).remove();
}

// Delete item from localStorage and menu

// Stretch: Import as JSON

// Stretch: Export as JSON
