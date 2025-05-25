
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NewsItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>();

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [newsItems, searchTerm, dateFilter]);

  const fetchNews = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    let filtered = newsItems;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (dateFilter) {
      const filterDate = format(dateFilter, 'yyyy-MM-dd');
      filtered = filtered.filter(item => {
        const itemDate = format(new Date(item.pubDate), 'yyyy-MM-dd');
        return itemDate === filterDate;
      });
    }

    setFilteredItems(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter(undefined);
  };

  // Create ticker segments with clickable headlines
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEF7CD] pt-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E63946]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF7CD] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Afrobeats News</h1>
          <p className="text-lg text-gray-700 mb-6">
            Stay updated with the latest Afrobeats news, music releases, and events
          </p>
          <Button
            onClick={() => window.open('https://t.me/afrobeats_party', '_blank')}
            className="bg-[#E63946] hover:bg-[#E63946]/90 text-white"
          >
            Subscribe to Updates
          </Button>
        </div>

        {/* Scrolling News Ticker - Full Width */}
        {newsItems.length > 0 && (
          <div className="mb-8 relative">
            {/* Break out of container to full width */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-screen">
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
            </div>
            
            {/* Spacer to maintain layout */}
            <div className="h-16"></div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[240px] justify-start text-left font-normal",
                    !dateFilter && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full md:w-auto"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card key={item.guid || index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-black line-clamp-2">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {format(new Date(item.pubDate), 'MMM dd, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.categories.slice(0, 3).map((category, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#FFD600] text-black text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(item.link, '_blank')}
                  className="w-full"
                >
                  Read More
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news items found matching your criteria.</p>
          </div>
        )}
      </div>

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

export default News;
