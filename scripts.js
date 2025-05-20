// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the image gallery lightbox
  initLightbox();
  
  // Initialize the video players
  initVideos();
});

// Lightbox functionality for the gallery
function initLightbox() {
  // Get all gallery images
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  const imagesArray = Array.from(galleryImages);
  
  // Add click event to each gallery image
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      // Set the clicked image in the lightbox
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      currentImageIndex = index;
      
      // Show the lightbox with animation
      lightbox.classList.add('active');
      
      // Disable scrolling on the body when lightbox is open
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox when clicking the close button
  closeBtn.addEventListener('click', closeLightbox);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigate to previous image
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    updateLightboxImage();
  });
  
  // Navigate to next image
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    updateLightboxImage();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
      updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      updateLightboxImage();
    }
  });
  
  // Function to update the lightbox image
  function updateLightboxImage() {
    const img = imagesArray[currentImageIndex];
    
    // Create a temporary image to preload
    const tempImg = new Image();
    tempImg.src = img.src;
    
    // Once preloaded, update the lightbox image
    tempImg.onload = function() {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    };
  }
  
  // Function to close the lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Video player functionality
function initVideos() {
  // Check if YouTube API script is already loaded
  if (!window.YT) {
    // Create YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Set up callback for when YouTube API is ready
    window.onYouTubeIframeAPIReady = initializeVideoPlayers;
  } else {
    // If API is already loaded, initialize players directly
    initializeVideoPlayers();
  }
}

// Initialize YouTube players
function initializeVideoPlayers() {
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');
  const players = {};
  
  videoThumbnails.forEach((thumbnail) => {
    const videoId = thumbnail.getAttribute('data-video-id');
    const playerContainerId = `player-${videoId}`;
    const playerContainer = document.getElementById(playerContainerId);
    
    // Create player instance but don't play yet
    players[videoId] = new YT.Player(playerContainerId, {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1
      }
    });
    
    // Add click event to play the video when thumbnail is clicked
    thumbnail.addEventListener('click', () => {
      // Hide thumbnail and show iframe
      thumbnail.style.display = 'none';
      playerContainer.classList.add('active');
      playerContainer.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
      
      // Play the video
      players[videoId].playVideo();
    });
  });
}

// Add touch swipe support for gallery
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.lightbox').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.lightbox').addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left, go to next image
    document.querySelector('.lightbox-next').click();
  }
  
  if (touchEndX > touchStartX + 50) {
    // Swipe right, go to previous image
    document.querySelector('.lightbox-prev').click();
  }
}

// Preload gallery images for smoother experience
function preloadGalleryImages() {
  const galleryImages = document.querySelectorAll('.gallery-img');
  
  galleryImages.forEach((img) => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
}

// Call preload function
preloadGalleryImages();