const userList = document.querySelector('#user-list');

//create element and render users
function renderUser(doc)
{
    let li = document.createElement('li');
    let name = document.createElement('span');
    let id = document.createElement('span');
    let phone = document.createElement('span');
    let email = document.createElement('span'); 

    //get the users document id
    li.setAttribute('data-id', doc.id);
    name.textContent = ("Name: "+ doc.data().name);
    id.textContent = ("ID: "+ doc.data().id);
    phone.textContent = ("Phone: "+ doc.data().phone);
    email.textContent = ("Email: "+ doc.data().email)

    li.appendChild(name);
    li.appendChild(id);
    li.appendChild(phone);
    li.appendChild(email);

    userList.appendChild(li);

}

db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderUser(doc);
    });
})