/*
    Variable Stores information on whether or not we are currently adding a new subscriber to the list

    Used in: addUser()
    Updated in: toggleListAndForm()
*/
let isAdditionInProgress = false;

/**
 * Clears the inputs on the page
 * Returns Nothing
 *
 * Called By: toggleListAndForm()
 * Calls: No Functions
 * References: No Functions */
function clearInputs() {
    document.getElementById('name').value = document.getElementById('phone').value = '';
}
/**
 * Takes one input of Boolean type
 * Returns nothing
 * Used to toggle between the display properties of the Table (#subscriber-list) and the form (#add-subscriber)
 *
 * Called By: addUser(), click event on Back button
 * Calls: No Functions
 * References: No FUnctions */
function toggleListAndForm(value) {
    if(value) {
        clearInputs();

        document.getElementById('add-subscriber').style.display = 'block';
        document.getElementById('subscriber-list').style.display = 'none';

        //Changes Title in Nav-bar when we show the form
        document.getElementsByClassName('navbar-brand')[0].textContent = 'Add Subscriber';
    } else {
        document.getElementById('add-subscriber').style.display = 'none';
        document.getElementById('subscriber-list').style.display = 'block';

        //Switched Title in Nav-bar back to normal
        document.getElementsByClassName('navbar-brand')[0].textContent = 'Phone Directory';
    }

    //Used to toggle the value so the addUser() function works as expected
    isAdditionInProgress = value;
}

/**
 * Takes no Input
 * Returns Nothing
 * Used as a TextWatcher on the Name input field
 * Updates the Subscriber to be added Name text (#name-text)
 *
 * Called by: Change event on phone input field (onchange, onkeypress, onpaste, oninput)
 * Calls: No Functions
 * References: No Functions */
function onNameChanged() {
    let name = document.getElementById('name').value;
    document.getElementById('name-text').textContent = 'Name: ' + name;
}
/**
 * Takes no Input
 * Returns Nothing
 * Used as a TextWatcher on the Phone input field
 * Updates the Subscriber to be added Phone text (#phonr-text)
 *
 * Called by: Change event on phone input field (onchange, onkeypress, onpaste, oninput)
 * Calls: No Functions
 * References: No Functions */
function onPhoneChanged() {
    let phone = document.getElementById('phone').value;
    document.getElementById('phone-text').textContent = 'Phone: ' + phone;
}

/**
 * Takes no Input
 * Returns nothing
 * Checks if addition is in progress
 * if yes, then
 *     Adds a User to the Subscriber list by adding a row to the table
 * else
 *     Toggles the form with the list
 *
 * Called By: Click event on Add Button
 * Calls: toggleListAndForm(), addToTable()
 * References: No Functions */
function addUser() {
    if(isAdditionInProgress) {
        let name = document.getElementById('name').value, phone = document.getElementById('phone').value;

        if(name === '' || phone === '') {
            alert('Please enter a Valid Name and Phone Number');
        } else {
            toggleListAndForm(false);
            addToTable(name, phone);
        }
    } else {
        toggleListAndForm(true);
    }
}
/**
 * Takes no Input
 * Returns Nothing
 * Deletes a User from the list by deleting the row from the table
 *
 * Called by: Click even on delete button (See getDeleteButton())
 * Calls: No Functions
 * References: No Functions */
function deleteUser() {
    let row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

/**
 * Takes name and phone number of subscriber as input
 * Returns nothing
 * Adds subscriber information as a new Row to the table
 *
 * Called by: addUser()
 * Calls: getDeleteButton()
 * References: No Functions */
function addToTable(name, phone) {
    //Table Reference
    let subscriberList = document.getElementById('subscriber-list').getElementsByTagName('tbody')[0];
    //Creates a new row
    let subscriber = subscriberList.insertRow(subscriberList.rows == null ? 0 : subscriberList.rows.length);

    //Adds the Name Cell to the row
    let subscriberName = subscriber.insertCell(0);
    subscriberName.appendChild(document.createTextNode(name));

    //Adds the Phone Cell to the row
    let subscriberPhone = subscriber.insertCell(1);
    subscriberPhone.appendChild(document.createTextNode(phone));

    //Adds the Delete Button Cell to the row
    let deleteSubscriberButton = subscriber.insertCell(2);
    deleteSubscriberButton.appendChild(getDeleteButton());
}
/**
 * Takes no Input
 * Returns a Node Element of the type button
 * The button has been customized as a Bootstrap Button of small size and color := danger (according to Bootstrap Docs)
 * Defines the button's onclick event as the function deleteUser()
 *
 * Called By: getDeleteButton()
 * Calls: No Functions
 * References: deleteUser()*/
function getDeleteButton() {
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.className += 'btn btn-sm btn-danger';
    deleteButton.onclick = deleteUser;

    return deleteButton;
}