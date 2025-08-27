// PNK Properties Listing Page
class PropertiesPage {
  constructor() {
    this.apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5001/api'
      : 'https://pnk-dashboard-1088931938477.us-east1.run.app/api';
    this.properties = [];
    this.filteredProperties = [];
    this.init();
  }

  async init() {
    await this.loadProperties();
    this.setupFilters();
    this.setupEventListeners();
  }

  async loadProperties() {
    this.showLoading(true);
    try {
      const response = await fetch(`${this.apiUrl}/projects`);
      this.properties = await response.json();
      this.filteredProperties = [...this.properties];
      
      this.populateStateFilter();
      this.applyFilters();
      this.renderProperties();
    } catch (error) {
      console.error('Error loading properties:', error);
      this.showError('Failed to load properties');
    } finally {
      this.showLoading(false);
    }
  }

  populateStateFilter() {
    const states = [...new Set(this.properties
      .map(p => p.location?.state)
      .filter(Boolean)
    )].sort();
    
    const stateFilter = document.getElementById('state-filter');
    if (stateFilter) {
      stateFilter.innerHTML = '<option value="">All States</option>';
      states.forEach(state => {
        stateFilter.innerHTML += `<option value="${state}">${state}</option>`;
      });
    }
  }

  setupFilters() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.applyFilters();
      });
    }
    
    // State filter
    const stateFilter = document.getElementById('state-filter');
    if (stateFilter) {
      stateFilter.addEventListener('change', () => {
        this.applyFilters();
      });
    }
    
    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
      statusFilter.addEventListener('change', () => {
        this.applyFilters();
      });
    }
    
    // Size filter
    const sizeFilter = document.getElementById('size-filter');
    if (sizeFilter) {
      sizeFilter.addEventListener('input', () => {
        this.applyFilters();
      });
    }
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        this.sortProperties();
        this.renderProperties();
      });
    }
  }

  setupEventListeners() {
    // Reset button
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }
  }

  applyFilters() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const selectedState = document.getElementById('state-filter')?.value || '';
    const selectedStatus = document.getElementById('status-filter')?.value || '';
    const minSize = parseInt(document.getElementById('size-filter')?.value) || 0;
    
    this.filteredProperties = this.properties.filter(property => {
      // Search filter
      if (searchTerm) {
        const searchableText = `
          ${property.location?.facilityName || ''}
          ${property.location?.city || ''}
          ${property.location?.state || ''}
          ${property.location?.streetAddress || ''}
        `.toLowerCase();
        
        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }
      
      // State filter
      if (selectedState && property.location?.state !== selectedState) {
        return false;
      }
      
      // Status filter
      if (selectedStatus && property.status !== selectedStatus) {
        return false;
      }
      
      // Size filter
      if (minSize > 0) {
        const propertySize = property.specifications?.availableSF || 0;
        if (propertySize < minSize) {
          return false;
        }
      }
      
      return true;
    });
    
    this.sortProperties();
    this.renderProperties();
    this.updateResultsCount();
  }

  sortProperties() {
    const sortBy = document.getElementById('sort-select')?.value || 'name';
    
    this.filteredProperties.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          const nameA = a.location?.facilityName || '';
          const nameB = b.location?.facilityName || '';
          return nameA.localeCompare(nameB);
        
        case 'size':
          const sizeA = a.specifications?.availableSF || 0;
          const sizeB = b.specifications?.availableSF || 0;
          return sizeB - sizeA; // Largest first
        
        case 'year':
          const yearA = a.yearBuilt || 0;
          const yearB = b.yearBuilt || 0;
          return yearB - yearA; // Newest first
        
        case 'status':
          const statusOrder = { 'built': 0, 'under-construction': 1, 'planned': 2 };
          const statusA = statusOrder[a.status] || 999;
          const statusB = statusOrder[b.status] || 999;
          return statusA - statusB;
        
        default:
          return 0;
      }
    });
  }

  renderProperties() {
    const grid = document.getElementById('properties-grid');
    const noResults = document.getElementById('no-results');
    
    if (!grid) return;
    
    if (this.filteredProperties.length === 0) {
      grid.innerHTML = '';
      if (noResults) {
        noResults.classList.remove('hidden');
      }
      return;
    }
    
    if (noResults) {
      noResults.classList.add('hidden');
    }
    
    grid.innerHTML = this.filteredProperties.map(property => {
      const location = property.location || {};
      const specifications = property.specifications || {};
      const images = property.images || {};
      
      return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
             onclick="window.location.href='index.html?id=${property._id}'">
          <div class="aspect-video bg-gray-200 relative">
            ${images.primary ? 
              `<img src="${images.primary}" alt="${location.facilityName}" class="w-full h-full object-cover">` :
              `<div class="flex items-center justify-center h-full text-gray-400">
                <i class="fa-solid fa-building text-4xl"></i>
              </div>`
            }
            <div class="absolute top-2 right-2">
              ${this.getStatusBadge(property.status)}
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              PNK ${location.facilityName || 'Property'}
            </h3>
            
            <p class="text-sm text-gray-600 mb-3">
              <i class="fa-solid fa-location-dot mr-1"></i>
              ${location.city || 'Location'}, ${location.state || 'TBD'}
            </p>
            
            <div class="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span class="text-gray-500">Size:</span>
                <span class="ml-1 font-medium">${this.formatNumber(specifications.availableSF || 0)} SF</span>
              </div>
              <div>
                <span class="text-gray-500">Clear Height:</span>
                <span class="ml-1 font-medium">${specifications.clearHeight?.primary || 'N/A'}'</span>
              </div>
              <div>
                <span class="text-gray-500">Docks:</span>
                <span class="ml-1 font-medium">${specifications.dockDoors || '0'}</span>
              </div>
              <div>
                <span class="text-gray-500">Year:</span>
                <span class="ml-1 font-medium">${property.yearBuilt || 'TBD'}</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-3">
              ${property.incentives?.kozQualified ? 
                '<span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">KOZ</span>' : ''}
              ${property.incentives?.pilotProgram ? 
                '<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">PILOT</span>' : ''}
              ${property.greenBuildingFeatures?.leedCertification ? 
                `<span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">LEED ${property.greenBuildingFeatures.leedCertification}</span>` : ''}
              ${specifications.railAccess ? 
                '<span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Rail Access</span>' : ''}
            </div>
            
            <button class="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors">
              View Details
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  getStatusBadge(status) {
    const badges = {
      'built': '<span class="bg-green-500 text-white px-2 py-1 rounded text-xs">Available</span>',
      'under-construction': '<span class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Coming Soon</span>',
      'planned': '<span class="bg-blue-500 text-white px-2 py-1 rounded text-xs">Planned</span>'
    };
    return badges[status] || '<span class="bg-gray-500 text-white px-2 py-1 rounded text-xs">TBD</span>';
  }

  formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }

  updateResultsCount() {
    const countElement = document.getElementById('results-count');
    if (countElement) {
      const total = this.properties.length;
      const filtered = this.filteredProperties.length;
      
      if (filtered === total) {
        countElement.textContent = `Showing all ${total} properties`;
      } else {
        countElement.textContent = `Showing ${filtered} of ${total} properties`;
      }
    }
  }

  resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('state-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('size-filter').value = '';
    document.getElementById('sort-select').value = 'name';
    
    this.applyFilters();
  }

  showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) {
      if (show) {
        loading.classList.remove('hidden');
      } else {
        loading.classList.add('hidden');
      }
    }
  }

  showError(message) {
    console.error(message);
    const grid = document.getElementById('properties-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12">
          <i class="fa-solid fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
          <p class="text-gray-600">${message}</p>
          <button onclick="location.reload()" class="mt-4 text-blue-600 hover:text-blue-700">
            Try Again
          </button>
        </div>
      `;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.propertiesPage = new PropertiesPage();
});

// Global function for reset button
function resetFilters() {
  if (window.propertiesPage) {
    window.propertiesPage.resetFilters();
  }
}