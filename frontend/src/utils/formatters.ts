// YouTube-style view count formatting
export const formatViewCount = (views: number): string => {
  if (views < 1000) {
    return views.toString();
  } else if (views < 1000000) {
    const formatted = (views / 1000).toFixed(1);
    return formatted.endsWith('.0') ? `${Math.floor(views / 1000)}K` : `${formatted}K`;
  } else if (views < 1000000000) {
    const formatted = (views / 1000000).toFixed(1);
    return formatted.endsWith('.0') ? `${Math.floor(views / 1000000)}M` : `${formatted}M`;
  } else {
    const formatted = (views / 1000000000).toFixed(1);
    return formatted.endsWith('.0') ? `${Math.floor(views / 1000000000)}B` : `${formatted}B`;
  }
};

// Format duration for display
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

// Parse duration string to seconds (for sorting)
export const parseDurationToSeconds = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]; // mm:ss
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]; // hh:mm:ss
  }
  return 0;
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unitIndex]}`;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};