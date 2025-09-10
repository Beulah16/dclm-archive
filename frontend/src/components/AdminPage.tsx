import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  Video,
  Music,
  Upload,
  Download,
  Eye,
  Calendar,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  TrendingUp,
  Activity,
  UserCheck,
  Clock,
  Settings,
  LayoutDashboard,
  FileVideo,
  ListMusic,
  FolderOpen,
  UserCog,
  BarChart3,
  Bell,
  Database,
  Copy,
  Archive,
  Share,
  MapPin,
  Tag,
  Play,
  CheckSquare,
  Square,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Checkbox } from "./ui/checkbox";
import { cn } from "./ui/utils";
import {
  getMediaStats,
  mediaItems,
  seriesData,
  categoryData,
} from "../data/mediaData";
import { formatViewCount } from "../utils/formatters";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  count?: number;
}

export function AdminPage() {
  const [activeSection, setActiveSection] =
    useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // All state hooks at the top level to avoid Rules of Hooks violations
  // Sermons state
  const [sermonsSearchTerm, setSermonsSearchTerm] =
    useState("");
  const [sermonsFilterType, setSermonsFilterType] =
    useState("all");
  const [sermonsFilterCategory, setSermonsFilterCategory] =
    useState("all");
  const [sermonsFilterSeries, setSermonsFilterSeries] =
    useState("all");
  const [sermonsFilterLanguage, setSermonsFilterLanguage] =
    useState("all");
  const [sermonsFilterYear, setSermonsFilterYear] =
    useState("all");
  const [sermonsFilterStatus, setSermonsFilterStatus] =
    useState("all");
  const [sermonsSortField, setSermonsSortField] =
    useState("date");
  const [sermonsSortOrder, setSermonsSortOrder] = useState<
    "asc" | "desc"
  >("desc");
  const [selectedSermons, setSelectedSermons] = useState<
    string[]
  >([]);
  const [showFilters, setShowFilters] = useState(false);

  // Series state
  const [seriesSearchTerm, setSeriesSearchTerm] = useState("");
  const [seriesSortField, setSeriesSortField] =
    useState("totalViews");
  const [seriesSortOrder, setSeriesSortOrder] = useState<
    "asc" | "desc"
  >("desc");

  // Categories state
  const [categoriesSearchTerm, setCategoriesSearchTerm] =
    useState("");
  const [categoriesSortField, setCategoriesSortField] =
    useState("totalContent");
  const [categoriesSortOrder, setCategoriesSortOrder] =
    useState<"asc" | "desc">("desc");

  // Users state
  const [usersSearchTerm, setUsersSearchTerm] = useState("");
  const [usersFilterRole, setUsersFilterRole] = useState("all");
  const [usersFilterStatus, setUsersFilterStatus] =
    useState("all");
  const [usersSortField, setUsersSortField] =
    useState("lastLogin");
  const [usersSortOrder, setUsersSortOrder] = useState<
    "asc" | "desc"
  >("desc");

  // Get real statistics from our data
  const stats = getMediaStats();

  const sidebarItems: SidebarItem[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "sermons",
      label: "Sermons",
      icon: FileVideo,
      count: stats.totalVideos + stats.totalAudios,
    },
    {
      id: "series",
      label: "Series",
      icon: ListMusic,
      count: stats.totalSeries,
    },
    {
      id: "categories",
      label: "Categories",
      icon: FolderOpen,
      count: stats.totalCategories,
    },
    { id: "users", label: "Users", icon: Users, count: 452 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      count: 5,
    },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Real data for admin dashboard based on actual media data
  const overviewStats = [
    {
      title: "Total Videos",
      value: stats.totalVideos.toLocaleString(),
      change: "+12%",
      icon: Video,
      color: "text-[#003A7C]",
      bgColor: "bg-[#003A7C]/10",
    },
    {
      title: "Total Audio",
      value: stats.totalAudios.toLocaleString(),
      change: "+8%",
      icon: Music,
      color: "text-[#87CEFA]",
      bgColor: "bg-[#87CEFA]/10",
    },
    {
      title: "Total Series",
      value: stats.totalSeries.toLocaleString(),
      change: "+23%",
      icon: ListMusic,
      color: "text-[#FFC107]",
      bgColor: "bg-[#FFC107]/10",
    },
    {
      title: "Total Views",
      value: `${Math.floor(stats.totalViews / 1000)}K`,
      change: "+15%",
      icon: Eye,
      color: "text-[#E68800]",
      bgColor: "bg-[#E68800]/10",
    },
  ];

  // Generate monthly data based on years in our data
  const generateMonthlyData = () => {
    const currentYear = new Date().getFullYear();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months.map((month, index) => {
      // Simulate data based on actual content distribution
      const baseVideos = Math.floor(stats.totalVideos / 12);
      const baseAudios = Math.floor(stats.totalAudios / 12);
      const variation = Math.floor(Math.random() * 10) - 5; // ±5 variation

      return {
        month,
        videos: Math.max(1, baseVideos + variation),
        audios: Math.max(1, baseAudios + variation),
        users: Math.floor(Math.random() * 200) + 100, // Simulated user data
      };
    });
  };

  const monthlyData = generateMonthlyData();
  const categoryDistribution = stats.categoryDistribution;

  const recentContent = stats.recentContent
    .slice(0, 10)
    .map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      speaker: item.minister,
      category: item.category,
      duration: item.duration,
      views: item.views.toLocaleString(),
      status: "Published",
      date: item.date,
    }));

  const users = [
    {
      id: "1",
      name: "Pastor W.F. Kumuyi",
      email: "admin@dclm.org",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Media Administrator",
      email: "media@dclm.org",
      role: "Admin",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: "3",
      name: "Content Editor",
      email: "editor@dclm.org",
      role: "Editor",
      status: "Active",
      lastLogin: "3 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Published: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Archive: "bg-gray-100 text-gray-800",
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-lg ${stat.bgColor}`}
                >
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Content Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="videos"
                    fill="#003A7C"
                    name="Videos"
                  />
                  <Bar
                    dataKey="audios"
                    fill="#87CEFA"
                    name="Audio"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistribution.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      ),
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentContent.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{item.type}</Badge>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.speaker} • {item.duration}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSermons = () => {
    // Get all sermons with enhanced data
    const allSermons = mediaItems.slice(0, 50).map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      speaker: item.minister,
      category: item.category,
      series: item.series,
      duration: item.duration,
      views: item.views,
      viewsFormatted: formatViewCount(item.views),
      status: "Published",
      date: item.date,
      year: item.year,
      language: item.language,
      location: item.city
        ? `${item.city}, ${item.state}`
        : item.country,
      city: item.city,
      state: item.state,
      country: item.country,
      fileSize: item.fileSize,
      quality: item.quality,
      tags: item.tags?.join(", ") || "N/A",
      description: item.description,
      thumbnail: item.thumbnail,
      downloadUrl: item.downloadUrl,
      streamUrl: item.streamUrl,
    }));

    // Get unique values for filters
    const uniqueCategories = [
      ...new Set(allSermons.map((s) => s.category)),
    ].sort();
    const uniqueSeries = [
      ...new Set(allSermons.map((s) => s.series)),
    ].sort();
    const uniqueLanguages = [
      ...new Set(allSermons.map((s) => s.language)),
    ].sort();
    const uniqueYears = [
      ...new Set(allSermons.map((s) => s.year)),
    ].sort((a, b) => b - a);

    // Filter and sort sermons
    const filteredSermons = allSermons
      .filter((sermon) => {
        const matchesSearch =
          sermon.title
            .toLowerCase()
            .includes(sermonsSearchTerm.toLowerCase()) ||
          sermon.speaker
            .toLowerCase()
            .includes(sermonsSearchTerm.toLowerCase()) ||
          sermon.category
            .toLowerCase()
            .includes(sermonsSearchTerm.toLowerCase()) ||
          sermon.series
            .toLowerCase()
            .includes(sermonsSearchTerm.toLowerCase());
        const matchesType =
          sermonsFilterType === "all" ||
          sermon.type.toLowerCase() === sermonsFilterType;
        const matchesCategory =
          sermonsFilterCategory === "all" ||
          sermon.category === sermonsFilterCategory;
        const matchesSeries =
          sermonsFilterSeries === "all" ||
          sermon.series === sermonsFilterSeries;
        const matchesLanguage =
          sermonsFilterLanguage === "all" ||
          sermon.language === sermonsFilterLanguage;
        const matchesYear =
          sermonsFilterYear === "all" ||
          sermon.year.toString() === sermonsFilterYear;
        const matchesStatus =
          sermonsFilterStatus === "all" ||
          sermon.status.toLowerCase() ===
          sermonsFilterStatus.toLowerCase();

        return (
          matchesSearch &&
          matchesType &&
          matchesCategory &&
          matchesSeries &&
          matchesLanguage &&
          matchesYear &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        let aValue: any = a[sermonsSortField as keyof typeof a];
        let bValue: any = b[sermonsSortField as keyof typeof b];

        if (sermonsSortField === "views") {
          aValue = a.views;
          bValue = b.views;
        }

        if (
          typeof aValue === "number" &&
          typeof bValue === "number"
        ) {
          return sermonsSortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return sermonsSortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

    // Bulk operations
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedSermons(filteredSermons.map((s) => s.id));
      } else {
        setSelectedSermons([]);
      }
    };

    const handleSelectSermon = (
      sermonId: string,
      checked: boolean,
    ) => {
      if (checked) {
        setSelectedSermons((prev) => [...prev, sermonId]);
      } else {
        setSelectedSermons((prev) =>
          prev.filter((id) => id !== sermonId),
        );
      }
    };

    const isAllSelected =
      selectedSermons.length === filteredSermons.length &&
      filteredSermons.length > 0;
    const isPartiallySelected =
      selectedSermons.length > 0 &&
      selectedSermons.length < filteredSermons.length;

    return (
      <div className="flex flex-col h-full">
        {/* Fixed Header Section */}
        <div className="flex-none p-6 border-b bg-background">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                Sermon Management
              </h2>
              <p className="text-muted-foreground">
                Manage your video and audio sermons
              </p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Sermon</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Sermons</p>
                  <p className="text-2xl font-bold text-blue-900">{allSermons.length}</p>
                </div>
                <div className="p-3 bg-blue-200 rounded-full">
                  <Video className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Views</p>
                  <p className="text-2xl font-bold text-green-900">
                    {allSermons.reduce((sum, sermon) => sum + sermon.views, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-200 rounded-full">
                  <Eye className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Video Sermons</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {allSermons.filter(s => s.type === 'VIDEO').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-200 rounded-full">
                  <Play className="h-6 w-6 text-purple-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Audio Sermons</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {allSermons.filter(s => s.type === 'AUDIO').length}
                  </p>
                </div>
                <div className="p-3 bg-orange-200 rounded-full">
                  <Music className="h-6 w-6 text-orange-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search sermons..."
                className="pl-10"
                value={sermonsSearchTerm}
                onChange={(e) =>
                  setSermonsSearchTerm(e.target.value)
                }
              />
            </div>

            {/* Filter Controls */}
            <Select
              value={sermonsFilterType}
              onValueChange={setSermonsFilterType}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sermonsFilterCategory}
              onValueChange={setSermonsFilterCategory}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Categories
                </SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sermonsFilterSeries}
              onValueChange={setSermonsFilterSeries}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Series" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Series</SelectItem>
                {uniqueSeries.map((series) => (
                  <SelectItem key={series} value={series}>
                    {series}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sermonsFilterYear}
              onValueChange={setSermonsFilterYear}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {uniqueYears.map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sermonsFilterLanguage}
              onValueChange={setSermonsFilterLanguage}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Languages
                </SelectItem>
                {uniqueLanguages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Control */}
            <Select
              value={sermonsSortField}
              onValueChange={setSermonsSortField}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="speaker">Speaker</SelectItem>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="category">
                  Category
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSermonsSortOrder(
                  sermonsSortOrder === "asc" ? "desc" : "asc",
                )
              }
            >
              {sermonsSortOrder === "asc" ? "↑" : "↓"}
            </Button>
          </div>

          {/* Results and Bulk Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {filteredSermons.length} sermons found
              </span>
              {selectedSermons.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {selectedSermons.length} selected
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Table Section */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-x-auto">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        className={
                          isPartiallySelected
                            ? "data-[state=checked]:bg-primary/50"
                            : ""
                        }
                      />
                    </TableHead>
                    <TableHead
                      className="cursor-pointer min-w-80"
                      onClick={() => {
                        setSermonsSortField("title");
                        setSermonsSortOrder(
                          sermonsSortField === "title" &&
                            sermonsSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Title{" "}
                      {sermonsSortField === "title" &&
                        (sermonsSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="w-16">Type</TableHead>
                    <TableHead className="min-w-20">
                      Quality
                    </TableHead>
                    <TableHead className="min-w-48">
                      Series
                    </TableHead>
                    <TableHead className="min-w-36">
                      Category
                    </TableHead>
                    <TableHead className="min-w-24">
                      Language
                    </TableHead>
                    <TableHead
                      className="cursor-pointer min-w-40"
                      onClick={() => {
                        setSermonsSortField("speaker");
                        setSermonsSortOrder(
                          sermonsSortField === "speaker" &&
                            sermonsSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Speaker{" "}
                      {sermonsSortField === "speaker" &&
                        (sermonsSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="min-w-32">
                      Location
                    </TableHead>
                    <TableHead
                      className="cursor-pointer min-w-28"
                      onClick={() => {
                        setSermonsSortField("date");
                        setSermonsSortOrder(
                          sermonsSortField === "date" &&
                            sermonsSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Date{" "}
                      {sermonsSortField === "date" &&
                        (sermonsSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="min-w-24">
                      Status
                    </TableHead>
                    <TableHead
                      className="cursor-pointer min-w-24"
                      onClick={() => {
                        setSermonsSortField("views");
                        setSermonsSortOrder(
                          sermonsSortField === "views" &&
                            sermonsSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Views{" "}
                      {sermonsSortField === "views" &&
                        (sermonsSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="w-12">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSermons.map((sermon) => (
                    <TableRow
                      key={sermon.id}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedSermons.includes(
                            sermon.id,
                          )}
                          onCheckedChange={(checked) =>
                            handleSelectSermon(
                              sermon.id,
                              checked as boolean,
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <img
                            src={sermon.thumbnail}
                            alt={sermon.title}
                            className="w-12 h-9 rounded object-cover flex-shrink-0"
                          />
                          <div
                            className="truncate"
                            title={sermon.title}
                          >
                            {sermon.title}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {sermon.type === "VIDEO" ? (
                            <Video
                              className="w-5 h-5 text-blue-600"
                            />
                          ) : (
                            <Music
                              className="w-5 h-5 text-green-600"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700"
                        >
                          {sermon.quality}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div
                          className="truncate"
                          title={sermon.series}
                        >
                          <Badge variant="outline">
                            {sermon.series}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {sermon.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {sermon.language}
                        </Badge>
                      </TableCell>
                      <TableCell>{sermon.speaker}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span
                            className="truncate"
                            title={sermon.location}
                          >
                            {sermon.location}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {sermon.date}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(
                            sermon.status,
                          )}
                        >
                          {sermon.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{sermon.viewsFormatted}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSeries = () => {
    // Enhanced series data with full details
    const allSeries = seriesData.map((series) => ({
      id: series.id,
      name: series.name,
      description: series.description,
      category: series.category,
      totalEpisodes: series.totalEpisodes,
      totalViews: series.totalViews,
      ministers: series.ministers,
      thumbnail: series.thumbnail,
      status: "Active",
      createdDate: "2024",
      lastUpdated: "2024-01-15",
      totalDuration: `${Math.floor((series.totalEpisodes * 45) / 60)} hrs`,
      avgViewsPerEpisode: Math.floor(
        series.totalViews / series.totalEpisodes,
      ),
      videoCount: series.mediaItems.filter(
        (item) => item.type === "VIDEO",
      ).length,
      audioCount: series.mediaItems.filter(
        (item) => item.type === "AUDIO",
      ).length,
    }));

    // Filter and sort series
    const filteredSeries = allSeries
      .filter((series) => {
        return (
          series.name
            .toLowerCase()
            .includes(seriesSearchTerm.toLowerCase()) ||
          series.category
            .toLowerCase()
            .includes(seriesSearchTerm.toLowerCase()) ||
          series.description
            .toLowerCase()
            .includes(seriesSearchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        let aValue: any = a[seriesSortField as keyof typeof a];
        let bValue: any = b[seriesSortField as keyof typeof b];

        if (
          typeof aValue === "number" &&
          typeof bValue === "number"
        ) {
          return seriesSortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return seriesSortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Series Management
            </h2>
            <p className="text-muted-foreground">
              Organize sermons into series
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Series</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                All Series ({filteredSeries.length} items)
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search series..."
                    className="pl-10 w-64"
                    value={seriesSearchTerm}
                    onChange={(e) =>
                      setSeriesSearchTerm(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setSeriesSortField("name");
                        setSeriesSortOrder(
                          seriesSortField === "name" &&
                            seriesSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Series Name{" "}
                      {seriesSortField === "name" &&
                        (seriesSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setSeriesSortField("totalEpisodes");
                        setSeriesSortOrder(
                          seriesSortField === "totalEpisodes" &&
                            seriesSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Episodes{" "}
                      {seriesSortField === "totalEpisodes" &&
                        (seriesSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Content Split</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setSeriesSortField("totalViews");
                        setSeriesSortOrder(
                          seriesSortField === "totalViews" &&
                            seriesSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Total Views{" "}
                      {seriesSortField === "totalViews" &&
                        (seriesSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Avg Views/Episode</TableHead>
                    <TableHead>Total Duration</TableHead>
                    <TableHead>Ministers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-12">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSeries.map((series) => (
                    <TableRow
                      key={series.id}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium max-w-xs">
                        <div
                          className="truncate"
                          title={series.name}
                        >
                          {series.name}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-sm">
                        <div
                          className="truncate"
                          title={series.description}
                        >
                          {series.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {series.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {series.totalEpisodes}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            {series.videoCount}V
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            {series.audioCount}A
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {series.totalViews.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {series.avgViewsPerEpisode.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {series.totalDuration}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div
                          className="truncate"
                          title={series.ministers.join(", ")}
                        >
                          {series.ministers
                            .slice(0, 2)
                            .join(", ")}
                          {series.ministers.length > 2 &&
                            ` +${series.ministers.length - 2}`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(
                            series.status,
                          )}
                        >
                          {series.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {series.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Episodes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Series
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Episode
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export Series
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Series
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCategories = () => {
    // Enhanced categories data with full details
    const allCategories = categoryData.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color,
      totalContent: category.totalContent,
      totalViews: category.totalViews,
      thumbnail: category.thumbnail,
      status: "Active",
      createdDate: "2024",
      lastUpdated: "2024-01-15",
      videoCount: category.mediaItems.filter(
        (item) => item.type === "VIDEO",
      ).length,
      audioCount: category.mediaItems.filter(
        (item) => item.type === "AUDIO",
      ).length,
      seriesCount: seriesData.filter(
        (series) => series.category === category.name,
      ).length,
      avgViewsPerContent: Math.floor(
        Number(category.totalViews || 0) / Number(category.totalContent || 1),
      ),
      percentage: Math.round(
        (category.totalContent /
          (stats.totalVideos + stats.totalAudios)) *
        100,
      ),
    }));

    // Filter and sort categories
    const filteredCategories = allCategories
      .filter((category) => {
        return (
          category.name
            .toLowerCase()
            .includes(categoriesSearchTerm.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(categoriesSearchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        let aValue: any =
          a[categoriesSortField as keyof typeof a];
        let bValue: any =
          b[categoriesSortField as keyof typeof b];

        if (
          typeof aValue === "number" &&
          typeof bValue === "number"
        ) {
          return categoriesSortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return categoriesSortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Category Management
            </h2>
            <p className="text-muted-foreground">
              Organize content into categories
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </Button>
        </div>

        {/* Charts - Exact copy from Overview section with category data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Content Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allCategories.map(cat => ({
                    name: cat.name,
                    videos: cat.videoCount,
                    audios: cat.audioCount
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="videos"
                      fill="#003A7C"
                      name="Videos"
                    />
                    <Bar
                      dataKey="audios"
                      fill="#87CEFA"
                      name="Audio"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allCategories.map(cat => ({
                        name: cat.name,
                        value: cat.totalContent,
                        color: cat.color
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {allCategories.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ),
                      )}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                All Categories ({filteredCategories.length}{" "}
                items)
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search categories..."
                    className="pl-10 w-64"
                    value={categoriesSearchTerm}
                    onChange={(e) =>
                      setCategoriesSearchTerm(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Color</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setCategoriesSortField("name");
                        setCategoriesSortOrder(
                          categoriesSortField === "name" &&
                            categoriesSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Category Name{" "}
                      {categoriesSortField === "name" &&
                        (categoriesSortOrder === "asc"
                          ? "↑"
                          : "↓")}
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setCategoriesSortField("totalContent");
                        setCategoriesSortOrder(
                          categoriesSortField ===
                            "totalContent" &&
                            categoriesSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Total Content{" "}
                      {categoriesSortField === "totalContent" &&
                        (categoriesSortOrder === "asc"
                          ? "↑"
                          : "↓")}
                    </TableHead>
                    <TableHead>Content Split</TableHead>
                    <TableHead>Series Count</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setCategoriesSortField("totalViews");
                        setCategoriesSortOrder(
                          categoriesSortField ===
                            "totalViews" &&
                            categoriesSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Total Views{" "}
                      {categoriesSortField === "totalViews" &&
                        (categoriesSortOrder === "asc"
                          ? "↑"
                          : "↓")}
                    </TableHead>
                    <TableHead>Avg Views/Content</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setCategoriesSortField("percentage");
                        setCategoriesSortOrder(
                          categoriesSortField ===
                            "percentage" &&
                            categoriesSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Percentage{" "}
                      {categoriesSortField === "percentage" &&
                        (categoriesSortOrder === "asc"
                          ? "↑"
                          : "↓")}
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-12">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow
                      key={category.id}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{
                            backgroundColor: category.color,
                          }}
                          title={category.color}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="max-w-sm">
                        <div
                          className="truncate"
                          title={category.description}
                        >
                          {category.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {category.totalContent}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            {category.videoCount}V
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            {category.audioCount}A
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {category.seriesCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {category.totalViews.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {category.avgViewsPerContent.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {category.percentage}%
                          </Badge>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${Math.min(category.percentage * 2, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(
                            category.status,
                          )}
                        >
                          {category.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {category.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Content
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Category Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export Category
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Category
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderUsers = () => {
    // Enhanced users data with comprehensive details
    const allUsers = [
      {
        id: "1",
        name: "Pastor W.F. Kumuyi",
        email: "wf.kumuyi@dclm.org",
        role: "Super Admin",
        status: "Active",
        lastLogin: "2 hours ago",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        joinDate: "2020-01-01",
        loginCount: 1250,
        permissions: ["All Access"],
        department: "Leadership",
        location: "Lagos, Nigeria",
        phone: "+234-800-123-4567",
        lastActivity: "Uploaded sermon: 'Faith in Action'",
      },
      {
        id: "2",
        name: "Media Administrator",
        email: "media.admin@dclm.org",
        role: "Admin",
        status: "Active",
        lastLogin: "1 day ago",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9a85d8b?w=100&h=100&fit=crop&crop=face",
        joinDate: "2022-03-15",
        loginCount: 890,
        permissions: ["Media Management", "User Management"],
        department: "Media",
        location: "Lagos, Nigeria",
        phone: "+234-800-123-4568",
        lastActivity: "Edited video metadata",
      },
      {
        id: "3",
        name: "Content Editor",
        email: "content.editor@dclm.org",
        role: "Editor",
        status: "Active",
        lastLogin: "3 hours ago",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        joinDate: "2023-01-10",
        loginCount: 456,
        permissions: ["Content Management"],
        department: "Editorial",
        location: "Abuja, Nigeria",
        phone: "+234-800-123-4569",
        lastActivity: "Updated series description",
      },
      {
        id: "4",
        name: "Pastor John Emmanuel",
        email: "j.emmanuel@dclm.org",
        role: "Minister",
        status: "Active",
        lastLogin: "5 days ago",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        joinDate: "2021-06-20",
        loginCount: 234,
        permissions: ["Content Upload", "View Analytics"],
        department: "Ministry",
        location: "Port Harcourt, Nigeria",
        phone: "+234-800-123-4570",
        lastActivity: "Uploaded Bible study session",
      },
      {
        id: "5",
        name: "Technical Support",
        email: "tech.support@dclm.org",
        role: "Support",
        status: "Active",
        lastLogin: "12 hours ago",
        avatar:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
        joinDate: "2023-08-01",
        loginCount: 123,
        permissions: ["System Monitoring", "User Support"],
        department: "IT",
        location: "Lagos, Nigeria",
        phone: "+234-800-123-4571",
        lastActivity: "Resolved playback issue",
      },
      {
        id: "6",
        name: "Guest Reviewer",
        email: "guest.reviewer@dclm.org",
        role: "Reviewer",
        status: "Inactive",
        lastLogin: "2 weeks ago",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        joinDate: "2023-11-15",
        loginCount: 45,
        permissions: ["Content Review"],
        department: "Quality Assurance",
        location: "Ibadan, Nigeria",
        phone: "+234-800-123-4572",
        lastActivity: "Reviewed sermon transcript",
      },
    ];

    // Filter and sort users
    const filteredUsers = allUsers
      .filter((user) => {
        const matchesSearch =
          user.name
            .toLowerCase()
            .includes(usersSearchTerm.toLowerCase()) ||
          user.email
            .toLowerCase()
            .includes(usersSearchTerm.toLowerCase()) ||
          user.department
            .toLowerCase()
            .includes(usersSearchTerm.toLowerCase());
        const matchesRole =
          usersFilterRole === "all" ||
          user.role.toLowerCase() ===
          usersFilterRole.toLowerCase();
        const matchesStatus =
          usersFilterStatus === "all" ||
          user.status.toLowerCase() ===
          usersFilterStatus.toLowerCase();
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        let aValue: any = a[usersSortField as keyof typeof a];
        let bValue: any = b[usersSortField as keyof typeof b];

        if (usersSortField === "loginCount") {
          return usersSortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return usersSortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              User Management
            </h2>
            <p className="text-muted-foreground">
              Manage user accounts and permissions
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                All Users ({filteredUsers.length} items)
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10 w-64"
                    value={usersSearchTerm}
                    onChange={(e) =>
                      setUsersSearchTerm(e.target.value)
                    }
                  />
                </div>
                <Select
                  value={usersFilterRole}
                  onValueChange={setUsersFilterRole}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      All Roles
                    </SelectItem>
                    <SelectItem value="super admin">
                      Super Admin
                    </SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">
                      Editor
                    </SelectItem>
                    <SelectItem value="minister">
                      Minister
                    </SelectItem>
                    <SelectItem value="support">
                      Support
                    </SelectItem>
                    <SelectItem value="reviewer">
                      Reviewer
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={usersFilterStatus}
                  onValueChange={setUsersFilterStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      All Status
                    </SelectItem>
                    <SelectItem value="active">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setUsersSortField("name");
                        setUsersSortOrder(
                          usersSortField === "name" &&
                            usersSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      User{" "}
                      {usersSortField === "name" &&
                        (usersSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role & Department</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setUsersSortField("loginCount");
                        setUsersSortOrder(
                          usersSortField === "loginCount" &&
                            usersSortOrder === "asc"
                            ? "desc"
                            : "asc",
                        );
                      }}
                    >
                      Login Count{" "}
                      {usersSortField === "loginCount" &&
                        (usersSortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="w-12">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">
                            {user.email}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="outline">
                            {user.role}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {user.department}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="space-y-1">
                          {user.permissions
                            .slice(0, 2)
                            .map((permission, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs mr-1"
                              >
                                {permission}
                              </Badge>
                            ))}
                          {user.permissions.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{user.permissions.length - 2}{" "}
                              more
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(
                            user.status,
                          )}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {user.loginCount}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="max-w-xs">
                        <div
                          className="truncate text-sm"
                          title={user.lastActivity}
                        >
                          {user.lastActivity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="mr-2 h-4 w-4" />
                              View Activity Log
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className={
                                user.status === "Active"
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              {user.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-muted-foreground">
          View detailed analytics and insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#003A7C"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.speaker}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">
                      {item.views}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Notifications</h2>
        <p className="text-muted-foreground">
          Manage system notifications and alerts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "New sermon uploaded",
                message:
                  "Pastor John uploaded 'Faith in Action'",
                time: "2 hours ago",
                type: "info",
              },
              {
                id: 2,
                title: "User registration",
                message: "25 new users registered today",
                time: "4 hours ago",
                type: "success",
              },
              {
                id: 3,
                title: "Storage warning",
                message: "Storage is 85% full",
                time: "1 day ago",
                type: "warning",
              },
              {
                id: 4,
                title: "Backup completed",
                message: "Weekly backup completed successfully",
                time: "2 days ago",
                type: "success",
              },
              {
                id: 5,
                title: "System update",
                message: "System will be updated tonight",
                time: "3 days ago",
                type: "info",
              },
            ].map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-4 p-4 border rounded-lg"
              >
                <div
                  className={cn(
                    "w-2 h-2 rounded-full mt-2",
                    notification.type === "info" &&
                    "bg-blue-500",
                    notification.type === "success" &&
                    "bg-green-500",
                    notification.type === "warning" &&
                    "bg-yellow-500",
                  )}
                />
                <div className="flex-1">
                  <p className="font-medium">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Configure system settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Site Name
              </label>
              <Input defaultValue="DCLM Media Archive" />
            </div>
            <div>
              <label className="text-sm font-medium">
                Site Description
              </label>
              <Input defaultValue="Church media archive and streaming platform" />
            </div>
            <div>
              <label className="text-sm font-medium">
                Contact Email
              </label>
              <Input defaultValue="admin@dclm.org" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Auto-backup</span>
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Compress uploads</span>
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Max file size (MB)
              </label>
              <Input defaultValue="500" type="number" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "sermons":
        return renderSermons();
      case "series":
        return renderSeries();
      case "categories":
        return renderCategories();
      case "users":
        return renderUsers();
      case "analytics":
        return renderAnalytics();
      case "notifications":
        return renderNotifications();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-full relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border overflow-y-auto z-50 transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'
        } ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        {/* Sidebar Header */}
        <div className={`p-4 border-b border-sidebar-border ${isSidebarCollapsed ? 'px-2' : ''}`}>
          <div className="flex items-center justify-between">
            <div className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                Admin Panel
              </h2>
              <p className="text-sm text-sidebar-foreground/70">
                Church Media Management
              </p>
            </div>

            {/* Collapse/Expand Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex p-2 h-8 w-8"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-2 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`space-y-1 p-2 ${isSidebarCollapsed ? 'px-1' : 'px-4'}`}>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  // Close mobile sidebar when selecting an item
                  if (isMobileSidebarOpen) {
                    setIsMobileSidebarOpen(false);
                  }
                }}
                className={cn(
                  "w-full flex items-center text-sm rounded-lg transition-colors",
                  isSidebarCollapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-2",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                )}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>
                {!isSidebarCollapsed && item.count && (
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {item.count}
                  </Badge>
                )}
                {isSidebarCollapsed && item.count && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Main content */}
      <div className={`flex-1 overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } ml-0`}>
        <div className="p-3 md:p-6 h-full overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}