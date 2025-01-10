// // // index.js
// // import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// // import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// // const firebaseConfig = {
// //     apiKey: "AIzaSyDl6XOj2KsqpPQZaJlmDh0GFEo-N0rnzc0",
// //     authDomain: "euphratescms-ae8c5.firebaseapp.com",
// //     projectId: "euphratescms-ae8c5",
// //     storageBucket: "euphratescms-ae8c5.firebasestorage.app",
// //     messagingSenderId: "992098640079",
// //     appId: "1:992098640079:web:e2d3ab8ee236c434bb17ba",
// //     measurementId: "G-Y9RTPX8ETE"
// // };

// // const app = initializeApp(firebaseConfig);
// // const db = getFirestore(app);

// // async function loadContent() {
// //     try {
// //         const casesPane = document.querySelector('.cases-pane');
// //         const blogsPane = document.querySelector('.blogs-pane');
// //         const eventsPane = document.querySelector('.events-pane');
        
// //         // Check if elements exist
// //         if (!casesPane || !blogsPane || !eventsPane) {
// //             console.error('One or more elements are missing in the HTML.');
// //             return;
// //         }

// //         // Clear existing content
// //         casesPane.innerHTML = '';
// //         blogsPane.innerHTML = '';
// //         eventsPane.innerHTML = '';

// //         // Fetch cases
// //         const casesRef = collection(db, 'cases');
// //         const qCases = query(casesRef, orderBy('title'));
// //         const casesSnapshot = await getDocs(qCases);
// //         casesSnapshot.forEach((doc) => {
// //             const data = doc.data();
// //             const caseHTML = `
// //                 <div class="case">
// //                     <img src="${data.main_image}" alt="${data.title}">
// //                     <h3>${data.title}</h3>
// //                     <p>${data.short_description}</p>
// //                 </div>
// //             `;
// //             casesPane.innerHTML += caseHTML;
// //         });

// //         // Fetch blogs
// //         const blogsRef = collection(db, 'blogs');
// //         const qBlogs = query(blogsRef, orderBy('date', 'desc'));
// //         const blogsSnapshot = await getDocs(qBlogs);
// //         blogsSnapshot.forEach((doc) => {
// //             const data = doc.data();
// //             const blogHTML = `
// //                 <div class="blog">
// //                     <img src="${data.image}" alt="${data.title}">
// //                     <h3>${data.title}</h3>
// //                     <p>By ${data.author} on ${new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
// //                     <p>${data.content.substring(0, 100)}...</p>
// //                 </div>
// //             `;
// //             blogsPane.innerHTML += blogHTML;
// //         });

// //         // Fetch events
// //         const eventsRef = collection(db, 'events');
// //         const qEvents = query(eventsRef, orderBy('time_date', 'desc'));
// //         const eventsSnapshot = await getDocs(qEvents);
// //         eventsSnapshot.forEach((doc) => {
// //             const data = doc.data();
// //             const eventHTML = `
// //                 <div class="event">
// //                     <img src="${data.image}" alt="${data.title}">
// //                     <h3>${data.title}</h3>
// //                     <p>${new Date(data.time_date.seconds * 1000).toLocaleString()}</p>
// //                     <p>${data.description}</p>
// //                 </div>
// //             `;
// //             eventsPane.innerHTML += eventHTML;
// //         });
// //     } catch (error) {
// //         console.error("Error loading content:", error);
// //     }
// // }

// // document.addEventListener('DOMContentLoaded', loadContent);





// // index.js
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

// async function loadContent() {
//     try {
//         const casesPane = document.querySelector('.cases-pane');
//         const blogsPane = document.querySelector('.blogs-pane');
//         const eventsPane = document.querySelector('.events-pane');
        
//         // Check if elements exist
//         if (!casesPane || !blogsPane || !eventsPane) {
//             console.error('One or more elements are missing in the HTML.');
//             return;
//         }

//         // Clear existing content
//         casesPane.innerHTML = '';
//         blogsPane.innerHTML = '';
//         eventsPane.innerHTML = '';

//         // Fetch cases
//         const casesRef = collection(db, 'cases');
//         const qCases = query(casesRef, orderBy('title'));
//         const casesSnapshot = await getDocs(qCases);
//         casesSnapshot.forEach((doc) => {
//             const data = doc.data();
//             const caseHTML = `
//                 <div class="case">
//                     <div class="case-image" style="background-image: url('${data.main_image}');"></div>
//                     <div class="case-details">
//                         <h3>${data.title}</h3>
//                         <p>${data.short_description}</p>
//                         <p><b>${data.year}</b></p>
//                     </div>
//                 </div>
//             `;
//             casesPane.innerHTML += caseHTML;
//         });

