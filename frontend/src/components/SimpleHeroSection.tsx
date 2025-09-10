import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Video, Headphones, Users, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

interface SimpleHeroSectionProps {
  title: string;
  subtitle: string;
  onVideoClick: () => void;
  onAudioClick: () => void;
}

export function SimpleHeroSection({
  title,
  subtitle,
  onVideoClick,
  onAudioClick,
}: SimpleHeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-gradient-to-r from-[#003A7C] to-[#87CEFA]">
      <div className="h-[40vh] md:h-[50vh] max-h-[400px] min-h-[250px] md:min-h-[300px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl text-white text-center mx-auto">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4">
                {title}
              </h1>
              <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-100 max-w-2xl mx-auto">
                {subtitle}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-6 md:mb-8">
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/20 rounded-full px-2 md:px-4 py-1 md:py-2 backdrop-blur-sm">
                  <Video className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm font-medium">50+ Videos</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/20 rounded-full px-2 md:px-4 py-1 md:py-2 backdrop-blur-sm">
                  <Headphones className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm font-medium">50+ Audios</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/20 rounded-full px-2 md:px-4 py-1 md:py-2 backdrop-blur-sm">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm font-medium">1000+ Hours</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-white/20 rounded-full px-2 md:px-4 py-1 md:py-2 backdrop-blur-sm">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm font-medium">1992-2016</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button 
                  size="default"
                  className="bg-[#FFC107] text-[#003A7C] hover:bg-[#E68800] font-semibold px-6 md:px-8 py-2 md:py-3 w-full sm:w-auto"
                  onClick={onVideoClick}
                >
                  <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Watch Videos
                </Button>
                <Button 
                  size="default"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-6 md:px-8 py-2 md:py-3 w-full sm:w-auto"
                  onClick={onAudioClick}
                >
                  <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Listen to Audios
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}