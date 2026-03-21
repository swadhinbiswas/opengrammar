// ===================================
// OpenGrammar Documentation Scripts
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize search
    initSearch();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize FAQ
    initFAQ();
    
    // Load initial content
    loadInitialContent();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            showSection(targetId);
            
            // Update URL hash
            window.location.hash = targetId;
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        if (hash && documentationContent[hash]) {
            showSection(hash);
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('data-page') === hash);
            });
        }
    });
}

function showSection(sectionId) {
    const wrapper = document.getElementById('contentWrapper');
    if (!wrapper) return;
    
    const content = documentationContent[sectionId];
    if (content) {
        wrapper.innerHTML = content;
        
        // Update nav active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-page') === sectionId);
        });
        
        // Reinitialize FAQ if on FAQ page
        if (sectionId === 'faq') {
            initFAQ();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function loadInitialContent() {
    const hash = window.location.hash.slice(1);
    if (hash && documentationContent[hash]) {
        showSection(hash);
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-page') === hash);
        });
    } else {
        showSection('index');
        const firstLink = document.querySelector('.nav-link[data-page="index"]');
        if (firstLink) firstLink.classList.add('active');
    }
}

// Search
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            return;
        }
        
        // Search in section titles
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const match = navLinks.find(link => {
            const text = link.textContent.toLowerCase();
            return text.includes(query);
        });
        
        if (match) {
            const targetId = match.getAttribute('data-page');
            showSection(targetId);
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('data-page') === targetId);
            });
        }
    });
    
    // Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput?.focus();
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.remove('open');
}

// FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// Copy code function (global)
window.copyCode = function(btn) {
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock?.querySelector('code')?.textContent;
    
    if (code) {
        navigator.clipboard.writeText(code).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = `
                <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Copied!
            `;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        });
    }
};
