function addTicket() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        const ticketList = document.getElementById('ticketList');
        const ticketItem = document.createElement('li');
        ticketItem.innerHTML = `<strong>${title}</strong><br>${description}`;
        ticketList.appendChild(ticketItem);

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }
}