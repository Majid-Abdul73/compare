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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadStudios() {
    try {
        const webCasesContainer = document.querySelector('.web-cases');
        if (!webCasesContainer) {
            console.error('Could not find .web-cases container');
            return;
        }

        // Clear existing content
        webCasesContainer.innerHTML = '';

        // Fetch studios data
        const studiosRef = collection(db, 'studios');
        const q = query(studiosRef, orderBy('year', 'desc'));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            webCasesContainer.innerHTML = '<p class="no-content">No studio projects available at the moment.</p>';
            return;
        }

        // Populate studios
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const studioHTML = `
                <div class="web-case" style="background-image:url('${data.coverImage || '../img/samplework.jpg'}')">
                    <div class="ch-inner">
                        <div class="ch-ico" style="background-image: url('${data.icon || '../img/ico-placeholder.png'}')"></div>
                        <div class="ch-details">
                            <h6>${data.category || 'Studio Work'}</h6>
                            <h4>${data.title}</h4>
                            <p>${data.description}</p>
                            <p><b>${data.year}</b></p>
                            <a href="${data.link || '#'}">
                                <button>${data.type === 'video' ? 'Watch Video' : 'View Project'}<i class="fa-solid fa-arrow-right-long"></i></button>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            webCasesContainer.innerHTML += studioHTML;
        });

    } catch (error) {
        console.error("Error loading studios:", error);
        const webCasesContainer = document.querySelector('.web-cases');
        if (webCasesContainer) {
            webCasesContainer.innerHTML = '<p class="no-content">Error loading studio projects. Please try again later.</p>';
        }
    }
}

// Load studios when DOM is ready
document.addEventListener('DOMContentLoaded', loadStudios);