
import React, { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const NewsTicker = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('https://afrobeats-rss.up.railway.app/rss.xml');
      const xmlText = await response.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      
      const parsedItems: NewsItem[] = Array.from(items).map(item => ({
        title: item.querySelector('title')?.textContent?.replace(/^\[CDATA\[|\]\]$/g, '') || '',
        link: item.querySelector('link')?.textContent || '',
        guid: item.querySelector('guid')?.textContent || '',
        pubDate: item.querySelector('pubDate')?.textContent || '',
        description: item.querySelector('description')?.textContent?.replace(/^\[CDATA\[|\]\]$/g, '') || '',
        categories: Array.from(item.querySelectorAll('category')).map(cat => cat.textContent || '')
      }));
      
      setNewsItems(parsedItems);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const createTickerSegments = () => {
    return newsItems.map((item, index) => (
      <span key={index}>
        <button 
          onClick={() => window.open(item.link, '_blank')}
          className="hover:underline cursor-pointer bg-transparent border-none text-black font-semibold"
        >
          {item.title}
        </button>
        {index < newsItems.length - 1 && ' 🪘 '}
      </span>
    ));
  };

  if (newsItems.length === 0) {
    return null;
  }

  return (
    <div className="relative w-screen">
      {/* Top stroke */}
      <div className="w-full h-0.5 bg-black"></div>
      
      {/* Ticker container */}
      <div className="bg-[#FFD600] py-3 overflow-hidden relative">
        <div 
          className="whitespace-nowrap text-black font-semibold flex"
          style={{
            animation: 'scroll 60s linear infinite'
          }}
        >
          {/* Repeat segments for seamless loop */}
          <div className="flex">
            {createTickerSegments()}
            {newsItems.length > 0 && ' 🪘 '}
          </div>
          <div className="flex">
            {createTickerSegments()}
            {newsItems.length > 0 && ' 🪘 '}
          </div>
          <div className="flex">
            {createTickerSegments()}
            {newsItems.length > 0 && ' 🪘 '}
          </div>
        </div>
      </div>
      
      {/* Bottom stroke */}
      <div className="w-full h-0.5 bg-black"></div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
