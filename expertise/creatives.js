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
        if (!creativesPane) return;

        // Hide existing content with opacity transition
        creativesPane.style.opacity = '0';
        
        const creativesRef = collection(db, 'creatives');
        const q = query(creativesRef, orderBy('title'));
        const querySnapshot = await getDocs(q);

        // Clear content after fade out
        setTimeout(async () => {
            creativesPane.innerHTML = '';
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const creativeDiv = document.createElement('div');
                creativeDiv.className = 'creative';
                creativeDiv.innerHTML = `
                    <div class="inner" style="background-image: url('${data.image}')">
                        <div class="overlay">
                            <h3>${data.title}</h3>
                            <p>${data.description || ''}</p>
                            <div class="category">${data.category || ''}</div>
                        </div>
                    </div>
                `;
                
                // Add click event listener
                creativeDiv.addEventListener('click', () => {
                    openCreativeDetails(data);
                });
                
                creativesPane.appendChild(creativeDiv);
            });
            
            // Show content with fade in
            creativesPane.style.opacity = '1';
        }, 300); // Wait for fade out to complete

    } catch (error) {
        console.error("Error loading creatives:", error);
    }
}

function openCreativeDetails(creativeData) {
    // Store the creative data in sessionStorage
    sessionStorage.setItem('selectedCreative', JSON.stringify(creativeData));
    // Navigate to the picture-template.html
    window.location.href = 'pictures/picture-template.html';
}

// Add CSS transition
const style = document.createElement('style');
style.textContent = `
    .creatives-pane {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        padding: 2rem;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }
    
    .creative {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .creative:hover {
        transform: scale(1.05);
    }
    
    .creative .inner {
        position: relative;
        padding-top: 75%;
        background-size: cover;
        background-position: center;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .creative .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }
    
    .creative:hover .overlay {
        transform: translateY(0);
    }
    
    .creative h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
    }
    
    .creative p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    .creative .category {
        margin-top: 0.5rem;
        font-size: 0.8rem;
        opacity: 0.6;
    }
`;

document.head.appendChild(style);

// Load creatives when the page loads
document.addEventListener('DOMContentLoaded', loadCreatives);