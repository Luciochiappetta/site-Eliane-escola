import React, { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    { id: 'EXvvnmJ-HTk', title: 'Apresentação da Banda EMEC no Desfile Cívico' },
    { id: '8ioWmDWbPOY', title: 'Apresentação de Gala - Fanfarra EMEC' },
    { id: 'WLYj6NI2-F4', title: 'Competição Regional de Bandas e Fanfarras' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-900 text-white py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <img src="/images/logo-escola.jpg" alt="Logo Escola" className="w-24 h-24 rounded-full border-4 border-white" />
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Escola Municipal Eliane Carneiro</h1>
            <p className="text-lg">Comprometida com uma Educação de Qualidade e Inclusiva</p>
          </div>
          <img src="/images/logo-banda.jpg" alt="Logo Banda" className="w-24 h-24 rounded-full border-4 border-white" />
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">Galeria de Fotos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 21].map((num) => (
            <div 
              key={num} 
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(`/images/imagem-${num}.jpeg`)}
            >
              <img 
                src={`/images/imagem-${num}.jpeg`} 
                alt={`Evento ${num}`}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">Vídeos da Banda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-sm">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain"
          />
          <button 
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Video Lightbox */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button 
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={() => setSelectedVideo(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default App;