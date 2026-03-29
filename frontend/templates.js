function ticketTemplate(ticket) {
    const color = getStatusColor(ticket.status);
    return `
        <div class="statusDot" style="background-color: ${color};"></div>
        <strong>${ticket.title}</strong>
        <button onclick="deleteTicket(${ticket.id})">Delete</button>
        <select onchange="updateTicket(${ticket.id}, this.value)">
            <option value="open" ${ticket.status === 'open' ? 'selected' : ''}>Mark as Open</option>
            <option value="pending" ${ticket.status === 'pending' ? 'selected' : ''}>Mark as Pending</option>
            <option value="done" ${ticket.status === 'done' ? 'selected' : ''}>Mark as Done</option>
        </select>
        <br>${ticket.description}
    `;}
