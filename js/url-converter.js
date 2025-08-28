// Convert signed Google Cloud Storage URLs to public URLs
function convertToPublicUrl(signedUrl) {
  if (!signedUrl) return '';
  
  // Extract the path from the signed URL
  const match = signedUrl.match(/storage\.googleapis\.com\/([^?]+)/);
  if (match) {
    // Return the public URL format
    return `https://storage.googleapis.com/${match[1]}`;
  }
  
  // If it's already a public URL or different format, return as is
  return signedUrl;
}

// Example usage:
// const publicUrl = convertToPublicUrl(signedUrl);