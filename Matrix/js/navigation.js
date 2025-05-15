function initNavigation() {
    const allSections = {
        'matrix': document.getElementById('matrix-section'),
        'nasa': document.getElementById('nasa-section'),
        'jedi': document.getElementById('jedi-section'),
        'weather': document.getElementById('weather-section')
    };

    const allTabs = {
        'matrix': document.getElementById('matrix-tab'),
        'nasa': document.getElementById('nasa-tab'),
        'jedi': document.getElementById('jedi-tab'),
        'weather': document.getElementById('weather-tab')
    };

    function showSection(sectionName) {
        Object.values(allSections).forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        Object.values(allTabs).forEach(tab => {
            if (tab) tab.classList.remove('active');
        });
        
        if (allSections[sectionName]) {
            allSections[sectionName].style.display = 'block';
        }
        if (allTabs[sectionName]) {
            allTabs[sectionName].classList.add('active');
        }
    }

    Object.keys(allTabs).forEach(key => {
        if (allTabs[key]) {
            allTabs[key].addEventListener('click', () => showSection(key));
        }
    });
}