//         // Fetch blogs
//         const blogsRef = collection(db, 'blogs');
//         const qBlogs = query(blogsRef, orderBy('date', 'desc'));
//         const blogsSnapshot = await getDocs(qBlogs);
//         blogsSnapshot.forEach((doc) => {
//             const data = doc.data();
//             const blogHTML = `
//                 <div class="blog">
//                     <img src="${data.image}" alt="${data.title}">
//                     <h3>${data.title}</h3>
//                     <p>By ${data.author} on ${new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
//                     <p>${data.content.substring(0, 100)}...</p>
//                 </div>
//             `;
//             blogsPane.innerHTML += blogHTML;
//         });

//         // Fetch events
//         const eventsRef = collection(db, 'events');
//         const qEvents = query(eventsRef, orderBy('time_date', 'desc'));
//         const eventsSnapshot = await getDocs(qEvents);
//         eventsSnapshot.forEach((doc) => {
//             const data = doc.data();
//             const eventHTML = `
//                 <div class="event">
//                     <img src="${data.image}" alt="${data.title}">
//                     <h3>${data.title}</h3>
//                     <p>${new Date(data.time_date.seconds * 1000).toLocaleString()}</p>
//                     <p>${data.description}</p>
//                 </div>
//             `;
//             eventsPane.innerHTML += eventHTML;
//         });
//     } catch (error) {
//         console.error("Error loading content:", error);
//     }
// }

// document.addEventListener('DOMContentLoaded', loadContent);

// index.js
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

async function loadContent() {
    try {
        const casesPane = document.querySelector('.cases-pane');
        const blogsPane = document.querySelector('.blogs-pane');
        const eventsPane = document.querySelector('.events-pane');

        // Check if elements exist
        if (!casesPane || !blogsPane || !eventsPane) {
            console.error('One or more elements are missing in the HTML.');
            return;
        }

        // Clear existing content
        casesPane.innerHTML = '';
        blogsPane.innerHTML = '';
        eventsPane.innerHTML = '';

        // Fetch cases
        const casesRef = collection(db, 'cases');
        const qCases = query(casesRef, orderBy('title'));
        const casesSnapshot = await getDocs(qCases);
        casesSnapshot.forEach((doc) => {
            const data = doc.data();
            const caseHTML = `
                <div class="case-highlight case-up" style="background-image:url('${data.main_image}')">
                    <div class="ch-inner">
                        <div class="ch-ico" style="background-image: url('img/ico-placeholder.png')"></div>
                        <div class="ch-details">
                            <h3>${data.title}</h3>
                            <p>${data.short_description}</p>
                            <p><b>${data.year}</b></p>
                            <a href="cases/casesample.html"><button>View Case <i class="fa-solid fa-arrow-right-long"></i></button></a>
                        </div>
                    </div>
                </div>
            `;
            casesPane.innerHTML += caseHTML;
        });

        // Fetch blogs
        const blogsRef = collection(db, 'blogs');
        const qBlogs = query(blogsRef, orderBy('date', 'desc'));
        const blogsSnapshot = await getDocs(qBlogs);
        blogsSnapshot.forEach((doc) => {
            const data = doc.data();
            const blogHTML = `
                <div class="swiper-slide blog">
                    <a href="blogevents/blog/blog.html">
                        <div class="inner">
                            <h3>${data.title}</h3>
                            <h5>By ${data.author}</h5>
                            <p>${data.content.substring(0, 100)}...</p>
                        </div>
                    </a>
                </div>
            `;
            blogsPane.innerHTML += blogHTML;
        });

        // Fetch events
        const eventsRef = collection(db, 'events');
        const qEvents = query(eventsRef, orderBy('time_date', 'desc'));
        const eventsSnapshot = await getDocs(qEvents);
        eventsSnapshot.forEach((doc) => {
            const data = doc.data();
            const eventHTML = `
                <div class="swiper-slide blog event">
                    <a href="blogevents/events/event.html">
                        <div class="inner">
                            <h3>${data.title}</h3>
                            <span class="location"><i class="fa-solid fa-location-dot"></i> ${data.inperson_online === 'online' ? 'Online' : data.venue_type}</span>
                            <h5>${data.inperson_online === 'online' ? 'Via Zoom' : data.venue_type}</h5>
                            <h6><span id="time">${new Date(data.time_date.seconds * 1000).toLocaleTimeString()}</span>  |  <span id="date">${new Date(data.time_date.seconds * 1000).toLocaleDateString()}</span></h6>
                            <p>${data.description}</p>
                        </div>
                    </a>
                </div>
            `;
            eventsPane.innerHTML += eventHTML;
        });

        // Initialize Swiper after dynamically adding content
        new Swiper('.blogslider', {
            pagination: {
                el: '.swiper-pagination2',
                clickable: true,
            },
        });

    } catch (error) {
        console.error("Error loading content:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadContent);