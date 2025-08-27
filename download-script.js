// Photo Download Helper Script
// Note: This script requires manual execution due to Google Drive access restrictions

const photos = [
    'photo-1.jpg',
    'photo-2.jpg', 
    'photo-3.jpg',
    'photo-4.jpg',
    'photo-5.jpg',
    'photo-6.jpg',
    'photo-7.jpg',
    'photo-8.jpg',
    'photo-9.jpg',
    'photo-10.jpg'
];

console.log('To download photos from Google Drive:');
console.log('1. Go to: https://drive.google.com/drive/u/0/folders/1lWrHyzOMWaeseZOg_O3-FYtjZmRV3x8k');
console.log('2. Select photos and download them');
console.log('3. Rename them to:');
photos.forEach((photo, index) => {
    console.log(`   ${index + 1}. ${photo}`);
});
console.log('4. Place them in the images/gallery/ folder');
console.log('5. Restart your server to see the photos');

// Function to check if photos exist (for browser console)
function checkPhotos() {
    const gallery = document.querySelector('#media-gallery .grid');
    const images = gallery.querySelectorAll('img');
    
    images.forEach((img, index) => {
        img.onload = () => console.log(`✅ Photo ${index + 1} loaded successfully`);
        img.onerror = () => console.log(`❌ Photo ${index + 1} not found - using placeholder`);
    });
}

// Export for use
if (typeof module !== 'undefined') {
    module.exports = { photos, checkPhotos };
}