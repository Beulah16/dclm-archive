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
  SkipBack, 
  SkipForward,
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
  Reply,
  Repeat,
  Shuffle,
  Music
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AudioPlayerProps {
  audioId: string;
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

const mockAudioData = {
  id: "1",
  title: "Worship in Spirit and Truth",
  speaker: "Minister Lisa Thompson",
  speakerAvatar: "https://images.unsplash.com/photo-1482627750753-afdba16659ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjaG9pcnxlbnwxfHx8fDE3NTY1NDgyODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  category: "Sunday Service",
  duration: "32:15",
  views: "1,890",
  likes: "156",
  date: "Dec 22, 2024",
  location: "Main Sanctuary",
  description: "Join Minister Lisa Thompson in this powerful message about authentic worship. Discover what it truly means to worship God in spirit and in truth, and how this transforms our relationship with Him. This sermon explores John 4:23-24 and provides practical insights on developing a heart of worship that goes beyond mere ritual to genuine spiritual connection with our Creator.",
  audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Sample audio URL
  thumbnail: "https://images.unsplash.com/photo-1482627750753-afdba16659ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjaG9pcnxlbnwxfHx8fDE3NTY1NDgyODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  scriptureReferences: ["John 4:23-24", "Psalm 29:2", "Romans 12:1", "1 Chronicles 16:29"],
  tags: ["Worship", "Spirit", "Truth", "Prayer", "Devotion"]
};

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Rachel Adams",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5b5?w=40&h=40&fit=crop&crop=face"
    },
    content: "This message on worship has completely changed my perspective. Minister Lisa's teaching on authentic worship versus performance really convicted my heart. Thank you for this beautiful reminder of what God desires from us.",
    timestamp: "1 hour ago",
    likes: 18,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        user: {
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        },
        content: "Absolutely! Worship is not about the music or the atmosphere, it's about the heart posture before God.",
        timestamp: "45 minutes ago",
        likes: 5,
        isLiked: false
      }
    ]
  },
  {
    id: "2", 
    user: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    content: "The explanation of John 4:23-24 was so clear and powerful. I've listened to this three times already and still getting fresh revelation. God bless Minister Lisa for this word!",
    timestamp: "2 hours ago",
    likes: 12,
    isLiked: false
  },
  {
    id: "3",
    user: {
      name: "Angela Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    content: "This sermon blessed my soul! As a worship leader, this reminded me that it's not about the performance but about creating space for genuine encounter with God. Thank you for this timely word.",
    timestamp: "4 hours ago",
    likes: 22,
    isLiked: true
  }
];

export function AudioPlayer({ audioId, onBack }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const changePlaybackSpeed = (speed: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.loop = !isLooping;
    setIsLooping(!isLooping);
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

  // Generate mock waveform data
  const generateWaveformData = () => {
    const bars = 100;
    return Array.from({ length: bars }, (_, i) => {
      const progress = i / bars;
      const played = progress <= (currentTime / duration);
      const height = Math.random() * 40 + 10;
      return { height, played };
    });
  };

  const waveformData = generateWaveformData();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={mockAudioData.audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Audio
      </Button>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Audio Player */}
        <div className="space-y-6">
          {/* Audio Player Card */}
          <div className="bg-gradient-to-br from-[#003A7C]/10 to-[#87CEFA]/10 rounded-2xl p-8 space-y-6">
            {/* Album Art and Info */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <ImageWithFallback
                  src={mockAudioData.thumbnail}
                  alt={mockAudioData.title}
                  className="w-32 h-32 rounded-xl object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              </div>
              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold">{mockAudioData.title}</h1>
                <p className="text-lg text-muted-foreground">{mockAudioData.speaker}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{mockAudioData.views} listens</span>
                  <span>•</span>
                  <span>{mockAudioData.date}</span>
                  <Badge variant="secondary">{mockAudioData.category}</Badge>
                </div>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="space-y-4">
              <div className="relative h-16 waveform-container rounded-lg overflow-hidden cursor-pointer"
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const clickX = e.clientX - rect.left;
                     const progress = clickX / rect.width;
                     handleSeek([progress * duration]);
                   }}>
                <div className="absolute inset-0 flex items-end justify-center space-x-1 p-2">
                  {waveformData.map((bar, index) => (
                    <div
                      key={index}
                      className={`w-1 rounded-t transition-colors ${
                        bar.played 
                          ? 'bg-[#FFC107]' 
                          : 'bg-muted-foreground/40'
                      }`}
                      style={{ height: `${bar.height}%` }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                  <div 
                    className="h-full bg-[#FFC107] transition-all duration-100"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center space-x-6">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => skip(-15)}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipBack className="h-6 w-6" />
              </Button>
              
              <Button
                onClick={togglePlay}
                size="lg"
                className={`w-16 h-16 rounded-full bg-[#FFC107] hover:bg-[#E68800] text-[#003A7C] transition-all duration-300 ${isPlaying ? 'animate-pulse-glow' : ''}`}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={() => skip(15)}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={toggleLoop}
                  className={`${isLooping ? 'text-[#FFC107]' : 'text-muted-foreground'}`}
                >
                  <Repeat className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={toggleMute}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="w-24"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Speed Control */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-muted-foreground">
                      {playbackSpeed}x
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <DropdownMenuItem
                        key={speed}
                        onClick={() => changePlaybackSpeed(speed)}
                        className={playbackSpeed === speed ? "bg-accent" : ""}
                      >
                        {speed}x
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{mockAudioData.likes}</span>
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
              <AvatarImage src={mockAudioData.speakerAvatar} />
              <AvatarFallback>LT</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{mockAudioData.speaker}</h3>
              <p className="text-sm text-muted-foreground">{mockAudioData.location}</p>
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
                <p className="text-sm leading-relaxed">{mockAudioData.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Scripture References:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockAudioData.scriptureReferences.map((ref, index) => (
                      <Badge key={index} variant="outline">{ref}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockAudioData.tags.map((tag, index) => (
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
            <div className="space-y-4 max-h-[600px] overflow-y-auto comments-scroll">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
                          onClick={() => toggleCommentLike(comment.id)}
                        >
                          <ThumbsUp className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-current text-[#FFC107]' : ''}`} />
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
                        <div className="mt-3 space-y-2">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="min-h-[60px]"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReplySubmit(comment.id)}
                              disabled={!replyContent.trim()}
                            >
                              Reply
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
                                className="h-5 text-xs"
                                onClick={() => toggleCommentLike(reply.id, true, comment.id)}
                              >
                                <ThumbsUp className={`h-2 w-2 mr-1 ${reply.isLiked ? 'fill-current text-[#FFC107]' : ''}`} />
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
    </div>
  );
}