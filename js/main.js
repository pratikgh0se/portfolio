// Function to open the contact modal
function openContactModal() {
    var modal = document.getElementById("contactModal");
    if (modal) {
        modal.style.display = "flex"; // Use flex to center content
    } else {
        console.error("Contact modal element not found!");
    }
}

// Function to close the contact modal
function closeContactModal() {
    var modal = document.getElementById("contactModal");
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("Contact modal element not found!");
    }
}

// Function to fetch and inject common HTML components
async function loadCommonComponents() {
    console.log("Loading common HTML components...");
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const contactModalPlaceholder = document.getElementById('contact-modal-placeholder');

    // Fetch and inject header
    if (headerPlaceholder) {
        try {
            const response = await fetch('html/header.html');
            if (response.ok) {
                headerPlaceholder.innerHTML = await response.text();
                console.log("Header loaded successfully.");
            } else {
                console.error("Failed to load header:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching header:", error);
        }
    }

    // Fetch and inject footer
    if (footerPlaceholder) {
        try {
            const response = await fetch('html/footer.html');
            if (response.ok) {
                footerPlaceholder.innerHTML = await response.text();
                console.log("Footer loaded successfully.");
            } else {
                console.error("Failed to load footer:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching footer:", error);
        }
    }

    // Fetch and inject contact modal
    if (contactModalPlaceholder) {
        try {
            const response = await fetch('html/contact_modal.html');
            if (response.ok) {
                contactModalPlaceholder.innerHTML = await response.text();
                console.log("Contact modal loaded successfully.");
            } else {
                console.error("Failed to load contact modal:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching contact modal:", error);
        }
    }
}

// Function to initialize all event listeners after dynamic content is loaded
function initializeEventListeners() {
    console.log("Initializing event listeners...");

    // Desktop Contact Button
    var contactBtnDesktop = document.getElementById("contactModalBtnDesktop");
    if (contactBtnDesktop) {
        contactBtnDesktop.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            openContactModal();
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    } else {
        console.warn("Desktop Contact modal button (contactModalBtnDesktop) not found!");
    }

    // Mobile Contact Button
    var contactBtnMobile = document.getElementById("contactModalBtnMobile");
    if (contactBtnMobile) {
        contactBtnMobile.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            openContactModal();
            // Close mobile menu after clicking contact
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    } else {
        console.warn("Mobile Contact modal button (contactModalBtnMobile) not found!");
    }

    // Event listener for the close button inside the modal
    var closeSpan = document.querySelector("#contactModal .close-button");
    if (closeSpan) {
        closeSpan.addEventListener('click', closeContactModal);
    } else {
        console.warn("Contact modal close button not found!");
    }

    // Event listener to close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        var modal = document.getElementById("contactModal");
        if (modal && event.target == modal) { // Ensure modal exists before checking event.target
            closeContactModal();
        }
    });

    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            console.log("Mobile menu button clicked!");
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a navigation link inside it is clicked
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when window is resized to desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) { // 768px is Tailwind's md breakpoint
                mobileMenu.classList.add('hidden');
            }
        });
    } else {
        console.warn("Mobile menu button or mobile menu element not found after header load!");
    }

    // Highlight active navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('[data-nav-link]');
    navLinks.forEach(link => {
        // Normalize paths for comparison (e.g., remove leading/trailing slashes, .html)
        const linkPath = link.getAttribute('href').replace(/^\/|\/$/g, '').replace(/\.html$/, '');
        const pagePath = currentPath.replace(/^\/|\/$/g, '').replace(/\.html$/, '');

        // Handle index.html specifically, or if paths match
        if (linkPath === pagePath || (linkPath === 'index' && (pagePath === '' || pagePath === 'index'))) {
            link.classList.add('text-blue-600');
            link.classList.remove('text-gray-600', 'hover:text-blue-600');
        } else {
            link.classList.remove('text-blue-600');
            link.classList.add('text-gray-600', 'hover:text-blue-600');
        }
    });
}


