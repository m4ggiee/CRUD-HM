function showRows(users) {
  for (let user of users) {
    showUserRow(user);
  }
}

function showUserRow(user) {
  const container = createElement('div', '#users', '', { 'data-user-id': user.id }); // container

  createElement('div', container, user.id); // idElement

  createElement('div', container, user.name + ' ' + user.lastName); // nameElement

  const actionsElement = createElement('div', container, '', { className: 'actions', 'data-id': user.id });

  createElement(
    'input',
    actionsElement,
    '',
    { type: 'button', value: 'Edit', 'data-type': 'edit' }
  ); // editBtnElement

  createElement(
    'input',
    actionsElement,
    '',
    { type: 'button', value: 'Delete', 'data-type': 'delete' },
    {
      click: handleDeleteUser
    }
  ); // deleteBtnElement

}

function showAddUserForm() {
  const parentSelector = '#form form';

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'login',
      type: 'text',
      placeholder: 'Enter login'
    }
  ); // login input

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter name'
    }
  ); // name input

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'lastName',
      type: 'text',
      placeholder: 'Enter last name'
    }
  ); // lastName input

  createElement(
    'input',
    parentSelector,
    '',
    {
      name: 'email',
      type: 'text',
      placeholder: 'Enter email'
    }
  ); // email input

  createElement(
    'input',
    parentSelector,
    '',
    {
      type: 'button',
      value: 'Save'
    },
    {
      click: handleSaveUser
    }
  );

}

function handleSaveUser() {
  const formElements = document.forms[0].elements;

  const login = formElements.login.value;
  const name = formElements.name.value;
  const lastName = formElements.lastName.value;
  const email = formElements.email.value;
  const userId = parseInt(event.target.getAttribute('data-id'));

  const user = {
    login,
    name,
    lastName,
    email,
    id: Date.now(), 
  };

  const isValid = validate(user);

  if (!isValid) {
        const error = document.querySelector('#error');
        cleanElement(error);
        error.innerText = 'Please, enter all required fields.';
  } else {
    if (userId) {
        editUser(user, userId);
     } else {
        saveUser(user);
    }
      cleanElement('#error');
      cleanElement('#form form');
  }
}

function validate(user) {
  if (user.login === '' || user.email === '' || user.name === '' || user.lastName === '') {
    return false;
  }

  return true;
}

function saveUser(newUser) {
  users.push(newUser);
  updateStorage();
  showUserRow(newUser);
}

function handleDeleteUser(event) {
  console.dir(event.target);
  const userId = event.target.parentNode.getAttribute('data-id');
  deleteUserById(+userId);
}

function deleteUserById(id) {
  const indexToRemove = users.findIndex(user => user.id === id);
  users.splice(indexToRemove, 1);
  removeElement(`div[data-user-id="${id}"]`);
  updateStorage();
}

function updateStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}