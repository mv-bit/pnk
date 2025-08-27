// Loggins Park 100 - Real Data from MongoDB
const logginsData = {
  _id: "68461383195672f73b979092",
  location: {
    facilityName: "Loggins Park 100",
    state: "GA",
    park: "Social Circle",
    address: "1365 E Hightower Trail Social Circle GA 30025",
    streetAddress: "1365 E Hightower Trail",
    city: "Social Circle",
    propertyCity: "Social Circle",
    zip: "30025",
    nearbyCities: [
      { name: "Covington", miles: 9, minutes: 15 },
      { name: "Monroe", miles: 10, minutes: 15 },
      { name: "Conyers", miles: 17, minutes: 25 },
      { name: "Snellville", miles: 22, minutes: 35 },
      { name: "Athens", miles: 35, minutes: 45 }
    ]
  },
  specifications: {
    availableSF: {
      primary: 1013902,
      unit: "SF"
    },
    totalBuildingSF: 1013902,
    autoParking: {
      primary: 603
    },
    carParkingSpaces: 603,
    truckParking: {
      primary: 231,
      alternate: 422
    },
    trailerParkingSpaces: 231,
    clearHeight: {
      primary: 40,
      unit: "feet"
    },
    columnSpacing: "50'x 56' with 60' speed bay",
    dimensions: {
      depth: 620,
      width: 1624,
      unit: "feet"
    },
    dockDoors: {
      count: 140
    },
    driveInDoors: {
      count: 4
    },
    gradeDoors: 4,
    electrical: "4000 amps at 277/480 volts 3 phase",
    electricalCapacity: "4000A, 480V",
    configuration: "Cross dock",
    roof: "60mil TPO R-25 insulation 20 year warranty",
    slab: '8" reinforced slab 4000 psi',
    floorLoad: "125 psf",
    sprinkler: "ESFR with K-25.2 sprinkler heads",
    fireProtection: "ESFR sprinkler",
    warehouseLighting: "30FC on 15' Whips / Motion Sensors",
    lighting: "LED throughout",
    truckCourtDepth: "190' truck court with concrete apron",
    utilities: {
      electricalCapacity: "4000A, 480V 3-phase",
      lighting: "LED throughout with motion sensors",
      hvacSystem: "Unit heaters",
      fireProtection: "ESFR sprinkler K-25.2",
      fiberOptic: true,
      gasService: true
    },
    railAccess: false
  },
  images: {
    primary: "https://storage.googleapis.com/pnkdata/projects/68461383195672f73b979092/images/1755545178207-Site%20plan.%20Loggins.jpg",
    planImage: {
      url: "https://storage.googleapis.com/pnkdata/projects/68461383195672f73b979092/images/1755545178207-Site%20plan.%20Loggins.jpg"
    },
    renderImage: {
      url: "https://storage.googleapis.com/pnkdata/projects/68436cc7f830586ef2b05011/images/1749355548783-Loggins-100-planImage.png"
    },
    socialImage: {
      url: "https://storage.googleapis.com/pnkdata/projects/68436cc7f830586ef2b05011/images/1749355552014-Loggins-100-socialImage.png"
    },
    areaImage: {
      url: "https://storage.googleapis.com/pnkdata/projects/68436cc7f830586ef2b05011/images/1749355552861-Loggins-100-areaImage.png"
    },
    media: [
      {
        type: "image",
        url: "https://storage.googleapis.com/pnkdata/projects/68461383195672f73b979092/images/1755545178207-Site%20plan.%20Loggins.jpg",
        title: "Site Plan"
      },
      {
        type: "image", 
        url: "https://storage.googleapis.com/pnkdata/projects/68436cc7f830586ef2b05011/images/1749355548783-Loggins-100-planImage.png",
        title: "Render View"
      },
      {
        type: "video",
        url: "https://drive.google.com/file/d/1PMopuAtxn59EicMaUL0LzUenUAp8JpfC/view",
        title: "Main Video Tour"
      }
    ]
  },
  status: "built",
  yearBuilt: 2024,
  greenBuildingFeatures: {
    leedCertification: null
  },
  incentives: {
    kozQualified: false,
    pilotProgram: false
  },
  demographicAnalysis: {
    "45_miles_population": 2900000,
    "45_miles_working_population": 1812500,
    "45_minutes_population": 1850000,
    "45_minutes_working_population": 1156250,
    "social_demographics_manufacturing_percent": 28.5,
    "social_demographics_trade_percent": 34,
    "social_demographics_population_percent": 32
  },
  files: [
    {
      title: "Photos of the property",
      url: "https://drive.google.com/drive/folders/1AVpWQ27KRsmRD5KUANP8eO0y5xajKD-H",
      fileType: "image"
    },
    {
      title: "Loggins 100 main video",
      url: "https://drive.google.com/file/d/1PMopuAtxn59EicMaUL0LzUenUAp8JpfC/view",
      fileType: "video"
    },
    {
      title: "Vertical videos",
      url: "https://drive.google.com/drive/folders/101EWET17iqIM4Ey1b_JWyoO8qKph52Mf",
      fileType: "video"
    }
  ],
  qrLink: "https://www.loopnet.com/Listing/1365-E-Hightower-Trl-Social-Circle-GA/34463747/"
};

