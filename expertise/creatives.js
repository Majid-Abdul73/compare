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
            creativesPane.innerHTML = '<div class="web-cases"></div>';
            const webCases = creativesPane.querySelector('.web-cases');
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const creativeDiv = document.createElement('div');
                creativeDiv.className = 'web-case pictures';
                creativeDiv.style.backgroundImage = `url('${ '../img/samplework.jpg'}')`;
                
                creativeDiv.innerHTML = `
                    <div class="ch-inner">
                        <div class="ch-ico" style="background-image: url('${data.icon || '../img/ico-placeholder.png'}')"></div>
                        <div class="ch-details">
                            <h6>${data.category || 'Design'}</h6>
                            <h4>${data.title}</h4>
                            <button>View Pictures<i class="fa-solid fa-arrow-right-long"></i></button>
                        </div>
                    </div>
                `;
                
                // Add click event listener
                creativeDiv.addEventListener('click', () => {
                    openCreativeDetails(data);
                });
                
                webCases.appendChild(creativeDiv);
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
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }
    
    .web-cases {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        padding: 2rem;
    }
    
    .web-case {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .web-case:hover {
        transform: scale(1.05);
    }
`;

document.head.appendChild(style);

// Load creatives when the page loads
document.addEventListener('DOMContentLoaded', loadCreatives);