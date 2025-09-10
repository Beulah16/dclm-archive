import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  PlayCircle,
  Video,
  Plus,
  Play,
  ListPlus,
  Download,
  Headphones,
} from "lucide-react";

interface SeriesCardProps {
  type: "series";
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  episodeCount: number;
  videoCount?: number;
  audioCount?: number;
  totalDuration: string;
  startDate: string;
  category: string;
  speakers: string[];
  context?: 'home' | 'video' | 'audio';
  onClick?: () => void;
  onPlayAll?: () => void;
  onAddToPlaylist?: () => void;
  onDownloadAll?: () => void;
}

export function SeriesCard({
  id,
  title,
  description,
  thumbnail,
  episodeCount,
  videoCount = 0,
  audioCount = 0,
  totalDuration,
  startDate,
  category,
  speakers,
  context = 'home',
  onClick,
  onPlayAll,
  onAddToPlaylist,
  onDownloadAll,
}: SeriesCardProps) {
  return (
    <Card
      className="group overflow-hidden bg-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 rounded-2xl w-full max-w-md h-[400px]"
    >
      <CardContent className="p-0 h-full">
        {/* Image Container with Overlay Content - Full Height */}
        <div className="relative h-full overflow-hidden rounded-2xl">
          <ImageWithFallback
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Category Badge - Top Left */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground border-none text-xs font-medium px-3 py-1 rounded-full">
              {category}
            </Badge>
          </div>

          {/* Media Count Badge - Top Right */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-black/70 text-white border-none text-xs font-medium px-2 py-1.5 backdrop-blur-sm rounded-md flex items-center gap-1">
              {context === 'home' ? (
                <span>{episodeCount} Episodes</span>
              ) : context === 'video' ? (
                <>
                  <Video className="h-3 w-3" />
                  <span>{videoCount} Episodes</span>
                </>
              ) : (
                <>
                  <Headphones className="h-3 w-3" />
                  <span>{audioCount} Episodes</span>
                </>
              )}
            </Badge>
          </div>

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Hover Play All Button */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onPlayAll?.();
              }}
            >
              <Play className="h-4 w-4 mr-2" />
              Play all
            </Button>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {/* Series Title */}
            <h3 className="text-xl font-bold mb-3 leading-tight">
              {title}
            </h3>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-1 mb-3">
              <Button
                size="sm"
                className="flex-1 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-lg py-1.5 text-xs font-medium transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToPlaylist?.();
                }}
              >
                <ListPlus className="h-3 w-3 mr-1" />
                Playlist
              </Button>

              <Button
                size="sm"
                className="flex-1 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-lg py-1.5 text-xs font-medium transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadAll?.();
                }}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>

            {/* CTA Button */}
            <Button
              className="w-full bg-gradient-to-r from-accent to-dclm-warm-orange text-black hover:from-dclm-warm-orange hover:to-accent rounded-xl py-2.5 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              Explore
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}