import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

// Firebase configuration
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

// Function to fetch data from a specific collection
const fetchData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName}:`, error);
    return [];
  }
};

// Function to populate data into the page
const populateData = (data, containerId) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id ${containerId} not found`);
    return;
  }

  data.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.description || item.content || item.short_description || ''}</p>
      <img src="${item.image || item.main_image || ''}" alt="${item.title}">
      <a href="${item.link || ''}">Learn more</a>
    `;
    container.appendChild(itemElement);
  });
};

// Fetch and populate data for studios, web designs, and creatives
const init = async () => {
  const studios = await fetchData('studios');
  populateData(studios, 'studios-container');

  const webDesigns = await fetchData('web_designs');
  populateData(webDesigns, 'web-designs-container');

  const creatives = await fetchData('creatives');
  populateData(creatives, 'creatives-container');
};

// Initialize the fetching and populating process when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);