import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PlayCircle, Clock, Video, Users, ListVideo, Play, ArrowRight, Headphones, Grid3X3, ListMusic } from "lucide-react";

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sermonCount: number;
  videoCount?: number;
  audioCount?: number;
  seriesCount: number;
  totalViews: string;
  totalDuration: string;
  bgColor?: 'orange' | 'teal' | 'blue' | 'purple' | 'gold';
  context?: 'home' | 'video' | 'audio'; // Add context prop
  onClick?: () => void;
  onPlayAll?: () => void;
  onViewSeries?: () => void;
  onViewAllMultimedia?: () => void;
  onViewAllVideos?: () => void;
  onViewAllAudios?: () => void;
}

export function CategoryCard({
  id,
  title,
  description,
  thumbnail,
  sermonCount,
  videoCount = 0,
  audioCount = 0,
  seriesCount,
  totalViews,
  totalDuration,
  bgColor = 'blue',
  context = 'home',
  onClick,
  onPlayAll,
  onViewSeries,
  onViewAllMultimedia,
  onViewAllVideos,
  onViewAllAudios
}: CategoryCardProps) {
  const getGradientColor = () => {
    switch (bgColor) {
      case 'orange':
        return 'from-dclm-warm-orange to-accent';
      case 'teal':
        return 'from-dclm-light-blue to-cyan-400';
      case 'purple':
        return 'from-dclm-purple to-purple-500';
      case 'gold':
        return 'from-accent to-yellow-400';
      default:
        return 'from-primary to-dclm-light-blue';
    }
  };

  return (
    <div className="relative group w-full max-w-sm h-[400px]">
      {/* Stacked Card Shadows - Creating layered effect */}
      <div className="absolute inset-0 bg-gray-200 rounded-xl transform translate-x-2 translate-y-2 opacity-60"></div>
      <div className="absolute inset-0 bg-gray-300 rounded-xl transform translate-x-1 translate-y-1 opacity-80"></div>
      
      {/* Main Card */}
      <Card 
        className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:translate-x-[-2px] border-0 rounded-xl w-full h-full bg-white shadow-lg"
      >
        <CardContent className="p-0 h-full">
          {/* Image Container with Overlay Content - Full Height */}
          <div className="relative h-full overflow-hidden rounded-xl">
            <ImageWithFallback
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Series Count Badge - Top Left */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground border-none text-xs font-medium px-3 py-1 rounded-full">
                {context === 'audio' ? (
                  <ListMusic className="h-3 w-3 mr-1" />
                ) : (
                  <ListVideo className="h-3 w-3 mr-1" />
                )}
                {seriesCount} series
              </Badge>
            </div>
            
            {/* Media Count Badge - Top Right */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-black/70 text-white border-none text-xs font-medium px-2 py-1.5 backdrop-blur-sm rounded-md flex items-center gap-1">
                {context === 'home' ? (
                  <span>{videoCount + audioCount} Ministrations</span>
                ) : context === 'video' ? (
                  <>
                    <Video className="h-3 w-3" />
                    <span>{videoCount} Ministrations</span>
                  </>
                ) : (
                  <>
                    <Headphones className="h-3 w-3" />
                    <span>{audioCount} Ministrations</span>
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
              {/* Category Title */}
              <h3 className="text-xl font-black uppercase tracking-wide mb-2 leading-tight">
                {title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-white/90 mb-4 line-clamp-2 leading-relaxed">
                {description}
              </p>
              
              {/* View All Buttons Row */}
              <div className="flex items-center gap-2 mb-3">
                {/* Primary Button - Changes based on context */}
                <Button
                  className={`flex-1 bg-gradient-to-r ${getGradientColor()} text-white hover:shadow-xl rounded-lg py-2 text-xs font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-1`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (context === 'home') {
                      onViewAllMultimedia?.();
                    } else if (context === 'video') {
                      onViewAllVideos?.();
                    } else if (context === 'audio') {
                      onViewAllAudios?.();
                    }
                  }}
                >
                  {context === 'home' && (
                    <>
                      <Grid3X3 className="h-3 w-3" />
                      View all multimedia
                    </>
                  )}
                  {context === 'video' && (
                    <>
                      <Video className="h-3 w-3" />
                      View all videos
                    </>
                  )}
                  {context === 'audio' && (
                    <>
                      <Headphones className="h-3 w-3" />
                      View all audios
                    </>
                  )}
                </Button>
                
                {/* Series Button - Always shows with icon */}
                <Button
                  className="flex-1 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSeries?.();
                  }}
                >
                  {context === 'audio' ? (
                    <ListMusic className="h-3 w-3" />
                  ) : (
                    <ListVideo className="h-3 w-3" />
                  )}
                  View all series
                </Button>
              </div>             
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}