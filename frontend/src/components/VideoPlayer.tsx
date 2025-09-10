import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Download,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Heart,
  MessageCircle,
  MoreVertical,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Send,
  Reply
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getMediaById, getRelatedMedia } from "../data/mediaData";

interface VideoPlayerProps {
  videoId: string;
  seriesId?: string | null;
  onBack: () => void;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

const mockVideoData = {
  id: "1",
  title: "The Power of Faith in Uncertain Times",
  speaker: "Pastor John Davis",
  speakerAvatar: "https://images.unsplash.com/photo-1610414961792-b7fffebddd14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0b3IlMjBwcmVhY2hpbmd8ZW58MXx8fHwxNzU2NTQ4Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  category: "Sunday Service",
  duration: "45:23",
  views: "2,340",
  likes: "189",
  date: "Dec 22, 2024",
  location: "Main Sanctuary",
  description: "In these challenging times, Pastor John Davis shares powerful biblical insights on how faith can sustain us through uncertainty. Drawing from Hebrews 11:1 and personal testimonies, this message will strengthen your trust in God's faithfulness and His perfect plan for your life. Whether you're facing financial difficulties, health challenges, or relationship struggles, this sermon will remind you that God is still on the throne and working all things together for your good.",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  scriptureReferences: ["Hebrews 11:1", "Romans 8:28", "Philippians 4:19", "Isaiah 41:10"],
  tags: ["Faith", "Trust", "Uncertainty", "Hope", "Promises"]
};

const mockRelatedVideos = [
  {
    id: "2",
    title: "Walking in Divine Purpose",
    speaker: "Pastor John Davis",
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJ2aWNlfGVufDF8fHx8MTc1NjU0ODI4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "38:15",
    views: "1,890",
    date: "Dec 20, 2024"
  },
  {
    id: "3", 
    title: "Faith and Miracles",
    speaker: "Pastor John Davis",
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJ2aWNlfGVufDF8fHx8MTc1NjU0ODI4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "42:07",
    views: "2,340",
    date: "Dec 18, 2024"
  },
  {
    id: "4",
    title: "Building Unshakeable Faith",
    speaker: "Pastor John Davis", 
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJ2aWNlfGVufDF8fHx8MTc1NjU0ODI4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "45:12",
    views: "3,120",
    date: "Dec 15, 2024"
  },
  {
    id: "5",
    title: "Trust in Uncertain Times",
    speaker: "Pastor John Davis",
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJ2aWNlfGVufDF8fHx8MTc1NjU0ODI4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "39:33",
    views: "1,567",
    date: "Dec 12, 2024"
  }
];

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5b5?w=40&h=40&fit=crop&crop=face"
    },
    content: "This message was exactly what I needed to hear today. Pastor John's words about trusting God's timing really spoke to my heart. Thank you for this powerful reminder!",
    timestamp: "2 hours ago",
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        user: {
          name: "Michael Brown",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        },
        content: "Amen! God's timing is always perfect, even when we can't see it.",
        timestamp: "1 hour ago",
        likes: 3,
        isLiked: false
      }
    ]
  },
  {
    id: "2", 
    user: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    content: "The scripture references were so helpful. I'm going to study Hebrews 11 more deeply this week. Praise God for faithful pastors who rightly divide the word of truth!",
    timestamp: "3 hours ago",
    likes: 8,
    isLiked: false
  },
  {
    id: "3",
    user: {
      name: "Grace Martinez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    content: "This sermon came at the perfect time for our family. We've been going through some challenges, but this reminded us that God is faithful and His promises are true. Thank you Pastor John!",
    timestamp: "5 hours ago",
    likes: 15,
    isLiked: true
  }
];

