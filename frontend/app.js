const BASE_URL = 'http://127.0.0.1:5000';

window.onload = async function() {
    await loadTickets();
};

function getStatusColor(status) {
    const s = (status || '').toLowerCase();
    if (s === 'done') return '#22c55e';     // green
    if (s === 'pending') return '#eab308';  // yellow
    return '#ef4444';                       // red (open/default)
}

function createTicketItem(ticket) {
    const ticketItem = document.createElement('li');
    ticketItem.innerHTML = ticketTemplate(ticket);
    return ticketItem;
}

async function loadTickets() {
    try {
        const response = await fetch(`${BASE_URL}/tickets`);
        if (response.ok) {
            const tickets = await response.json();
            const ticketList = document.getElementById('ticketList');
            ticketList.innerHTML = '';
            
            tickets.forEach(ticket => {
                ticketList.appendChild(createTicketItem(ticket));
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
                ticketList.appendChild(createTicketItem(ticket));

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

async function updateTicket(ticketId, newStatus) {
    if (ticketId && newStatus) {
        try {
            const response = await fetch(`${BASE_URL}/tickets/${ticketId}/${newStatus}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                await loadTickets();
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    }
}