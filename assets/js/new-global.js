/* ============================================================
   GLOBAL NAVIGATION LOADER
   Dynamically fetches site-nav.html and stabilizes title text
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById('site-nav');
  
  if (navContainer) {
    fetch('/includes/site-nav.html')
      .then(response => {
        if (!response.ok) throw new Error("Shared navigation file missing");
        return response.text();
      })
      .then(html => {
        // 1. Render the HTML fragment safely into the page
        navContainer.innerHTML = html;

        // 2. Split on any style of dash (-, –, —) to isolate the page name cleanly
        const cleanTitle = document.title.split('–')[0].split('—')[0].split('-')[0].trim();
        
        // 3. Update the breadcrumb tracking text slot safely
        const currentPageElement = navContainer.querySelector('.current-page');
        if (currentPageElement) {
          currentPageElement.textContent = cleanTitle;
        }
      })
      .catch(err => console.error("Error building navigation element: ", err));
  }
});

/* ============================================================
   SIMPLE / ACCESSIBLE VIEW PERSISTENCE & TOGGLE
   Manages high-contrast/large-text mode across sessions
============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("simple-view-toggle");
  const body = document.body;

  // 1. Check persisted preference from a previous session on load
  if (localStorage.getItem("grandview_simple_view") === "true") {
    body.classList.add("simple-view");
    if (toggleBtn) toggleBtn.textContent = "Switch to Normal View";
  }

  // 2. Listen for clicks on the toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      body.classList.toggle("simple-view");
      const isSimple = body.classList.contains("simple-view");
      
      // Save preference to localStorage so it persists
      localStorage.setItem("grandview_simple_view", isSimple);
      
      toggleBtn.textContent = isSimple ? "Switch to Normal View" : "Switch to Simple View";
    });
  }
});

/* ============================================================
   GOOGLE ANALYTICS 4 (GA4) INTEGRATION
   Centralized tracker script injection for site analytics
============================================================ */
(function() {
  const GA_TRACKING_ID = 'G-M60J5ZZH97'; // Replace with your Google Analytics ID

  // 1. Create and inject the external Google Analytics script tag
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(gaScript);

  // 2. Initialize the globaldataLayer and gtag configurations
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  
  gtag('js', new Date());

  // 3. Fire a pageview event configured to read your tracking ID
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname
  });
})();

/* ============================================================
   GLOBAL NAVIGATION LOADER (Your Existing Navigation Code)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // ... Keep all your existing site-nav script logic here untouched ...
});
