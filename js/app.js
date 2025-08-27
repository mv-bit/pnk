// PNK Property Page - Dynamic Data Loading
class PropertyPage {
  constructor() {
    this.apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5001/api'
      : 'https://pnk-dashboard-1088931938477.us-east1.run.app/api';
    this.currentProperty = null;
    this.init();
  }

  async init() {
    // Get property ID from URL params or default to first property
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (propertyId) {
      await this.loadProperty(propertyId);
    } else {
      await this.loadFirstProperty();
    }
    
    this.setupEventListeners();
  }

  async loadFirstProperty() {
    try {
      const response = await fetch(`${this.apiUrl}/projects`);
      const projects = await response.json();
      
      if (projects && projects.length > 0) {
        // Find a built project with good data
        const builtProject = projects.find(p => p.status === 'built' && p.location?.facilityName) || projects[0];
        await this.loadProperty(builtProject._id);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      this.showError('Failed to load property data');
    }
  }

  async loadProperty(propertyId) {
    try {
      const response = await fetch(`${this.apiUrl}/projects/${propertyId}`);
      const project = await response.json();
      
      if (project) {
        this.currentProperty = project;
        this.updatePageContent(project);
      }
    } catch (error) {
      console.error('Error loading property:', error);
      this.showError('Failed to load property details');
    }
  }

  updatePageContent(project) {
    const location = project.location || {};
    const specifications = project.specifications || {};
    const images = project.images || {};
    
    // Update breadcrumb
    this.updateElement('property-breadcrumb', location.facilityName || 'Property');
    
    // Update hero section
    this.updateElement('property-name', `PNK ${location.facilityName || 'Property'}`);
    this.updateElement('property-address', this.formatAddress(location));
    
    // Update stats
    this.updateElement('stat-sqft', this.formatNumber(specifications.availableSF || 0));
    this.updateElement('stat-docks', specifications.dockDoors || '0');
    this.updateElement('stat-height', specifications.clearHeight?.primary ? `${specifications.clearHeight.primary}'` : 'N/A');
    this.updateElement('stat-completion', project.yearBuilt || new Date().getFullYear());
    
    // Update property tags
    this.updatePropertyTags(project);
    
    // Update technical specifications
    this.updateTechnicalSpecs(project);
    
    // Update map property name
    this.updateElement('map-property-name', `PNK ${location.facilityName || 'Property'}`);
    
    // Update address details
    this.updateAddressDetails(location);
    
    // Update gallery if images exist
    if (images.media && images.media.length > 0) {
      this.updateGallery(images.media);
    }
    
    // Update hero image if available
    if (images.primary) {
      const heroImage = document.getElementById('hero-image');
      if (heroImage) {
        heroImage.style.backgroundImage = `url(${images.primary})`;
        heroImage.style.backgroundSize = 'cover';
        heroImage.style.backgroundPosition = 'center';
      }
    }
  }

  updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = content;
    }
  }

  formatAddress(location) {
    const parts = [];
    if (location.streetAddress) parts.push(location.streetAddress);
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    if (location.zip) parts.push(location.zip);
    return parts.join(', ');
  }

  formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }

  updatePropertyTags(project) {
    const tagsContainer = document.getElementById('property-tags');
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = '';
    
    // Status tag
    if (project.status === 'built') {
      tagsContainer.innerHTML += '<span class="bg-green-100 text-green-800 px-2 py-1 text-xs">Available Now</span>';
    } else if (project.status === 'under-construction') {
      tagsContainer.innerHTML += '<span class="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs">Under Construction</span>';
    }
    
    // KOZ tag
    if (project.incentives?.kozQualified) {
      tagsContainer.innerHTML += '<span class="bg-neutral-100 text-neutral-800 px-2 py-1 text-xs">KOZ Certified</span>';
    }
    
    // PILOT tag
    if (project.incentives?.pilotProgram) {
      tagsContainer.innerHTML += '<span class="bg-neutral-100 text-neutral-800 px-2 py-1 text-xs">PILOT Program</span>';
    }
    
    // Green building tag
    if (project.greenBuildingFeatures?.leedCertification) {
      tagsContainer.innerHTML += `<span class="bg-green-100 text-green-800 px-2 py-1 text-xs">LEED ${project.greenBuildingFeatures.leedCertification}</span>`;
    }
  }

  updateTechnicalSpecs(project) {
    const specifications = project.specifications || {};
    
    // Update building details
    const buildingDetails = document.getElementById('building-details');
    if (buildingDetails) {
      buildingDetails.innerHTML = `
        <div class="flex justify-between">
          <span class="text-neutral-600">Total Building Area:</span>
          <span>${this.formatNumber(specifications.totalBuildingSF || 0)} sq ft</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Available Area:</span>
          <span>${this.formatNumber(specifications.availableSF || 0)} sq ft</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Office Area:</span>
          <span>${this.formatNumber(specifications.officeSF || 0)} sq ft</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Clear Height:</span>
          <span>${specifications.clearHeight?.primary || 'N/A'} feet</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Column Spacing:</span>
          <span>${specifications.columnSpacing || 'N/A'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Floor Load:</span>
          <span>${specifications.floorLoad || 'N/A'}</span>
        </div>
      `;
    }
    
    // Update loading details
    const loadingDetails = document.getElementById('loading-details');
    if (loadingDetails) {
      loadingDetails.innerHTML = `
        <div class="flex justify-between">
          <span class="text-neutral-600">Dock Doors:</span>
          <span>${specifications.dockDoors || '0'} total</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Grade Doors:</span>
          <span>${specifications.gradeDoors || '0'} drive-in</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Truck Court:</span>
          <span>${specifications.truckCourtDepth || 'N/A'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Trailer Parking:</span>
          <span>${specifications.trailerParkingSpaces || '0'} spaces</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Car Parking:</span>
          <span>${specifications.carParkingSpaces || '0'} spaces</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Rail Access:</span>
          <span>${specifications.railAccess ? 'Yes' : 'No'}</span>
        </div>
      `;
    }
    
    // Update utilities
    const utilitiesDetails = document.getElementById('utilities-details');
    if (utilitiesDetails && specifications.utilities) {
      const utilities = specifications.utilities;
      utilitiesDetails.innerHTML = `
        <div class="flex justify-between">
          <span class="text-neutral-600">Electrical Service:</span>
          <span>${utilities.electricalCapacity || 'Standard'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Lighting:</span>
          <span>${utilities.lighting || 'LED throughout'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">HVAC System:</span>
          <span>${utilities.hvacSystem || 'Standard'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Fire Protection:</span>
          <span>${utilities.fireProtection || 'ESFR sprinkler'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Internet:</span>
          <span>${utilities.fiberOptic ? 'Fiber ready' : 'Standard'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Gas Service:</span>
          <span>${utilities.gasService ? 'Available' : 'N/A'}</span>
        </div>
      `;
    }
  }

  updateAddressDetails(location) {
    const addressDetails = document.getElementById('address-details');
    if (addressDetails) {
      const parts = [];
      if (location.streetAddress) parts.push(`<p class="text-neutral-700 text-sm mb-2">${location.streetAddress}</p>`);
      if (location.city && location.state) {
        parts.push(`<p class="text-neutral-700 text-sm mb-2">${location.city}, ${location.state}</p>`);
      }
      if (location.zip) parts.push(`<p class="text-neutral-700 text-sm">${location.zip}</p>`);
      
      addressDetails.innerHTML = parts.join('');
    }
  }

  updateGallery(media) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    // Show up to 6 media items
    const itemsToShow = media.slice(0, 6);
    
    itemsToShow.forEach((item, index) => {
      const isVideo = item.type === 'video' || item.url?.includes('.mp4');
      const galleryItem = document.createElement('div');
      galleryItem.className = 'relative group cursor-pointer';
      
      if (isVideo) {
        galleryItem.innerHTML = `
          <div class="aspect-video bg-neutral-600 rounded-lg flex items-center justify-center text-white text-sm">
            <video class="w-full h-full object-cover rounded-lg" poster="${item.thumbnail || ''}">
              <source src="${item.url}" type="video/mp4">
            </video>
          </div>
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
            <i class="fa-solid fa-play text-white opacity-0 group-hover:opacity-100 text-2xl"></i>
          </div>
        `;
      } else {
        galleryItem.innerHTML = `
          <div class="aspect-video bg-neutral-600 rounded-lg overflow-hidden">
            <img src="${item.url}" alt="Property image ${index + 1}" class="w-full h-full object-cover">
          </div>
        `;
      }
      
      galleryGrid.appendChild(galleryItem);
    });
  }

  setupEventListeners() {
    // Download brochure button
    const downloadBtn = document.querySelector('button:has(i.fa-download)');
    if (downloadBtn && this.currentProperty) {
      downloadBtn.addEventListener('click', () => {
        this.downloadBrochure();
      });
    }
    
    // Back to properties link
    const backLink = document.querySelector('.fa-arrow-left')?.parentElement;
    if (backLink) {
      backLink.addEventListener('click', () => {
        window.location.href = 'properties.html';
      });
    }
    
    // Contact form
    const contactForm = document.querySelector('#contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitContactForm(e.target);
      });
    }
  }

  async downloadBrochure() {
    if (!this.currentProperty) return;
    
    try {
      // Generate PDF using the PDF generator API
      const response = await fetch(`${this.apiUrl}/generate-pdf/${this.currentProperty._id}`, {
        method: 'GET',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PNK_${this.currentProperty.location?.facilityName || 'Property'}_Brochure.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error downloading brochure:', error);
    }
  }

  submitContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send this to an API
    console.log('Contact form submission:', data);
    
    // Show success message
    alert('Thank you for your inquiry! We will contact you soon.');
    form.reset();
  }

  showError(message) {
    console.error(message);
    // You could show a user-friendly error message here
  }
}

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PropertyPage();
});