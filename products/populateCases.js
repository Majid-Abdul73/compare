import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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

// Function to fetch cases from Firestore
const fetchCases = async () => {
  const casesCollection = collection(db, 'cases');
  const q = query(casesCollection, where('category', '==', 'brand development'));
  try {
    const casesSnapshot = await getDocs(q);
    const casesList = casesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return casesList;
  } catch (error) {
    console.error('Error fetching cases:', error);
    return [];
  }
};

// Function to fetch a single case by ID from Firestore
const fetchCaseById = async (caseId) => {
  const caseDoc = doc(db, 'cases', caseId);
  try {
    const caseSnapshot = await getDoc(caseDoc);
    if (caseSnapshot.exists()) {
      return { id: caseSnapshot.id, ...caseSnapshot.data() };
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching case:', error);
    return null;
  }
};

// Function to populate cases on the page
const populateCases = async () => {
  const casesContainer = document.querySelector('.sw-cases');
  const cases = await fetchCases();

  // Clear existing case elements
  casesContainer.innerHTML = '';

  cases.forEach(caseItem => {
    const caseElement = document.createElement('div');
    caseElement.classList.add('sw-case');
    caseElement.style.backgroundImage = `url(${caseItem.main_image})`;

    caseElement.innerHTML = `
      <div class="ch-inner">
        <div class="ch-ico" style="background-image: url(${caseItem.additional_image1 || '../img/ico-placeholder.png'})"></div>
        <div class="ch-details">
          <h4>${caseItem.title}</h4>
          <p>${caseItem.short_description}</p>
          <p><b>${new Date(caseItem.timestamp?.seconds * 1000).getFullYear()}</b></p>
          <button class="view-case-btn" data-id="${caseItem.id}">View Case <i class="fa-solid fa-arrow-right-long"></i></button>
        </div>
      </div>
    `;

    casesContainer.appendChild(caseElement);
  });

  // Add event listeners to all "View Case" buttons
  document.querySelectorAll('.view-case-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      const caseId = event.target.getAttribute('data-id');
      const caseData = await fetchCaseById(caseId);
      if (caseData) {
        localStorage.setItem('selectedCase', JSON.stringify(caseData));
        window.location.href = 'case-details.html';
      }
    });
  });
};

// Call populateCases function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', populateCases);