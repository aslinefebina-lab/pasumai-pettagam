function login() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if(name === "" || email === "" || password === "") {
        message.innerText = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    document.querySelector(".login-form").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");
}

function loginGoogle() {
    alert("Google login simulated! You are now logged in.");
    document.querySelector(".login-form").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");
}

function logout() {
    document.querySelector(".login-form").classList.remove("hidden");
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}
function login() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if(name === "" || email === "" || password === "") {
        message.innerText = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    // Redirect to home page
    window.location.href = "home.html";
}

function loginGoogle() {
    alert("Google login simulated! You are now logged in.");
    // Redirect to home page
    window.location.href = "home.html";
}
/* ---------- Header / Nav Functions ---------- */

function doSearch() {
  const q = document.getElementById("searchInput").value.trim();
  if (!q) {
    alert("Please type something to search.");
    return;
  }
  // In a real app you would search database; here we just show simulated result
  alert("Searching for: " + q + "\n(This is a simulated search.)");
}

/* Language toggle between English and Tamil (example) */
let currentLang = "EN";
function toggleLanguage() {
  if (currentLang === "EN") {
    currentLang = "TA";
    document.getElementById("langBtn").innerText = "TA";
    // Example: change visible text to Tamil - for demo we'll change the title only
    document.querySelectorAll(".site-title, .main-content h1").forEach(el => {
      if (el) {
        if (el.classList.contains("site-title")) el.innerText = "பசுமை பெட்டகம்";
        else el.innerText = "பசுமை பெட்டகத்திற்கு வரவேற்கிறோம்!";
      }
    });
  } else {
    currentLang = "EN";
    document.getElementById("langBtn").innerText = "EN";
    document.querySelectorAll(".site-title, .main-content h1").forEach(el => {
      if (el) {
        if (el.classList.contains("site-title")) el.innerText = "PASUMAI PETTAGAM";
        else el.innerText = "Welcome to PASUMAI PETTAGAM!";
      }
    });
  }
}

/* User access — send to account creation/login (index.html) */
function userAccess() {
  // If you have a separate account creation page use that. For now we go back to login.
  window.location.href = "index.html";
}

/* Simple single-page nav: go to sections (simulated) */
function goSection(id) {
  // highlight active link
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
  const matching = Array.from(document.querySelectorAll(".nav-links a")).find(a => a.textContent.trim().toLowerCase() === (id === 'how' ? 'how it works' : id).toLowerCase() || a.getAttribute('onclick')?.includes(id));
  if (matching) matching.classList.add("active");

  // Simulated scroll or content swap
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert("You are on HOME (simulated).");
  } else if (id === "market") {
    alert("Go to MARKET (simulated). Later you can link to market.html");
  } else if (id === "how") {
    alert("How it works: Farmers list produce → Buyers browse → Direct contact (simulated).");
  } else if (id === "contact") {
    alert("Contact / Support: Email support@pasumaipettagam.example (simulated).");
  }
}

/* Mobile nav toggle */
function toggleMobileNav() {
  const nav = document.getElementById("navLinks");
  if (nav.classList.contains("show")) nav.classList.remove("show");
  else nav.classList.add("show");
}
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
}
/* ===== OTP & Register buttons behaviour ===== */

