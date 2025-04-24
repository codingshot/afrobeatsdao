
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Filter, Play, ListMusic, MoveVertical } from 'lucide-react';
import { Song } from './GlobalAudioPlayer';

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

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 bottom-[80px] w-[350px] z-40">
      <Card className="border bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-black">Up Next</h3>
              <Badge variant="outline">
                {filteredQueue.length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPlayedSongs(!showPlayedSongs)}
                className={`${showPlayedSongs ? 'bg-primary/10' : ''} text-black`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showPlayedSongs ? 'Show All' : 'Hide Played'}
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            {filteredQueue.length > 0 ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="queue">
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
                            key={`${song.id}-${index}`} 
                            draggableId={`${song.id}-${index}`} 
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
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDrawer;
