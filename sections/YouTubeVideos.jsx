"use client";

import React, { useState } from "react";
import Link from "next/link";

const YouTubeVideos = () => {
  const videos = [
    {
      id: 1,
      title: "4 Mukhi Rudraksha: Why, When & How to Wear It for Maximum Benefits",
      videoId: "so22woUttFU",
      description: "Discover the spiritual and astrological significance of the 4 Mukhi Rudraksha. Learn why it is worn, the right time to wear it, and the proper method of wearing it according to ancient scriptures. .",
      duration: "5:38"
    },
    {
      id: 2,
      title: "Astrological Star Calculations",
      videoId: "fKjHM0Bo6og",
      description: "By calculating the stars, know whether a person, place, and time are auspicious or inauspicious - complete detailed information by Acharya Anoop Tripathi.",
      duration: "8:40"
    },
    {
      id: 3,
      title: "Shrimad Bhagwat Katha - Day 03 (Rewa, M.P.)",
      videoId: "0Mcgx-oSpM4",
      description: "Experience the divine Day 3 of Shrimad Bhagwat Katha from Shaanti Vihar Colony, Padra (Rewa, M.P.), delivered by Acharya Anup Shastri Ji Maharaj. Discover the spiritual teachings of Lord Krishna, devotion, and dharma through this soulful narration.",
      duration: "3:41:29"
    },
    {
      id: 4,
      title: "Essential Vastu Shastra Principles for a Balanced and Prosperous Home",
      videoId: "jqY_B8O_aW8",
      description: "Learn key Vastu Shastra guidelines for creating a harmonious, prosperous home — detailed insights by Acharya Anoop Tripathi.",
      duration: "2:30"
    },
    {
      id: 5,
      title: "Rashiyon Ki Disha – Know the Auspicious Directions for Each Zodiac Sign",
      videoId: "ciqwLzc1Hsg",
      description: "Understand which direction is favorable for each zodiac sign and how it influences marriage, career, and success — explained by Acharya Anoop Tripathi.",
      duration: "9:45"
    },
    {
      id: 6,
      title: "Places of Zodiac Signs | Rashiyon ke Sthaan - Kaun si Rashi Kahan Rahti Hai?",
      videoId: "ixMKP3leReo",
      description: "Discover where each zodiac sign resides according to astrology — learn the location of each Rashi and assess what's auspicious or inauspicious for you with guidance from Astrologer Anup.",
      duration: "10:32"
    },
    {
      id: 7,
      title: "Astrological Insights: Which Body Part is Linked to Each Zodiac Sign",
      videoId: "6jl3ooOyCQI",
      description: "According to astrology, every zodiac sign governs specific parts of the body. Learn how planetary influences can indicate potential health issues — explained by Acharya Anoop Tripathi.",
      duration: "9:24"
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <section className="pt-8 pb-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="textGradient">Vedic Wisdom Videos</span>
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
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>

              {/* Video Info */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-600 font-medium">
                    Duration: {selectedVideo.duration}
                  </span>
                  <Link
                    href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
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
                {videos.map((video) => (
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
                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
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