// Function to dynamically load content into index.html and projects.html
async function loadDynamicContent() {
    console.log("Attempting to load dynamic content...");

    // --- Logic for index.html ---
    // Load Core Skills into index.html
    const keySkillsContainer = document.getElementById('key-skills-content');
    if (keySkillsContainer) {
        try {
            console.log("Fetching skills-graphical.html for index page...");
            const response = await fetch('skills-graphical.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            console.log("Skills graphical HTML fetched successfully (index page). Raw text length:", text.length);
            
            const tempContainer = document.createElement('div'); // Create a temporary div
            tempContainer.innerHTML = text; // Parse the HTML string into the temporary div

            const coreSkillsSection = tempContainer.querySelector('#core-skills'); // Query the specific section ID within the temp div
            if (coreSkillsSection) {
                const introParagraph = coreSkillsSection.querySelector('p');
                const skillGrid = coreSkillsSection.querySelector('.grid');
                if (introParagraph && skillGrid) {
                    const contentToInject = document.createElement('div'); // Use a new div to hold content before appending
                    contentToInject.innerHTML = `
                        <p class="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">${introParagraph.textContent}</p>
                        ${skillGrid.outerHTML}
                        <div class="text-center mt-10">
                            <a href="skills-graphical.html" class="btn-primary text-lg">View All Skills & Tools &rarr;</a>
                        </div>
                    `;
                    keySkillsContainer.innerHTML = ''; // Clear existing content
                    while (contentToInject.firstChild) {
                        keySkillsContainer.appendChild(contentToInject.firstChild);
                    }
                    console.log("Core skills loaded into index page successfully.");
                } else {
                    console.error("Could not find intro paragraph or skill grid in #core-skills section of skills-graphical.html for index page.");
                }
            } else {
                console.error("Core skills section (#core-skills) not found in skills-graphical.html for index page.");
            }
        } catch (error) {
            console.error("Error loading skills content for index page:", error);
        }
    }

    // Load Featured Projects (first 6) into index.html
    const featuredProjectsContainer = document.getElementById('featured-projects-content');
    if (featuredProjectsContainer) {
        try {
            console.log("Fetching html/project_cards.html for index page (featured projects)...");
            const response = await fetch('html/project_cards.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            
            const tempContainer = document.createElement('div'); // Create a temporary div
            tempContainer.innerHTML = text; // Parse the HTML string into the temporary div

            const projectCards = Array.from(tempContainer.querySelectorAll('.project-card')).slice(0, 6); // Query within the temp div
            console.log("Found", projectCards.length, "featured project cards.");

            if (projectCards.length > 0) {
                featuredProjectsContainer.innerHTML = ''; // Clear existing content
                projectCards.forEach(card => featuredProjectsContainer.appendChild(card.cloneNode(true)));

                const viewAllProjectsButton = document.createElement('div');
                viewAllProjectsButton.className = "text-center mt-10 col-span-full";
                viewAllProjectsButton.innerHTML = `<a href="projects.html" class="btn-primary text-lg">View All Projects &rarr;</a>`;
                featuredProjectsContainer.appendChild(viewAllProjectsButton);
                console.log("Featured projects loaded into index page successfully.");
            } else {
                featuredProjectsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">No featured projects found.</p>';
                console.warn("No featured project cards found in html/project_cards.html for index page.");
            }

        } catch (error) {
            console.error("Error loading featured projects content for index page:", error);
        }
    }

    // --- Logic for projects.html ---
    // Load ALL Projects into projects.html
    const allProjectsContainer = document.getElementById('all-projects-grid');
    if (allProjectsContainer) {
        try {
            console.log("Fetching html/project_cards.html for projects page (all projects)...");
            const response = await fetch('html/project_cards.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            
            const tempContainer = document.createElement('div'); // Create a temporary div
            tempContainer.innerHTML = text; // Parse the HTML string into the temporary div

            const allProjectCards = Array.from(tempContainer.querySelectorAll('.project-card')); // Query within the temp div
            console.log("Found", allProjectCards.length, "project cards for all projects page.");

            if (allProjectCards.length > 0) {
                allProjectsContainer.innerHTML = ''; // Clear existing "Loading..." message
                allProjectCards.forEach(card => allProjectsContainer.appendChild(card.cloneNode(true)));
                console.log("All projects loaded into projects page successfully.");
            } else {
                allProjectsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">No projects found.</p>';
                console.warn("No project cards found in html/project_cards.html for all projects page.");
            }

        } catch (error) {
            console.error("Error loading all projects content for projects page:", error);
        }
    }
}


// Event listener to run once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load common components first
    await loadCommonComponents();
    
    // Then initialize event listeners for the newly loaded components
    initializeEventListeners();

    // Then load other dynamic content specific to the page
    loadDynamicContent();
});
