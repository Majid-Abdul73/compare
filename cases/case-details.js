// Function to display case details
const displayCaseDetails = () => {
    const caseData = JSON.parse(localStorage.getItem('selectedCase'));
    if (!caseData) {
      console.error('No case data found');
      return;
    }
  
    document.title = `Case | ${caseData.title}`;
    document.querySelector('.case-logo-icon').style.backgroundImage = `url(${caseData.main_image})`;
    document.querySelector('.cases-top h2').innerText = caseData.title;
    document.querySelector('.cases-top h6').innerText = caseData.category;
    document.querySelector('.cases-top p').innerText = caseData.short_description;
  
    const detailsContainer = document.querySelector('.howwdoit .hwd-centre');
    detailsContainer.innerHTML = `
      <div>
        <h4>Website</h4>
        <p>${caseData.website_description}</p>
      </div>
      <div>
        <h4>Brand Manual & Strategy</h4>
        <p>${caseData.brand_manual_description}</p>
      </div>
      <div>
        <h4>Audit</h4>
        <p>${caseData.audit_description}</p>
      </div>
    `;
  
    const rightContainer = document.querySelector('.howwdoit .hwd-right');
    rightContainer.style.backgroundImage = `url(${caseData.additional_image1 || '../img/samplework.jpg'})`;
  
    const jobContainer = document.querySelector('.job-container');
    jobContainer.querySelector('.show1 video source').src = caseData.animation || '';
    jobContainer.querySelector('.show2').style.backgroundImage = `url(${caseData.additional_image2 || '../img/samplework.jpg'})`;
    jobContainer.querySelector('.show3').style.backgroundImage = `url(${caseData.additional_image2 || '../img/samplework.jpg'})`;
  
    const testimonialContainer = document.querySelector('.clientquote .inner');
    testimonialContainer.querySelector('h4').innerText = caseData.testimonial || 'No testimonial available';
    testimonialContainer.querySelector('p').innerText = `CEO, ${caseData.website_name}`;
  };
  
  // Call displayCaseDetails function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', displayCaseDetails);