export function VideoPlayer({ videoId, seriesId, onBack }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('720p');
  const [showDescription, setShowDescription] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Get real video data
  const videoData = getMediaById(videoId);
  const relatedVideos = getRelatedMedia(videoId).filter(item => item.type === 'VIDEO').slice(0, 4);

  // Use real data or fallback to mock data
  const currentVideoData = videoData || mockVideoData;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    // Check if we're already in pseudo-fullscreen mode
    if (isPseudoFullscreen) {
      exitPseudoFullscreen();
      return;
    }

    try {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      if (!isCurrentlyFullscreen) {
        // Try to enter native fullscreen first
        const videoContainer = video.closest('.video-container') as HTMLElement;
        
        if (videoContainer && fullscreenSupported) {
          if (videoContainer.requestFullscreen) {
            await videoContainer.requestFullscreen();
          } else if ((videoContainer as any).webkitRequestFullscreen) {
            await (videoContainer as any).webkitRequestFullscreen();
          } else if ((videoContainer as any).mozRequestFullScreen) {
            await (videoContainer as any).mozRequestFullScreen();
          } else if ((videoContainer as any).msRequestFullscreen) {
            await (videoContainer as any).msRequestFullscreen();
          } else {
            throw new Error('No fullscreen method available');
          }
        } else {
          throw new Error('Fullscreen not supported or container not found');
        }
      } else {
        // Exit native fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      // Handle permissions policy or other fullscreen errors
      if (error instanceof Error && (
        error.message.includes('permissions policy') || 
        error.message.includes('disallowed') ||
        error.message.includes('not supported') ||
        error.name === 'TypeError'
      )) {
        console.warn('Native fullscreen blocked, using pseudo-fullscreen fallback');
        setFullscreenSupported(false);
        enterPseudoFullscreen();
      } else {
        console.error('Unexpected fullscreen error:', error);
        // Still try pseudo-fullscreen as fallback
        enterPseudoFullscreen();
      }
    }
  };

  const enterPseudoFullscreen = () => {
    setIsPseudoFullscreen(true);
    document.body.style.overflow = 'hidden';
    
    // Scroll to top to ensure full visibility
    window.scrollTo(0, 0);
  };

  const exitPseudoFullscreen = () => {
    setIsPseudoFullscreen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
      
      // If we exit native fullscreen, also exit pseudo-fullscreen
      if (!isCurrentlyFullscreen && isPseudoFullscreen) {
        exitPseudoFullscreen();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Allow Escape key to exit pseudo-fullscreen
      if (e.key === 'Escape' && isPseudoFullscreen) {
        exitPseudoFullscreen();
      }
    };

    // Handle multiple fullscreen event types for cross-browser compatibility
    const fullscreenEvents = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange'
    ];

    fullscreenEvents.forEach(event => {
      document.addEventListener(event, handleFullscreenChange);
    });

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      fullscreenEvents.forEach(event => {
        document.removeEventListener(event, handleFullscreenChange);
      });
      document.removeEventListener('keydown', handleKeyPress);
      // Cleanup on unmount
      if (isPseudoFullscreen) {
        document.body.style.overflow = '';
      }
    };
  }, [isPseudoFullscreen]);

  // Handle hover state for controls
  useEffect(() => {
    let hideControlsTimer: NodeJS.Timeout;

    if (isHovering) {
      setShowControls(true);
      // Clear any existing timer
      if (hideControlsTimer) clearTimeout(hideControlsTimer);
    } else {
      // Hide controls after 3 seconds of no hover
      hideControlsTimer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (hideControlsTimer) clearTimeout(hideControlsTimer);
    };
  }, [isHovering]);

  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      user: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      isLiked: false
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
    setReplyContent('');
    setReplyingTo(null);
  };

  const toggleCommentLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments(comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => 
            reply.id === commentId 
              ? { 
                  ...reply, 
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                }
              : reply
          )
        };
      } else if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back Button - Hidden in pseudo-fullscreen */}
      {!isPseudoFullscreen && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Videos
        </Button>
      )}

      <div className={`grid grid-cols-1 xl:grid-cols-4 gap-6 ${isPseudoFullscreen ? 'hidden' : ''}`}>
        {/* Main Video Player */}
        <div className="xl:col-span-3 space-y-4">
          {/* Video Container */}
          <div 
            className={`relative bg-black overflow-hidden group video-container transition-all duration-300 ${
              isPseudoFullscreen 
                ? 'fixed inset-0 z-50 rounded-none' 
                : 'rounded-lg'
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={() => {
              setIsHovering(true);
              setShowControls(true);
            }}
          >
            <video
              ref={videoRef}
              src={videoData?.streamUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
              className={`w-full cursor-pointer ${
                isPseudoFullscreen ? 'h-full object-contain' : 'aspect-video'
              }`}
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Video Controls Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 video-controls p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                {/* Progress Bar */}
                <div className="mb-4">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                  />
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={1}
                        step={0.1}
                        onValueChange={handleVolumeChange}
                        className="w-20"
                      />
                    </div>
                    
                    <span className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Settings Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <span>Playback Speed</span>
                        </DropdownMenuItem>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <DropdownMenuItem
                            key={speed}
                            onClick={() => changePlaybackSpeed(speed)}
                            className={playbackSpeed === speed ? "bg-accent" : ""}
                          >
                            {speed}x
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <span>Quality</span>
                        </DropdownMenuItem>
                        {['1080p', '720p', '480p', '360p'].map((q) => (
                          <DropdownMenuItem
                            key={q}
                            onClick={() => setQuality(q)}
                            className={quality === q ? "bg-accent" : ""}
                          >
                            {q}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                      title={
                        fullscreenSupported 
                          ? (isFullscreen || isPseudoFullscreen ? "Exit fullscreen" : "Enter fullscreen")
                          : (isPseudoFullscreen ? "Exit fullscreen" : "Enter fullscreen (browser fallback)")
                      }
                    >
                      {(isFullscreen || isPseudoFullscreen) ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            
            {/* Play/Pause button overlay for center click */}
            {!showControls && !isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-4 opacity-80 hover:opacity-100 transition-opacity">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            )}

            {/* Pseudo-fullscreen exit hint */}
            {isPseudoFullscreen && showControls && (
              <div className="absolute top-4 right-4 text-white/80 text-sm bg-black/50 px-3 py-1 rounded">
                Press ESC to exit fullscreen
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{mockVideoData.title}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span>{mockVideoData.views} views</span>
                  <span>•</span>
                  <span>{mockVideoData.date}</span>
                  <Badge variant="secondary">{mockVideoData.category}</Badge>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-2"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{mockVideoData.likes}</span>
              </Button>
              
              <Button variant="outline">
                <ThumbsDown className="h-4 w-4" />
              </Button>
              
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Speaker Info */}
            <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockVideoData.speakerAvatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{mockVideoData.speaker}</h3>
                <p className="text-sm text-muted-foreground">{mockVideoData.location}</p>
              </div>
              <Button variant="outline">Follow</Button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => setShowDescription(!showDescription)}
                className="w-full justify-between p-0 h-auto text-left"
              >
                <span className="font-semibold">Description</span>
                {showDescription ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              {showDescription && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm leading-relaxed">{mockVideoData.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Scripture References:</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockVideoData.scriptureReferences.map((ref, index) => (
                        <Badge key={index} variant="outline">{ref}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockVideoData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">#{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Comments Section - Below Description */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <h3 className="font-semibold">{comments.length} Comments</h3>
              </div>

              {/* Add Comment */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{comment.user.name}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`h-6 text-xs ${comment.isLiked ? 'text-[#FFC107]' : ''}`}
                            onClick={() => toggleCommentLike(comment.id)}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 text-xs"
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                          <div className="space-y-2 mt-3">
                            <Textarea
                              placeholder={`Reply to ${comment.user.name}...`}
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="min-h-[60px] text-sm"
                            />
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={!replyContent.trim()}
                              >
                                Reply
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyContent('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-11 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.user.avatar} />
                              <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-xs">{reply.user.name}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-xs leading-relaxed">{reply.content}</p>
                              <div className="flex items-center space-x-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`h-5 text-xs ${reply.isLiked ? 'text-[#FFC107]' : ''}`}
                                  onClick={() => toggleCommentLike(reply.id, true, comment.id)}
                                >
                                  <ThumbsUp className="h-2 w-2 mr-1" />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Videos Sidebar */}
        <div className="space-y-4">
          <h3 className="font-semibold">More from this Series</h3>
          <div className="space-y-3">
            {mockRelatedVideos.map((video) => (
              <div key={video.id} className="flex space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                <div className="relative flex-shrink-0">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute bottom-1 right-1">
                    <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                      {video.duration}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-[#003A7C] transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{video.speaker}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}