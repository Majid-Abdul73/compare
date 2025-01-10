// // studios.js
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// const firebaseConfig = {
//     apiKey: "AIzaSyDl6XOj2KsqpPQZaJlmDh0GFEo-N0rnzc0",
//     authDomain: "euphratescms-ae8c5.firebaseapp.com",
//     projectId: "euphratescms-ae8c5",
//     storageBucket: "euphratescms-ae8c5.firebasestorage.app",
//     messagingSenderId: "992098640079",
//     appId: "1:992098640079:web:e2d3ab8ee236c434bb17ba",
//     measurementId: "G-Y9RTPX8ETE"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// async function loadStudios() {
//     try {
//         const studiosPane = document.querySelector('.studios-pane');
//         studiosPane.innerHTML = ''; // Clear existing content

//         const studiosRef = collection(db, 'studios');
//         const q = query(studiosRef, orderBy('year', 'desc'));
//         const querySnapshot = await getDocs(q);

//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             const studioHTML = `
//                 <div class="studio">
//                     <div class="inner" style="background-image: url('${data.image}')">
//                         <h3>${data.title}</h3>
//                         <h6>${data.year}</h6>
//                         <p>${data.description}</p>
//                         <a href="${data.link}" target="_blank">View Project</a>
//                     </div>
//                 </div>
//             `;

//             studiosPane.innerHTML += studioHTML;
//         });            
//     } catch (error) {
//         console.error("Error loading studios:", error);
//     }
// }

// document.addEventListener('DOMContentLoaded', loadStudios);

// studios.js
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

async function loadStudios() {
    try {
        const studiosPane = document.querySelector('.studios-pane');
        studiosPane.innerHTML = ''; // Clear existing content

        const studiosRef = collection(db, 'studios');
        const q = query(studiosRef, orderBy('year', 'desc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const studioHTML = `
                <div class="studio">
                    <div class="inner" style="background-image: url('${data.image}')"></div>
                    <h3>${data.title}</h3>
                    <h6>${data.year}</h6>
                    <p>${data.description}</p>
                    <a href="${data.link}" target="_blank">View Project</a>
                </div>
            `;

            studiosPane.innerHTML += studioHTML;
        });            
    } catch (error) {
        console.error("Error loading studios:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadStudios);