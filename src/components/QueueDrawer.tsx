import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Filter, Play, ListMusic, MoveVertical, Download } from 'lucide-react';
import { Song } from './GlobalAudioPlayer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import MarkdownPreviewDialog from "./MarkdownPreviewDialog";

interface QueueDrawerProps {
  queue: Song[];
  isVisible: boolean;
  playNow: (song: Song) => void;
  reorderQueue: (from: number, to: number) => void;
  playedSongs: Set<string>;
  showPlayedSongs: boolean;
  setShowPlayedSongs: (show: boolean) => void;
}

const QueueDrawer = ({
  queue,
  isVisible,
  playNow,
  reorderQueue,
  playedSongs,
  showPlayedSongs,
  setShowPlayedSongs
}: QueueDrawerProps) => {
  const [activeTab, setActiveTab] = useState<string>("queue");
  const [markdownDialogOpen, setMarkdownDialogOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
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

  const generateMarkdownContent = (tab: "queue" | "history") => {
    let content = "# Afrobeats Music History\n\n";
    
    if (tab === "queue") {
      content += "## Current Queue\n\n";
      if (filteredQueue.length === 0) {
        content += "*Queue is empty*\n\n";
      } else {
        filteredQueue.forEach((song, index) => {
          content += `${index + 1}. **${song.title || "Unknown Title"}** - ${song.artist || "Unknown Artist"}\n`;
          content += `   - Video ID: ${getVideoIdFromUrl(song.youtube)}\n`;
          content += `   - URL: https://www.youtube.com/watch?v=${getVideoIdFromUrl(song.youtube)}\n\n`;
        });
      }
    } else {
      content += "## Play History\n\n";
      if (playedSongsList.length === 0) {
        content += "*No play history*\n\n";
      } else {
        playedSongsList.forEach((song, index) => {
          content += `${index + 1}. **${song.title || "Unknown Title"}** - ${song.artist || "Unknown Artist"}\n`;
          content += `   - Video ID: ${getVideoIdFromUrl(song.youtube)}\n`;
          content += `   - URL: https://www.youtube.com/watch?v=${getVideoIdFromUrl(song.youtube)}\n\n`;
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
    return { id, youtube: id.replace('vibe-', ''), title: 'Previously played song', artist: '' };
  }).filter(Boolean) as Song[];

  return (
    <div className="fixed right-4 bottom-[80px] w-[350px] z-40">
      <Card className="border bg-white shadow-lg">
        <CardContent className="p-4">
          <Tabs defaultValue="queue" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid grid-cols-2 w-[200px]">
                <TabsTrigger value="queue">Queue</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              {activeTab === "queue" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPlayedSongs(!showPlayedSongs)}
                  className={`${showPlayedSongs ? 'bg-primary/10' : ''} text-black`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showPlayedSongs ? 'Show All' : 'Hide Played'}
                </Button>
              )}
            </div>

            <TabsContent value="queue" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                {filteredQueue.length > 0 ? (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable-queue-drawer">
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
                                key={`queue-drawer-${song.id}-${index}`} 
                                draggableId={`queue-drawer-${song.id}-${index}`} 
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
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                {playedSongsList.length > 0 ? (
                  <div className="space-y-3">
                    {playedSongsList.map((song, index) => {
                      const videoId = getVideoIdFromUrl(song.youtube);
                      return (
                        <div 
                          key={`history-${song.id}-${index}`}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 group"
                        >
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
                          
                          <Badge variant="outline" className="ml-auto">
                            Played
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ListMusic className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No play history yet</p>
                    <p className="text-sm mt-2">Play some songs to see history</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
          
          <Button 
            variant="outline" 
            className="w-full mt-4 flex items-center gap-2 bg-white text-black"
            onClick={handleExportClick}
            disabled={activeTab === "queue" ? filteredQueue.length === 0 : playedSongsList.length === 0}
          >
            <Download className="h-4 w-4" />
            Export {activeTab === "queue" ? "Queue" : "History"} as Markdown
          </Button>

          <MarkdownPreviewDialog 
            open={markdownDialogOpen}
            onOpenChange={setMarkdownDialogOpen}
            markdownContent={markdownContent}
            handleDownload={handleDownload}
            title={`Export ${activeTab === "queue" ? "Queue" : "History"}`}
          />

        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDrawer;
