// WebDesign.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

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
const auth = getAuth(app);
const db = getFirestore(app);

// Handle anonymous authentication
async function initializeAuth() {
    try {
        await signInAnonymously(auth);
        console.log("Anonymous auth successful");
    } catch (error) {
        console.error("Error during anonymous authentication:", error);
    }
}

async function loadWebDesigns() {
    try {
        const webCasesDiv = document.querySelector('.web-cases');
        if (!webCasesDiv) return;

        // Hide existing content with opacity transition
        webCasesDiv.style.opacity = '0';
        
        // Ensure we're authenticated before accessing Firestore
        await initializeAuth();
        
        const webDesignsRef = collection(db, 'webdesigns');
        const q = query(webDesignsRef, orderBy('title'));
        const querySnapshot = await getDocs(q);

        // Clear content after fade out
        setTimeout(async () => {
            // Clear existing content
            webCasesDiv.innerHTML = '';
            
            if (querySnapshot.empty) {
                console.log("No web designs found");
                webCasesDiv.innerHTML = '<p>No web designs available at the moment.</p>';
                webCasesDiv.style.opacity = '1';
                return;
            }
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const webCaseDiv = document.createElement('div');
                webCaseDiv.className = 'web-case';
                webCaseDiv.style.backgroundImage = `url('${data.image || '../img/samplework.jpg'}')`;
                
                webCaseDiv.innerHTML = `
                    <div class="ch-inner">
                        <div class="ch-ico" style="background-image: url('${data.icon || '../img/ico-placeholder.png'}')"></div>
                        <div class="ch-details">
                            <h4>${data.title}</h4>
                            <p>${data.description || ''}</p>
                            ${data.year ? `<p><b>${data.year}</b></p>` : ''}
                            <a href="${data.websiteUrl || '#'}" class="html5lightbox" data-group="amazingcarousel-1">
                                <button>View Website <i class="fa-solid fa-arrow-right-long"></i></button>
                            </a>
                        </div>
                    </div>
                `;
                
                webCasesDiv.appendChild(webCaseDiv);
            });
            
            // Show content with fade in
            webCasesDiv.style.opacity = '1';
        }, 300); // Wait for fade out to complete

    } catch (error) {
        console.error("Error loading web designs:", error);
        const webCasesDiv = document.querySelector('.web-cases');
        if (webCasesDiv) {
            webCasesDiv.innerHTML = '<p>Error loading web designs. Please try again later.</p>';
            webCasesDiv.style.opacity = '1';
        }
    }
}

// Add CSS transition
const style = document.createElement('style');
style.textContent = `
    .web-cases {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }
`;

document.head.appendChild(style);

// Load web designs when the page loads
document.addEventListener('DOMContentLoaded', loadWebDesigns);