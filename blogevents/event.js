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
            const isUpcoming = date > new Date(); // Check if event is in the future

            const eventHTML = `
                <div class="blog">
                    <a href="event.html?id=${doc.id}">
                        <div class="inner" style="background-image: url('${data.image}')">
                            ${isUpcoming ? '<span class="newpost">Upcoming</span>' : ''}
                            <h3>${data.title}</h3>
                            <h5>${data.venue_type}</h5>
                            <h6>${formatDate(date)}</h6>
                            <p>${data.description.substring(0, 100)}...</p>
                            <span class="event-type ${data.inperson_online}">${data.inperson_online}</span>
                        </div>
                    </a>
                </div>
            `;

            blogpane.innerHTML += eventHTML;
        });

        // Add CSS for event types
        const styles = `
            <style>
                .event-type {
                    display: inline-block;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    text-transform: uppercase;
                    margin-top: 10px;
                }
                .in-person {
                    background-color: #e3f2fd;
                    color: #1976d2;
                }
                .online {
                    background-color: #e8f5e9;
                    color: #388e3c;
                }
                .blog .inner {
                    background-size: cover;
                    background-position: center;
                    padding: 20px;
                    border-radius: 8px;
                    min-height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    position: relative;
                    overflow: hidden;
                }
                .blog .inner::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 70%;
                    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
                    z-index: 1;
                }
                .blog .inner > * {
                    position: relative;
                    z-index: 2;
                    color: white;
                }
                .newpost {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background-color: #ff4081;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
            </style>
        `;
        
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