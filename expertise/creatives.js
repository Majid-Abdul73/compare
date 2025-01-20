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

async function loadCreatives() {
    try {
        const creativesPane = document.querySelector('.creatives-pane');
        creativesPane.innerHTML = ''; // Clear existing content

        const creativesRef = collection(db, 'creatives');
        const q = query(creativesRef, orderBy('title'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const creativeHTML = `
                <div class="creative">
                    <div class="inner" style="background-image: url('${data.image}')"></div>
                    <h3>${data.title}</h3>
                    <a href="${data.link}" target="_blank">View Pictures</a>
                </div>
            `;

            creativesPane.innerHTML += creativeHTML;
        });
    } catch (error) {
        console.error("Error loading creatives:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadCreatives);