document.addEventListener('DOMContentLoaded', async () => {
    const eventsContainer = document.getElementById('events-container');
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);

    const startDay = today.toISOString().split('T')[0];
    const endDay = sixMonthsLater.toISOString().split('T')[0];

    console.log(`Fetching events from ${startDay} to ${endDay}`);

    try {
        const response = await fetch(`https://qm-cal-backend-a0ze791kq-skymouse85s-projects.vercel.app/api/events/${startDay}/${endDay}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        console.log('Events fetched successfully:', events);

        if (events.error) {
            throw new Error(events.error);
        }

        const sortedEvents = [...events].sort((a, b) => 
            new Date(a.start?.dateTime || 0) - new Date(b.start?.dateTime || 0)
        );

        sortedEvents.forEach(event => {
            if (!event.start || !event.start.dateTime || !event.end || !event.end.dateTime) {
                return;
            }

            const startDate = new Date(event.start.dateTime);
            const endDate = new Date(event.end.dateTime);

            const startDateStr = startDate.toLocaleDateString('en-US');
            const startTimeStr = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const endDateStr = endDate.toLocaleDateString('en-US');
            const endTimeStr = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const eventElement = document.createElement('div');
            eventElement.classList.add('event-container');

            let innerHTML = `
                <h2 class="title">${event.summary}</h2>
                <p>${startDateStr} ${startTimeStr} - ${endTimeStr}</p>
            `;

            if (event.location) {
                innerHTML += `<p>${event.location}</p>`;
            }

            if (event.description) {
                innerHTML += `<p>${event.description}</p>`;
            }

            eventElement.innerHTML = innerHTML;
            eventsContainer.appendChild(eventElement);
        });
    } catch (error) {
        console.error('Error:', error);
        eventsContainer.innerHTML = `<p>Error loading events: ${error.message}</p>`;
    }
});