// Function to populate the page with Loggins data
function populateLogginsData() {
  const data = logginsData;
  const location = data.location;
  const specs = data.specifications;
  
  // Update breadcrumb
  document.getElementById('property-breadcrumb').textContent = 'Loggins Park 100';
  
  // Update hero section
  document.getElementById('property-name').textContent = 'PNK Loggins Park 100';
  document.getElementById('property-address').textContent = '1365 E Hightower Trail, Social Circle, GA 30025';
  
  // Update stats
  document.getElementById('stat-sqft').textContent = '1,013,902';
  document.getElementById('stat-docks').textContent = '140';
  document.getElementById('stat-height').textContent = "40'";
  document.getElementById('stat-completion').textContent = '2024';
  
  // Update property tags
  const tagsContainer = document.getElementById('property-tags');
  tagsContainer.innerHTML = `
    <span class="bg-green-100 text-green-800 px-2 py-1 text-xs">Available Now</span>
    <span class="bg-blue-100 text-blue-800 px-2 py-1 text-xs">Cross-Dock</span>
    <span class="bg-gray-100 text-gray-800 px-2 py-1 text-xs">ESFR Sprinkler</span>
  `;
  
  // Update hero image
  const heroImage = document.getElementById('hero-image');
  if (data.images.renderImage) {
    heroImage.style.backgroundImage = `url(${data.images.renderImage.url})`;
    heroImage.style.backgroundSize = 'cover';
    heroImage.style.backgroundPosition = 'center';
  }
  
  // Update building details
  document.getElementById('building-details').innerHTML = `
    <div class="flex justify-between">
      <span class="text-neutral-600">Total Building Area:</span>
      <span>1,013,902 sq ft</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Available Area:</span>
      <span>1,013,902 sq ft</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Office Area:</span>
      <span>TBD</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Clear Height:</span>
      <span>40 feet</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Column Spacing:</span>
      <span>50' x 56' with 60' speed bay</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Floor Load Capacity:</span>
      <span>125 psf</span>
    </div>
  `;
  
  // Update loading details
  document.getElementById('loading-details').innerHTML = `
    <div class="flex justify-between">
      <span class="text-neutral-600">Dock Doors:</span>
      <span>140 total</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Grade Doors:</span>
      <span>4 drive-in doors</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Truck Court Depth:</span>
      <span>190 feet</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Trailer Parking:</span>
      <span>231 spaces (422 alternate)</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Car Parking:</span>
      <span>603 spaces</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Configuration:</span>
      <span>Cross-Dock</span>
    </div>
  `;
  
  // Update utilities
  document.getElementById('utilities-details').innerHTML = `
    <div class="flex justify-between">
      <span class="text-neutral-600">Electrical Service:</span>
      <span>4000A, 480V 3-phase</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Lighting:</span>
      <span>LED with motion sensors</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">HVAC:</span>
      <span>Unit heaters</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Fire Protection:</span>
      <span>ESFR K-25.2 sprinklers</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Internet:</span>
      <span>Fiber ready</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Roof:</span>
      <span>60mil TPO R-25 insulation</span>
    </div>
  `;
  
  // Update certifications
  document.getElementById('certifications-details').innerHTML = `
    <div class="flex justify-between">
      <span class="text-neutral-600">Building Type:</span>
      <span>Modern Industrial</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Slab:</span>
      <span>8" reinforced, 4000 psi</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Dimensions:</span>
      <span>1,624' x 620'</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Status:</span>
      <span class="text-green-600 font-medium">Built & Available</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Year Built:</span>
      <span>2024</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-600">Park:</span>
      <span>Social Circle</span>
    </div>
  `;
  
  // Update map property name
  document.getElementById('map-property-name').textContent = 'PNK Loggins Park 100';
  
  // Update address details
  document.getElementById('address-details').innerHTML = `
    <p class="text-neutral-700 text-sm mb-2">1365 E Hightower Trail</p>
    <p class="text-neutral-700 text-sm mb-2">Social Circle, GA</p>
    <p class="text-neutral-700 text-sm">30025</p>
  `;
  
  // Update travel times
  document.getElementById('travel-times').innerHTML = `
    <div class="flex justify-between">
      <span class="text-neutral-700">Covington:</span>
      <span class="text-neutral-600">9 miles (15 min)</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-700">Monroe:</span>
      <span class="text-neutral-600">10 miles (15 min)</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-700">Conyers:</span>
      <span class="text-neutral-600">17 miles (25 min)</span>
    </div>
    <div class="flex justify-between">
      <span class="text-neutral-700">Atlanta:</span>
      <span class="text-neutral-600">45 miles (50 min)</span>
    </div>
  `;
  
  // Update gallery
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid && data.images.media) {
    galleryGrid.innerHTML = '';
    
    // Add images
    const mediaItems = [
      { type: 'image', url: data.images.planImage.url, title: 'Site Plan' },
      { type: 'image', url: data.images.renderImage.url, title: 'Render View' },
      { type: 'image', url: data.images.areaImage.url, title: 'Area View' },
      { type: 'video', url: 'https://drive.google.com/file/d/1PMopuAtxn59EicMaUL0LzUenUAp8JpfC/view', title: 'Video Tour' }
    ];
    
    mediaItems.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'relative group cursor-pointer';
      
      if (item.type === 'video') {
        galleryItem.innerHTML = `
          <div class="aspect-video bg-neutral-600 rounded-lg flex items-center justify-center text-white text-sm">
            <div class="text-center">
              <i class="fa-solid fa-play text-3xl mb-2"></i>
              <p class="text-xs">${item.title}</p>
            </div>
          </div>
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
            <i class="fa-solid fa-play text-white opacity-0 group-hover:opacity-100 text-2xl"></i>
          </div>
        `;
        galleryItem.onclick = () => window.open(item.url, '_blank');
      } else {
        galleryItem.innerHTML = `
          <div class="aspect-video bg-neutral-600 rounded-lg overflow-hidden">
            <img src="${item.url}" alt="${item.title}" class="w-full h-full object-cover">
          </div>
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg"></div>
        `;
      }
      
      if (index < 6) { // Show only first 6 items
        galleryGrid.appendChild(galleryItem);
      }
    });
  }
  
  // Update demographics info in a subtle way
  const demographicsHtml = `
    <div class="bg-neutral-50 rounded-lg p-4 mt-4">
      <h3 class="text-neutral-900 mb-3 flex items-center">
        <i class="fa-solid fa-users text-neutral-600 mr-2"></i>
        Regional Demographics
      </h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-neutral-700">45-Mile Population:</span>
          <span class="text-neutral-600">2.9M</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-700">45-Mile Workforce:</span>
          <span class="text-neutral-600">1.8M</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-700">Manufacturing:</span>
          <span class="text-neutral-600">28.5%</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-700">Trade & Transport:</span>
          <span class="text-neutral-600">34%</span>
        </div>
      </div>
    </div>
  `;
  
  // Add demographics after travel times
  const travelTimesParent = document.getElementById('travel-times').parentElement;
  if (travelTimesParent && !document.getElementById('demographics-info')) {
    const demoDiv = document.createElement('div');
    demoDiv.id = 'demographics-info';
    demoDiv.innerHTML = demographicsHtml;
    travelTimesParent.parentElement.appendChild(demoDiv);
  }
}

// Load data when page is ready
document.addEventListener('DOMContentLoaded', () => {
  populateLogginsData();
});