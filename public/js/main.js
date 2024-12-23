const auth = new Auth();

// DOM Elements
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const homeSection = document.getElementById('homeSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const dashboardLink = document.getElementById('dashboardLink');

// Form Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Navigation Functions
function showSection(section) {
    [homeSection, loginSection, registerSection, dashboardSection].forEach(s => {
        s.classList.add('d-none');
    });
    section.classList.remove('d-none');
}

// Event Listeners
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(loginSection);
});

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(registerSection);
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.logout();
    updateUI();
});

// Form Submissions
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await auth.login(email, password);
        updateUI();
        showSection(dashboardSection);
    } catch (error) {
        alert(error.message);
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        await auth.register(name, email, password);
        alert('Registration successful! Please login.');
        showSection(loginSection);
    } catch (error) {
        alert(error.message);
    }
});

// UI Update
function updateUI() {
    if (auth.isLoggedIn()) {
        loginBtn.classList.add('d-none');
        registerBtn.classList.add('d-none');
        logoutBtn.classList.remove('d-none');
        dashboardLink.classList.remove('d-none');
        
        const user = auth.getUser();
        if (user) {
            document.getElementById('userInfo').innerHTML = `
                <h3>Welcome, ${user.name}!</h3>
                <p>Email: ${user.email}</p>
                <p>Role: ${user.role}</p>
            `;
        }
    } else {
        loginBtn.classList.remove('d-none');
        registerBtn.classList.remove('d-none');
        logoutBtn.classList.add('d-none');
        dashboardLink.classList.add('d-none');
    }
}

// Initial UI setup
updateUI();