import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Play, ListMusic, MoveVertical, Download } from 'lucide-react';
import { Song } from './GlobalAudioPlayer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import MarkdownPreviewDialog from "./MarkdownPreviewDialog";
import { Minimize } from 'lucide-react';

interface QueueDrawerProps {
  queue: Song[];
  isVisible: boolean;
  playNow: (song: Song) => void;
  reorderQueue: (from: number, to: number) => void;
  playedSongs: Set<string>;
  showPlayedSongs: boolean;
  setShowPlayedSongs: (show: boolean) => void;
}

type TabType = "queue" | "history";

const QueueDrawer = ({
  queue,
  isVisible,
  playNow,
  reorderQueue,
  playedSongs,
  showPlayedSongs,
  setShowPlayedSongs
}: QueueDrawerProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("queue");
  const [markdownDialogOpen, setMarkdownDialogOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const { toast } = useToast();
  
  const getVideoThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  };

  const getVideoIdFromUrl = (url: string): string => {
    if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    return url;
  };

  const filteredQueue = queue.filter(song => 
    !showPlayedSongs || !playedSongs.has(song.id)
  );

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderQueue(result.source.index, result.destination.index);
  };

  const generateMarkdownContent = (tab: TabType) => {
    let content = "# Afrobeats Music History\n\n";
    
    if (tab === "queue") {
      content += "## Current Queue\n\n";
      if (filteredQueue.length === 0) {
        content += "*Queue is empty*\n\n";
      } else {
        filteredQueue.forEach((song, index) => {
          const videoId = getVideoIdFromUrl(song.youtube);
          content += `${index + 1}. **${song.title || "Title of video"}** - ${song.artist || "Unknown Artist"}\n`;
          content += `   - [Watch Video](https://www.youtube.com/watch?v=${videoId})\n\n`;
        });
      }
    } else {
      content += "## Play History\n\n";
      if (playedSongsList.length === 0) {
        content += "*No play history*\n\n";
      } else {
        playedSongsList.forEach((song, index) => {
          const videoId = getVideoIdFromUrl(song.youtube);
          content += `${index + 1}. **${song.title || "Title of video"}** - ${song.artist || "Unknown Artist"}\n`;
          content += `   - [Watch Video](https://www.youtube.com/watch?v=${videoId})\n\n`;
        });
      }
    }
    
    content += "---\n";
    content += `Exported on ${new Date().toLocaleString()}\n`;
    return content;
  };

  const handleExportClick = () => {
    const content = generateMarkdownContent(activeTab);
    setMarkdownContent(content);
    setMarkdownDialogOpen(true);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab === "queue" ? "afrobeats-queue.md" : "afrobeats-history.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: activeTab === "queue" ? "Queue exported as markdown file" : "Play history exported as markdown file"
    });
    setMarkdownDialogOpen(false);
  };

  if (!isVisible) return null;

  const playedSongsList: Song[] = Array.from(playedSongs).map(id => {
    const song = queue.find(s => s.id === id);
    if (song) return song;
    return { id, youtube: id.replace('vibe-', ''), title: 'Title of video', artist: '' };
  }).filter(Boolean) as Song[];

  return (
    <div className={`fixed right-4 ${isMinimized ? 'h-[50px]' : 'bottom-[80px]'} w-[350px] z-40`}>
      <Card className="border bg-white shadow-lg">
        <CardContent className={`p-4 ${isMinimized ? 'p-2' : ''}`}>
          {isMinimized ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Queue ({filteredQueue.length})</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Minimize className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid grid-cols-2 w-[200px]">
                  <TabsTrigger value="queue">Queue</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Minimize className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="h-[500px] pr-4">
                {filteredQueue.length > 0 ? (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="queue-drawer-droppable">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-3"
                        >
                          {filteredQueue.map((song, index) => {
                            const videoId = getVideoIdFromUrl(song.youtube);
                            return (
                              <Draggable 
                                key={`queue-item-${song.id}`} 
                                draggableId={`queue-item-${song.id}`} 
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 group"
                                  >
                                    <div 
                                      {...provided.dragHandleProps}
                                      className="text-gray-400 hover:text-gray-600 cursor-grab"
                                    >
                                      <MoveVertical className="h-4 w-4" />
                                    </div>
                                    
                                    <div className="relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden">
                                      <img 
                                        src={getVideoThumbnail(videoId)}
                                        alt={song.title || "Video thumbnail"}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.src = "/AfrobeatsDAOMeta.png";
                                        }}
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/70 text-white"
                                        onClick={() => playNow(song)}
                                      >
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm truncate text-black">
                                        {song.title || "Unknown Title"}
                                      </h4>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {song.artist || "Unknown Artist"}
                                      </p>
                                    </div>
                                    
                                    {playedSongs.has(song.id) && (
                                      <Badge variant="outline" className="ml-auto">
                                        Played
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ListMusic className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Your queue is empty</p>
                    <p className="text-sm mt-2">Add songs from playlists</p>
                  </div>
                )}
              </ScrollArea>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDrawer;
