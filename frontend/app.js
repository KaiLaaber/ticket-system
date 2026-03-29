const BASE_URL = 'http://127.0.0.1:5000';

window.onload = async function() {
    await loadTickets();
};

async function loadTickets() {
    try {
        const response = await fetch(`${BASE_URL}/tickets`);
        if (response.ok) {
            const tickets = await response.json();
            const ticketList = document.getElementById('ticketList');
            ticketList.innerHTML = '';
            
            tickets.forEach(ticket => {
                const ticketItem = document.createElement('li');
                ticketItem.innerHTML = `<strong>${ticket.title}</strong>
                <button onclick="deleteTicket(${ticket.id})">Delete</button><br>${ticket.description}`;
                ticketList.appendChild(ticketItem);
            });
        }
    } catch (error) {
        console.error('Error loading tickets:', error);
    }
}

async function addTicket() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        try {
            const response = await fetch(`${BASE_URL}/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description })
            });

            if (response.ok) {
                const ticket = await response.json();
                const ticketList = document.getElementById('ticketList');
                const ticketItem = document.createElement('li');
                ticketItem.innerHTML = `<strong>${ticket.title}</strong>
                <button onclick="deleteTicket(${ticket.id})">Delete</button><br>${ticket.description}`;
                ticketList.appendChild(ticketItem);

                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
            }
        } catch (error) {
            console.error('Error adding ticket:', error);
        }
    }
}

async function deleteTicket(ticketId) {
    if (ticketId) {
        try {
            const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await loadTickets();
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    }
}