"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/youtube/latest", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load videos");
        const data = await res.json();
        if (mounted) {
          const vids = Array.isArray(data.videos) ? data.videos : [];
          setVideos(vids);
          setSelectedVideo(vids[0] || null);
        }
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="pt-8 pb-16 px-5 sm:px-10 lg:px-44">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="textGradient">Vedic Wisdom </span>
            <span className="text-black">Videos</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Watch our expert Acharya Anoop tripathi share valuable insights and practical guidance
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
              {/* Video Embed */}
              <div className="relative bg-gray-900 h-48 sm:h-56 md:h-64 lg:h-96">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center text-white/80">Loading videos…</div>
                ) : selectedVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80">No videos found</div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4 md:p-6">
                {selectedVideo && (
                  <>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                      {selectedVideo.description}
                    </p>
                  </>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-600 font-medium">
                    {selectedVideo?.duration ? `Duration: ${selectedVideo.duration}` : ''}
                  </span>
                  <Link
                    href={selectedVideo ? `https://www.youtube.com/watch?v=${selectedVideo.videoId}` : `https://www.youtube.com/@vedvarta`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                  >
                    <i className="fab fa-youtube"></i>
                    Watch on YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white/50 rounded-xl p-4 md:p-6 border border-amber-200 h-80 sm:h-96 md:h-[28rem] lg:h-[596px] flex flex-col">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                More Videos
              </h4>
              <div className="space-y-2 md:space-y-3 overflow-y-auto flex-grow">
                {!loading && videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`p-2 md:p-3 rounded-lg cursor-pointer transition-all duration-300 border ${selectedVideo.id === video.id
                      ? 'bg-amber-50 border-amber-300 shadow-md'
                      : 'bg-white border-gray-200 hover:bg-amber-50 hover:border-amber-200'
                      }`}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video mb-1 md:mb-2 bg-gray-200 rounded overflow-hidden">
                      <img
                        src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration || ''}
                      </div>
                    </div>

                    {/* Video Info */}
                    <h5 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                      {video.title}
                    </h5>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                ))}
                {loading && (
                  <div className="text-sm text-gray-600">Loading latest uploads…</div>
                )}
                {error && !loading && videos.length === 0 && (
                  <div className="text-sm text-red-600">{error}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className="text-center mt-8 lg:mt-12 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 lg:p-8 border border-amber-200">
          <h3 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">
            <span className="textGradient">Subscribe for More Wisdom</span>
          </h3>
          <p className="text-gray-700 text-sm lg:text-base mb-4 lg:mb-6 max-w-2xl mx-auto">
            Join our YouTube channel for regular updates on Vedic astrology, spiritual guidance,
            and transformative practices to enhance your life journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <Link
              href="https://www.youtube.com/@vedvarta" // Replace with actual YouTube channel
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base"
            >
              <i className="fab fa-youtube text-lg lg:text-xl"></i>
              Subscribe to Channel
            </Link>
            <Link
              href="https://wa.me/+919090252584"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base"
            >
              <i className="fab fa-whatsapp text-lg lg:text-xl"></i>
              Get Personal Guidance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideos;
