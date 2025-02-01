import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDl6XOj2KsqpPQZaJlmDh0GFEo-N0rnzc0",
    authDomain: "euphratescms-ae8c5.firebaseapp.com",
    projectId: "euphratescms-ae8c5",
    storageBucket: "euphratescms-ae8c5.firebasestorage.app",
    messagingSenderId: "992098640079",
    appId: "1:992098640079:web:e2d3ab8ee236c434bb17ba",
    measurementId: "G-Y9RTPX8ETE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function formatDate(date) {
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-US', options);
}

async function loadEvents() {
    try {
        const blogpane = document.querySelector('.blogpane');
        blogpane.innerHTML = ''; // Clear existing content

        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, orderBy('time_date', 'desc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.time_date.toDate();

            const eventHTML = `
                <div class="blog">
                    <a href="event.html?id=${doc.id}">
                        <div class="inner">
                            <div class="event-content">
                                <h3>${data.title}</h3>
                                <div class="location-info">
                                    <span class="location-type ${data.inperson_online?.toLowerCase()}">
                                        <i class="fa-solid ${data.inperson_online?.toLowerCase() === 'online' ? 'fa-video' : 'fa-location-dot'}"></i>
                                        ${data.inperson_online || 'TBA'}
                                    </span>
                                </div>
                                <h5>${data.location || 'Location TBA'}</h5>
                                <div class="event-time">
                                    <span class="time">${new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()}</span>
                                    <span class="separator">|</span>
                                    <span class="date">${new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <p>${data.description ? data.description.substring(0, 100) + '...' : ''}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;

            blogpane.innerHTML += eventHTML;
        });

        // Add CSS for event types
        const styles = ``;
        
        if (!document.querySelector('#event-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'event-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }

    } catch (error) {
        console.error("Error loading events:", error);
        const blogpane = document.querySelector('.blogpane');
        blogpane.innerHTML = '<p style="color: red; text-align: center;">Failed to load events. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadEvents);