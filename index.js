import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, getDocs, doc, getDoc, query, orderBy, limit } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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

async function loadContent() {
    try {
        const casesPane = document.querySelector('.cases-pane');
        const blogsPane = document.querySelector('.blogs-pane');
        const eventsPane = document.querySelector('.events-pane');

        if (!casesPane || !blogsPane || !eventsPane) {
            console.error('One or more elements are missing in the HTML.');
            return;
        }

        casesPane.innerHTML = '';
        blogsPane.innerHTML = '';
        eventsPane.innerHTML = '';

        // Fetch cases
        const casesRef = collection(db, 'cases');
        const qCases = query(casesRef, orderBy('title', 'asc'), limit(3));
        const casesSnapshot = await getDocs(qCases);
        casesSnapshot.forEach((doc) => {
            const data = doc.data();
            const caseHTML = `
                <div class="case-highlight case-up" style="background-image:url('${ 'img/samplework.jpg'}')">
                    <div class="ch-inner">
                        <div class="ch-details">
                            <h3>${data.title}</h3>
                            <p>${data.short_description}</p>
                            <p><b>${data.year}</b></p>
                            <button onclick="viewCase('${doc.id}')">View Case <i class="fa-solid fa-arrow-right-long"></i></button>
                        </div>
                    </div>
                </div>
            `;
            casesPane.innerHTML += caseHTML;
        });

        // Fetch blogs
        const blogsRef = collection(db, 'blogs');
        const qBlogs = query(blogsRef, orderBy('date', 'asc'), limit(3));
        const blogsSnapshot = await getDocs(qBlogs);
        blogsSnapshot.forEach((doc) => {
            const data = doc.data();
            const blogHTML = `
                <div class="swiper-slide blog">
                    <div class="inner">
                        <h3>${data.title}</h3>
                        <h5>By ${data.author}</h5>
                        <p>${data.content.substring(0, 100)}...</p>
                        <button onclick="viewBlog('${doc.id}')">Read More <i class="fa-solid fa-arrow-right-long"></i></button>
                    </div>
                </div>
            `;
            blogsPane.innerHTML += blogHTML;
        });

        // Fetch events
        const eventsRef = collection(db, 'events');
        const qEvents = query(eventsRef, orderBy('time_date', 'asc'), limit(3));
        const eventsSnapshot = await getDocs(qEvents);
        eventsSnapshot.forEach((doc) => {
            const data = doc.data();
            const eventHTML = `
                <div class="swiper-slide blog event">
                    <div class="inner">
                        <h3>${data.title}</h3>
                        <span class="location"><i class="fa-solid fa-location-dot"></i> ${data.inperson_online === 'online' ? 'Online' : data.venue_type}</span>
                        <h5>${data.inperson_online === 'online' ? 'Via Zoom' : data.venue_type}</h5>
                        <h6><span id="time">${new Date(data.time_date.seconds * 1000).toLocaleTimeString()}</span>  |  <span id="date">${new Date(data.time_date.seconds * 1000).toLocaleDateString()}</span></h6>
                        <p>${data.description}</p>
                    </div>
                </div>
            `;
            eventsPane.innerHTML += eventHTML;
        });

        // Initialize Swiper after dynamically adding content
        new Swiper('.blogslider', {
            pagination: {
                el: '.swiper-pagination2',
                clickable: true,
            },
        });

    } catch (error) {
        console.error("Error loading content:", error);
    }
}

window.viewCase = async function(caseId) {
    try {
        const caseDoc = await getDoc(doc(db, 'cases', caseId));
        if (caseDoc.exists()) {
            const data = caseDoc.data();
            localStorage.setItem('selectedCase', JSON.stringify(data));
            window.location.href = 'case-details.html';
        } else {
            console.error("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}

window.viewBlog = async function(blogId) {
    try {
        const blogDoc = await getDoc(doc(db, 'blogs', blogId));
        if (blogDoc.exists()) {
            const data = blogDoc.data();
            localStorage.setItem('selectedBlog', JSON.stringify(data));
            window.location.href = 'blog.html';
        } else {
            console.error("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}

window.viewEvent = async function(eventId) {
    try {
        const eventDoc = await getDoc(doc(db, 'events', eventId));
        if (eventDoc.exists()) {
            const data = eventDoc.data();
            localStorage.setItem('selectedEvent', JSON.stringify(data));
            window.location.href = `event.html?id=${eventId}`;
        } else {
            console.error("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadContent);