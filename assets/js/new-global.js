/* ============================================================
   GLOBAL NAVIGATION LOADER & VIEW TOGGLE HANDLER
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation Loader
  const navContainer = document.getElementById('site-nav');
  if (navContainer) {
    fetch('/includes/site-nav.html')
      .then(response => {
        if (!response.ok) throw new Error("Shared navigation file missing");
        return response.text();
      })
      .then(html => {
        navContainer.innerHTML = html;
        const cleanTitle = document.title.split('–')[0].split('—')[0].split('-')[0].trim();
        const currentPageElement = navContainer.querySelector('.current-page');
        if (currentPageElement) {
          currentPageElement.textContent = cleanTitle;
        }
      })
      .catch(err => console.error("Error building navigation element: ", err));
  }

  // 2. Simple View Toggle Logic
  const toggleBtn = document.getElementById("simple-view-toggle");
  const body = document.body;

  // Restore saved view preference
  if (localStorage.getItem("grandview_simple_view") === "true") {
    body.classList.add("simple-view");
    if (toggleBtn) toggleBtn.textContent = "Switch to Normal View";
  }

  // Toggle button click listener
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      body.classList.toggle("simple-view");
      const isSimple = body.classList.contains("simple-view");
      localStorage.setItem("grandview_simple_view", isSimple);
      toggleBtn.textContent = isSimple ? "Switch to Normal View" : "Switch to Simple View";
    });
  }
});

/* ============================================================
   GOOGLE ANALYTICS 4 (GA4) INTEGRATION
============================================================ */
(function() {
  const GA_TRACKING_ID = 'G-M60J5ZZH97';
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname
  });
})();