(() => {
  // Elements
  const getOtpBtn = document.getElementById('getOtpBtn');
  const otpInput = document.getElementById('otpInput');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const otpMsg = document.getElementById('otpMsg');

  // Flags and values
  let currentOtp = null;
  let otpVerified = false;

  // Helper - generate 6-digit OTP
  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Click Get OTP
  if (getOtpBtn) {
    getOtpBtn.addEventListener('click', function () {
      // Generate and "send" OTP (simulated)
      currentOtp = generateOtp();
      otpVerified = false;

      // Show OTP input and verify button
      otpInput.classList.remove('hidden');
      verifyOtpBtn.classList.remove('hidden');
      otpMsg.textContent = 'OTP sent (simulated) to your email/mobile.';
      otpMsg.style.color = '#333';

      // For demo only: show generated OTP in console (remove in real app)
      console.log('Simulated OTP:', currentOtp);

      // Optionally show a short notice: for demo, reveal last 3 digits (or don't)
      // otpMsg.textContent += ' (for demo: ' + currentOtp.slice(-3) + ')';
    });
  }

  // Verify OTP
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', function () {
      const entered = (otpInput.value || '').trim();
      if (!entered) {
        otpMsg.textContent = 'Please enter the OTP.';
        otpMsg.style.color = 'red';
        return;
      }
      if (entered === currentOtp) {
        otpVerified = true;
        otpMsg.textContent = 'OTP verified ✅';
        otpMsg.style.color = 'green';
        // Optionally hide OTP fields after success
        // otpInput.classList.add('hidden');
        // verifyOtpBtn.classList.add('hidden');
      } else {
        otpMsg.textContent = 'Wrong OTP. Try again.';
        otpMsg.style.color = 'red';
      }
    });
  }

  // LOGIN FORM SUBMISSION HANDLING
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault(); // keep existing behaviour

      const username = document.querySelector("input[type='text']").value.trim();
      const password = document.querySelector("input[type='password']").value.trim();

      // Simple empty check
      if (!username || !password) {
        alert('Please fill username and password.');
        return;
      }

      // If user requested OTP (currentOtp != null), require verified
      if (currentOtp !== null && !otpVerified) {
        alert('You requested an OTP. Please verify it before logging in.');
        return;
      }

      // Passed checks — redirect to home (existing behavior)
      window.location.href = 'home.html';
    });
  }

  // Register buttons: redirect to simple placeholder pages (or create pages)
  const regFarmer = document.getElementById('regFarmer');
  const regBuyer = document.getElementById('regBuyer');
  const regStockist = document.getElementById('regStockist');

  if (regFarmer) regFarmer.addEventListener('click', () => {
    // If you create a page register_farmer.html, the user will be sent there.
    // For now we show a short message and optionally create placeholders.
    window.location.href = 'register_farmer.html';
  });

  if (regBuyer) regBuyer.addEventListener('click', () => {
    window.location.href = 'register_buyer.html';
  });

  if (regStockist) regStockist.addEventListener('click', () => {
    window.location.href = 'register_stockist.html';
  });

})();
// ✅ Redirect each role login button to its specific login page

document.getElementById("farmerLogin").addEventListener("click", function () {
  window.location.href = "register_farmer.html";
});

document.getElementById("buyerLogin").addEventListener("click", function () {
  window.location.href = "register_buyer.html";
});

document.getElementById("stockistLogin").addEventListener("click", function () {
  window.location.href = "register_stockist.html";
});
// ===== Linking Login Page Buttons to Their Pages =====

// Wait until everything is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Farmer login button
  const farmerBtn = document.getElementById("farmerLoginBtn");
  if (farmerBtn) {
    farmerBtn.addEventListener("click", function () {
      window.location.href = "login-farmer.html";
    });
  }

  // Buyer login button
  const buyerBtn = document.getElementById("buyerLoginBtn");
  if (buyerBtn) {
    buyerBtn.addEventListener("click", function () {
      window.location.href = "login-buyer.html";
    });
  }

  // Stockist login button
  const stockistBtn = document.getElementById("stockistLoginBtn");
  if (stockistBtn) {
    stockistBtn.addEventListener("click", function () {
      window.location.href = "login-stockist.html";
    });
  }
});
window.location.href = 'farmer_uploads.html';
<script>
  const voiceBtn = document.getElementById('voiceBtn');
  const searchInput = document.getElementById('searchInput');
  const voiceStatus = document.getElementById('voiceStatus');

  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceStatus.textContent = "🎤 Voice search not supported in this browser.";
    voiceBtn.disabled = true;
  } else {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    voiceBtn.addEventListener("click", () => {
      recognition.start();
      voiceStatus.textContent = "🎙️ Listening... please speak.";
    });

    recognition.addEventListener("result", (event) => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      voiceStatus.textContent = `✅ You said: "${transcript}"`;
    });

    recognition.addEventListener("end", () => {
      voiceStatus.textContent += " (Stopped listening)";
    });
  }

  // Simple search action
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      alert("🔍 Searching for: " + query);
    } else {
      alert("Please type or speak your search query!");
    }

function go(page){
    window.location.href = "./PASUMAI_STOCKIST/" + page + ".html";
}
<script>
  // Export CSV → open stockist_export_csv.html
  document.getElementById("exportBtn").addEventListener("click", () => {
    window.location.href = "stockist_pages/stockist_export_csv.html";
  });

  // Generate Report → open stockist_generate_report.html
  document.getElementById("reportsBtn").addEventListener("click", () => {
    window.location.href = "stockist_pages/stockist_generate_report.html";
  });
</script>
