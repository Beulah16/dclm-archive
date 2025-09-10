import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Clock, MapPin, Calendar, Heart, Eye, Download, Plus, Globe, Video, Headphones } from "lucide-react";
import { useState } from "react";

interface SermonCardProps {
  type: "sermon";
  id: string;
  title: string;
  speaker: string;
  speakerAvatar?: string;
  category: string;
  duration: string;
  date: string;
  location: string;
  language?: string;
  thumbnail: string;
  views?: string;
  isLiked?: boolean;
  series?: string;
  seriesSlug?: string;
  mediaType?: 'video' | 'audio'; // Add media type for home page
  onClick?: () => void;
  onToggleFavorite?: (id: string, isLiked: boolean) => void;
  onAddToPlaylist?: (id: string) => void;
  onDownload?: (id: string) => void;
}

interface SeriesCardProps {
  type: "series";
  id: string;
  title: string;
  description: string;
  category: string;
  episodeCount: number;
  totalDuration: string;
  startDate: string;
  thumbnail: string;
  speakers: string[];
  onClick?: () => void;
}

type MediaCardProps = SermonCardProps | SeriesCardProps;

export function MediaCard(props: MediaCardProps) {
  const [localIsLiked, setLocalIsLiked] = useState(props.type === "sermon" ? props.isLiked : false);

  // Format views count like YouTube (1.2K, 23K, 1.2M, etc.)
  const formatViewCount = (viewsString?: string): string => {
    if (!viewsString) return '';
    
    // Extract number from string (remove commas, spaces, etc.)
    const views = parseInt(viewsString.replace(/[^\d]/g, '')) || 0;
    
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1).replace('.0', '')}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1).replace('.0', '')}K`;
    }
    return views.toString();
  };

  // Series badge colors - consistent colors for each series
  const getSeriesColor = (seriesName: string) => {
    // Colors for full series names
    const fullNameColors: Record<string, string> = {
      "SEARCH THE SCRIPTURES": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "THE LORD'S SUPPER": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "WORSHIP SERVICE": "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
      "COVENANT SERVICE": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "YOUTH BIBLE STUDY": "bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400",
      "MONDAY BIBLE STUDY": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400",
      "CHURCH GROWTH CONFERENCE": "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
      "NATIONAL WOMEN CONFERENCE": "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
      "NATIONAL MINISTERS CONFERENCE": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
      "INTERNATIONAL WOMEN CONFERENCE": "bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400",
      "GREAT MIRACLE CRUSADE": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "GREAT REVIVAL CRUSADE": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "MINISTERS CONFERENCE": "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400",
      "LEADERSHIP PLANNING MEETING": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
      "TUESDAY LEADERSHIP MEETING": "bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400",
    };
    
    // Check full names first
    if (fullNameColors[seriesName]) {
      return fullNameColors[seriesName];
    }
    
    // Fallback for legacy slugs
    const seriesColors: Record<string, string> = {
      "faith-foundations": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "great-miracle-crusade": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "women-conference": "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
      "discipleship-journey": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "prayer-warriors": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "end-times": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "spiritual-warfare": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
      "family-restoration": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
      "financial-breakthrough": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "leadership-development": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400",
      "youth-revival": "bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400",
      "prophetic-insights": "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400",
      "healing-power": "bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400",
      "ministers-conference": "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
      "worship-encounter": "bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400",
    };
    return seriesColors[seriesName] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  // Series titles mapping - handle both full names and slugs
  const getSeriesTitle = (seriesName: string) => {
    // If it's already a full name, return abbreviated version for display
    const fullNameToDisplay: Record<string, string> = {
      "SEARCH THE SCRIPTURES": "Search the Scriptures",
      "THE LORD'S SUPPER": "Lord's Supper",
      "WORSHIP SERVICE": "Worship Service",
      "COVENANT SERVICE": "Covenant Service",
      "YOUTH BIBLE STUDY": "Youth Bible Study",
      "MONDAY BIBLE STUDY": "Monday Bible Study",
      "CHURCH GROWTH CONFERENCE": "Church Growth Conf.",
      "NATIONAL WOMEN CONFERENCE": "Women Conference",
      "NATIONAL MINISTERS CONFERENCE": "Ministers Conference",
      "INTERNATIONAL WOMEN CONFERENCE": "Int'l Women Conf.",
      "GREAT MIRACLE CRUSADE": "Miracle Crusade",
      "GREAT REVIVAL CRUSADE": "Revival Crusade",
      "MINISTERS CONFERENCE": "Ministers Conf.",
      "LEADERSHIP PLANNING MEETING": "Leadership Meeting",
      "TUESDAY LEADERSHIP MEETING": "Leadership Meeting",
    };
    
    // Check if it's a full series name first
    if (fullNameToDisplay[seriesName]) {
      return fullNameToDisplay[seriesName];
    }
    
    // Fallback for legacy slug-based series
    const slugToTitle: Record<string, string> = {
      "faith-foundations": "Faith Foundations",
      "great-miracle-crusade": "Miracle Crusade",
      "women-conference": "Women Conference",
      "discipleship-journey": "Discipleship",
      "prayer-warriors": "Prayer Warriors",
      "end-times": "End Times",
      "spiritual-warfare": "Spiritual Warfare",
      "family-restoration": "Family Restoration",
      "financial-breakthrough": "Financial Breakthrough", 
      "leadership-development": "Leadership",
      "youth-revival": "Youth Revival",
      "prophetic-insights": "Prophetic Insights",
      "healing-power": "Healing Power",
      "ministers-conference": "Ministers Conference",
      "worship-encounter": "Worship",
    };
    
    return slugToTitle[seriesName] || seriesName || "General";
  };

  // Language display formatting
  const formatLanguage = (language?: string) => {
    if (!language) return "English";
    
    const languageMap: Record<string, string> = {
      "ENG": "English",
      "ENG-YOR": "English/Yoruba",
      "ENG-ELEME": "English/Eleme",
      "ENG-IKWERRE": "English/Ikwerre", 
      "ENG-ITSEKIRI": "English/Itsekiri",
      "ENG-EDO": "English/Edo",
    };
    
    return languageMap[language] || language;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "SUNDAY SERVICE": "bg-[#003A7C]/10 text-[#003A7C] dark:bg-[#003A7C]/20 dark:text-[#87CEFA]",
      "BIBLE STUDY": "bg-[#87CEFA]/20 text-[#003A7C] dark:bg-[#87CEFA]/30 dark:text-white",
      "CONFERENCES": "bg-[#FFC107]/20 text-[#003A7C] dark:bg-[#FFC107]/30 dark:text-[#FFC107]",
      "CRUSADES": "bg-[#dc2626]/10 text-[#dc2626] dark:bg-[#dc2626]/20 dark:text-[#dc2626]",
      "LEADERS MEETING": "bg-[#6A0DAD]/10 text-[#6A0DAD] dark:bg-[#6A0DAD]/20 dark:text-[#6A0DAD]",
      // Legacy mappings for old format
      "Sunday Service": "bg-[#003A7C]/10 text-[#003A7C] dark:bg-[#003A7C]/20 dark:text-[#87CEFA]",
      "Bible Study": "bg-[#87CEFA]/20 text-[#003A7C] dark:bg-[#87CEFA]/30 dark:text-white",
      "Youth Service": "bg-[#6A0DAD]/10 text-[#6A0DAD] dark:bg-[#6A0DAD]/20 dark:text-[#6A0DAD]",
      "Prayer Meeting": "bg-[#E68800]/10 text-[#E68800] dark:bg-[#E68800]/20 dark:text-[#E68800]",
      "Conference": "bg-[#FFC107]/20 text-[#003A7C] dark:bg-[#FFC107]/30 dark:text-[#FFC107]",
      "Crusade": "bg-[#dc2626]/10 text-[#dc2626] dark:bg-[#dc2626]/20 dark:text-[#dc2626]",
      "Leaders Meeting": "bg-[#6A0DAD]/10 text-[#6A0DAD] dark:bg-[#6A0DAD]/20 dark:text-[#6A0DAD]",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.type === "sermon") {
      const newIsLiked = !localIsLiked;
      setLocalIsLiked(newIsLiked);
      props.onToggleFavorite?.(props.id, newIsLiked);
    }
  };

  const handleAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.type === "sermon") {
      props.onAddToPlaylist?.(props.id);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.type === "sermon") {
      props.onDownload?.(props.id);
    }
  };

  if (props.type === "sermon") {
    return (
      <Card 
        className="group hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer" 
        onClick={props.onClick}
      >
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <ImageWithFallback
              src={props.thumbnail}
              alt={props.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {/* Audio Waveform Overlay - Always visible for audio */}
            {props.mediaType === 'audio' && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#003A7C]/20 via-[#87CEFA]/20 to-[#003A7C]/20 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center opacity-70">
                  <div className="flex items-end space-x-1 h-8">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-[#003A7C] rounded-t-sm animate-waveform"
                        style={{
                          width: '2px',
                          height: `${Math.random() * 60 + 20}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: `${0.8 + Math.random() * 0.4}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Hover Play/Listen Button */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Button size="sm" className="rounded-full bg-[#FFC107] hover:bg-[#E68800] text-[#003A7C] border-0">
                {props.mediaType === 'audio' ? (
                  <>
                    <Headphones className="h-4 w-4 mr-1" />
                    Listen
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-1" />
                    Watch
                  </>
                )}
              </Button>
            </div>
            {/* Series Badge (top-left only) */}
            {props.series && (
              <div className="absolute top-3 left-3">
                <Badge className={getSeriesColor(props.series)}>
                  {getSeriesTitle(props.series)}
                </Badge>
              </div>
            )}
            {/* Media Type Icon / Heart Icon (top-right) */}
            <div className="absolute top-3 right-3">
              {/* Media Type Icon - visible by default, fades on hover */}
              {props.mediaType && (
                <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-200 flex items-center justify-center">
                  <div className="bg-black/70 text-white rounded-full p-2 flex items-center justify-center">
                    {props.mediaType === 'video' ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <Headphones className="h-4 w-4" />
                    )}
                  </div>
                </div>
              )}
              {/* Heart Icon - fades in on hover */}
              <Button 
                variant="secondary" 
                size="sm" 
                className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white"
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-4 w-4 ${localIsLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>
            {/* Duration Badge (bottom-right) */}
            <div className="absolute bottom-3 right-3">
              <Badge variant="secondary" className="bg-black/70 text-white">
                <Clock className="h-3 w-3 mr-1" />
                {props.duration}
              </Badge>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-2.5">
          {/* Title */}
          <h3 className="font-semibold line-clamp-2 group-hover:text-[#003A7C] dark:group-hover:text-[#87CEFA] transition-colors cursor-pointer leading-tight">
            {props.title}
          </h3>
          
          {/* Speaker and Views on Same Line */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={props.speakerAvatar} />
                <AvatarFallback className="text-xs">
                  {props.speaker.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground truncate">{props.speaker}</span>
            </div>
            {props.views && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{formatViewCount(props.views)}</span>
              </div>
            )}
          </div>

          {/* Category Badge and Language on Same Line */}
          <div className="flex items-center justify-between">
            <Badge className={`${getCategoryColor(props.category)} text-xs`}>
              {props.category}
            </Badge>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3 flex-shrink-0" />
              <span>{formatLanguage(props.language)}</span>
            </div>
          </div>
          
          {/* Date and Location on Same Line */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{props.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{props.location}</span>
            </div>
          </div>

          {/* Action Buttons Row - More compact */}
          <div className="flex items-center justify-between pt-1.5 border-t border-border/30">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary"
              onClick={handleAddToPlaylist}
            >
              <Plus className="h-3 w-3 mr-1" />
              Playlist
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary"
              onClick={handleDownload}
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Series Card
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer" 
      onClick={props.onClick}
    >
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          <ImageWithFallback
            src={props.thumbnail}
            alt={props.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Button size="sm" className="rounded-full bg-[#FFC107] hover:bg-[#E68800] text-[#003A7C] border-0">
              <Play className="h-4 w-4 mr-1" />
              View Series
            </Button>
          </div>
          <div className="absolute top-3 left-3">
            <Badge className={getCategoryColor(props.category)}>
              {props.category}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-black/70 text-white">
              <Eye className="h-3 w-3 mr-1" />
              {props.episodeCount} episodes
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white">
              <Clock className="h-3 w-3 mr-1" />
              {props.totalDuration}
            </Badge>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold line-clamp-2 group-hover:text-[#003A7C] dark:group-hover:text-[#87CEFA] transition-colors cursor-pointer">
            {props.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {props.description}
          </p>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Speakers:</span>
            <div className="flex -space-x-1">
              {props.speakers.slice(0, 3).map((speaker, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {speaker.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {props.speakers.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs">+{props.speakers.length - 3}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Started {props.startDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}