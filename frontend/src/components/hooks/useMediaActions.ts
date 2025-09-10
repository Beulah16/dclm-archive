import { toast } from "sonner";

interface MediaItem {
  id: string;
  title?: string;
  [key: string]: any;
}

interface UseMediaActionsProps {
  mediaData: MediaItem[];
  mediaType?: 'video' | 'audio' | string;
}

export function useMediaActions({ mediaData, mediaType }: UseMediaActionsProps) {
  const handleToggleFavorite = (mediaId: string, isLiked: boolean) => {
    const media = mediaData.find(m => m.id === mediaId);
    const action = isLiked ? 'Added to' : 'Removed from';
    toast.success(`${action} favorites`, {
      description: media?.title
        ? `"${media.title}" ${action.toLowerCase()} your favorites.`
        : `${mediaType || 'Media'} ${action.toLowerCase()} your favorites.`,
    });
  };

  const handleAddToPlaylist = (mediaId: string) => {
    const media = mediaData.find(m => m.id === mediaId);
    toast.success('Added to playlist', {
      description: media?.title
        ? `"${media.title}" added to your playlist.`
        : `${mediaType || 'Media'} added to your playlist.`,
    });
  };

  const handleDownload = (mediaId: string) => {
    const media = mediaData.find(m => m.id === mediaId);
    toast.success('Download started', {
      description: media?.title
        ? `"${media.title}" is being downloaded.`
        : `${mediaType || 'Media'} download started.`,
    });
  };

  return {
    handleToggleFavorite,
    handleAddToPlaylist,
    handleDownload,
  };
}