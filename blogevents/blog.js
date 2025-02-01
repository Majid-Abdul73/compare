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
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

async function loadBlogPosts() {
    try {
        const blogpane = document.querySelector('.blogpane');
        blogpane.innerHTML = ''; // Clear existing content

        const blogsRef = collection(db, 'blogs');
        const q = query(blogsRef, orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.date.toDate();
            const isNew = (new Date() - date) / (1000 * 60 * 60 * 24) < 7; // Check if post is less than 7 days old

            const blogHTML = `
                <div class="blog">
                    <a href="blog.html?id=${doc.id}">
                        <div class="inner" style="background-image: url('${"samplework.jpg"}')">
                            ${isNew ? '<span class="newpost">New Post</span>' : ''}
                            <h3>${data.title}</h3>
                            <h5>By ${data.author}</h5>
                            <h6>${formatDate(date)}</h6>
                            <p>${data.content.substring(0, 100)}...</p>
                        </div>
                    </a>
                </div>
            `;

            blogpane.innerHTML += blogHTML;
        });            
    } catch (error) {
        console.error("Error loading blog posts:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);