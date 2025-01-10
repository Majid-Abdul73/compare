// WebDesign.js
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

async function loadWebDesigns() {
    try {
        const webDesignsPane = document.querySelector('.web-designs-pane');
        webDesignsPane.innerHTML = ''; // Clear existing content

        const webDesignsRef = collection(db, 'webdesigns');
        const q = query(webDesignsRef, orderBy('year', 'desc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const webDesignHTML = `
                <div class="web-design">
                    <div class="inner" style="background-image: url('${data.image}')"></div>
                    <div class="details">
                        <h3>${data.year}</h3>
                        <p>${data.description}</p>
                        <a href="${data.link}" target="_blank">View Website</a>
                    </div>
                </div>
            `;

            webDesignsPane.innerHTML += webDesignHTML;
        });
    } catch (error) {
        console.error("Error loading web designs:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadWebDesigns);