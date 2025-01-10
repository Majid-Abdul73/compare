// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDl6XOj2KsqpPQZaJlmDh0GFEo-N0rnzc0",
//   authDomain: "euphratescms-ae8c5.firebaseapp.com",
//   projectId: "euphratescms-ae8c5",
//   storageBucket: "euphratescms-ae8c5.firebasestorage.app",
//   messagingSenderId: "992098640079",
//   appId: "1:992098640079:web:e2d3ab8ee236c434bb17ba",
//   measurementId: "G-Y9RTPX8ETE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Function to fetch documents from a collection
// const fetchDocuments = async (collectionName) => {
//   const docs = [];
//   try {
//     const q = query(collection(db, collectionName), orderBy('title', 'asc'));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       docs.push({ id: doc.id, ...doc.data() });
//     });
//   } catch (error) {
//     console.error(`Error fetching documents from ${collectionName}:`, error);
//   }
//   return docs;
// };

// // Function to fetch creatives
// export const fetchCreatives = async () => {
//   return await fetchDocuments('creatives');
// };

// // Function to fetch studios
// export const fetchStudios = async () => {
//   return await fetchDocuments('studios');
// };

// // Function to fetch web designs
// export const fetchWebDesigns = async () => {
//   return await fetchDocuments('web_designs');
// };

// // Function to render documents to the page
// const renderDocuments = (containerId, docs, type) => {
//   const container = document.getElementById(containerId);
//   container.innerHTML = '';
//   docs.forEach(doc => {
//     const itemHTML = `
//       <div class="${type}-case" style="background-image:url(${doc.image})">
//         <div class="ch-inner">
//           <div class="ch-ico" style="background-image: url(${doc.image})"></div>
//           <div class="ch-details">
//             <h4>${doc.title}</h4>
//             <p>${doc.description}</p>
//             <p><b>${doc.year}</b></p>
//             <a href="${doc.link}" class="html5lightbox" data-group="amazingcarousel-1">
//               <button>View ${type.charAt(0).toUpperCase() + type.slice(1)}<i class="fa-solid fa-arrow-right-long"></i></button>
//             </a>
//           </div>
//         </div>
//       </div>
//     `;
//     container.innerHTML += itemHTML;
//   });
// };

// // Function to initialize the page
// export const initializePage = async (containerId, type) => {
//   let docs;
//   switch(type) {
//     case 'creatives':
//       docs = await fetchCreatives();
//       break;
//     case 'studios':
//       docs = await fetchStudios();
//       break;
//     case 'webdesigns':
//       docs = await fetchWebDesigns();
//       break;
//     default:
//       return;
//   }
//   renderDocuments(containerId, docs, type);
// };

// // Example usage
// // Initialize creatives page
// // initializePage('creatives-container', 'creatives');

// // Initialize studios page
// // initializePage('studios-container', 'studios');

// // Initialize web designs page
// // initializePage('webdesigns-container', 'webdesigns');


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



// import { db } from './path/to/your/firebaseConfig';  // Adjust the path to your firebaseConfig file
// import { collection, getDocs } from 'firebase/firestore';


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