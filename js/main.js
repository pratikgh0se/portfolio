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
            console.log("tempContainer.innerHTML for skills-graphical.html (index page):", tempContainer.innerHTML.substring(0, 500) + "..."); // Log first 500 chars

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
            console.log("Project cards HTML fetched successfully (index page). Raw text length:", text.length);
            
            const tempContainer = document.createElement('div'); // Create a temporary div
            tempContainer.innerHTML = text; // Parse the HTML string into the temporary div
            console.log("tempContainer.innerHTML for project_cards.html (index page):", tempContainer.innerHTML.substring(0, 500) + "..."); // Log first 500 chars

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
            console.log("Project cards HTML fetched successfully (projects page). Raw text length:", text.length);
            
            const tempContainer = document.createElement('div'); // Create a temporary div
            tempContainer.innerHTML = text; // Parse the HTML string into the temporary div
            console.log("tempContainer.innerHTML for project_cards.html (projects page):", tempContainer.innerHTML.substring(0, 500) + "..."); // Log first 500 chars

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


// Event listener to attach to the contact button in the navigation
document.addEventListener('DOMContentLoaded', function() {
    var contactBtn = document.getElementById("contactModalBtn");
    if (contactBtn) {
        contactBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            openContactModal();
        });
    } else {
        console.error("Contact modal button (contactModalBtn) not found!");
    }

    // Event listener for the close button inside the modal
    var closeSpan = document.querySelector("#contactModal .close-button");
    if (closeSpan) {
        closeSpan.addEventListener('click', closeContactModal);
    }

    // Event listener to close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        var modal = document.getElementById("contactModal");
        if (event.target == modal) {
            closeContactModal();
        }
    });

    // Load dynamic content when the DOM is fully loaded
    loadDynamicContent();
});
