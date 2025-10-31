import { useState, useEffect } from 'react';
import { X, Youtube, FileText, Map, BookOpen, ExternalLink, Loader2 } from 'lucide-react';

const CoursesCard = ({ topic, isOpen, onClose }) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('youtube');
    const [selectedLevel, setSelectedLevel] = useState('Beginner');

    useEffect(() => {
        if (isOpen && topic) {
            fetchResourceData();
        }
    }, [isOpen, topic, selectedLevel]);

    const fetchResourceData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/v1/resource/topic/${topic}`);
            const result = await response.json();

            if (result.success && result.data && result.data.length > 0) {
                // Store all resources for this topic
                setResources(result.data);
            } else {
                setResources([]);
            }
        } catch (err) {
            console.error('Error fetching resource data:', err);
            setResources([]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const tabs = [
        { id: 'youtube', label: 'YouTube Playlists', icon: Youtube, key: 'YouTube Playlists' },
        { id: 'docs', label: 'Documentation', icon: FileText, key: 'Documentation' },
        { id: 'roadmaps', label: 'Roadmaps', icon: Map, key: 'Roadmaps' },
        { id: 'courses', label: 'Courses', icon: BookOpen, key: 'Courses' }
    ];

    const getCurrentResource = () => {
        return resources.find(r => r.level === selectedLevel) || null;
    };

    const getResourceData = (key) => {
        const currentResource = getCurrentResource();
        if (!currentResource || !currentResource.subcategories) return [];
        const data = currentResource.subcategories[key];

        if (Array.isArray(data)) return data;
        if (typeof data === 'object') return Object.values(data).flat();
        return [];
    };

    // Extract YouTube playlist or video ID from URL
    const getYouTubeId = (url) => {
        try {
            const urlObj = new URL(url);
            let videoId = null;
            let playlistId = null;
            
            // Check for video ID first
            if (urlObj.hostname.includes('youtube.com')) {
                videoId = urlObj.searchParams.get('v');
                playlistId = urlObj.searchParams.get('list');
            } else if (urlObj.hostname.includes('youtu.be')) {
                videoId = urlObj.pathname.slice(1).split('?')[0];
                playlistId = urlObj.searchParams.get('list');
            }
            
            // Prioritize playlist if both exist, but keep video ID for thumbnail
            if (playlistId) {
                return { type: 'playlist', id: playlistId, videoId: videoId };
            }
            
            if (videoId) {
                return { type: 'video', id: videoId, videoId: videoId };
            }
            
            return null;
        } catch {
            return null;
        }
    };

    const YouTubePlaylistCard = ({ url, index }) => {
        const ytData = getYouTubeId(url);
        const [thumbnailUrl, setThumbnailUrl] = useState(null);
        const [thumbnailError, setThumbnailError] = useState(false);
        
        if (!ytData) {
            return <ResourceLink url={url} index={index} />;
        }

        const { type, id, videoId } = ytData;
        
        // Generate thumbnail URLs with fallbacks
        useEffect(() => {
            if (videoId) {
                // Try high quality first
                setThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
                setThumbnailError(false);
            } else {
                setThumbnailUrl(null);
            }
        }, [videoId]);
        
        const handleThumbnailError = () => {
            // Try fallback qualities: hqdefault -> mqdefault -> default
            if (thumbnailUrl && thumbnailUrl.includes('hqdefault')) {
                setThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
            } else if (thumbnailUrl && thumbnailUrl.includes('mqdefault')) {
                setThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/default.jpg`);
            } else {
                setThumbnailError(true);
            }
        };
        
        const embedUrl = type === 'playlist'
            ? `https://www.youtube.com/embed/videoseries?list=${id}`
            : `https://www.youtube.com/embed/${id}`;

        return (
            <div className="group bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-blue-500/50 rounded-lg transition-all duration-300 overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                    {/* Thumbnail Preview */}
                    <div className="relative flex-shrink-0 w-full sm:w-48 h-32 bg-slate-900 rounded-lg overflow-hidden">
                        {thumbnailUrl && !thumbnailError ? (
                            <>
                                <img
                                    src={thumbnailUrl}
                                    alt="YouTube thumbnail"
                                    className="w-full h-full object-cover"
                                    onError={handleThumbnailError}
                                />
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                                <Youtube className="w-12 h-12 text-slate-600" />
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start gap-2 mb-2">
                                <Youtube className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs font-medium text-red-400 uppercase">
                                    {type === 'playlist' ? 'Playlist' : 'Video'}
                                </span>
                            </div>
                            <p className="text-slate-300 text-sm line-clamp-2 mb-2">
                                YouTube {type === 'playlist' ? 'Playlist' : 'Video'}
                            </p>
                        </div>
                        
                        <div className="flex gap-2">
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Open in YouTube
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const DocumentationCard = ({ url, index }) => {
        const getDomain = (urlString) => {
            try {
                const urlObj = new URL(urlString);
                return urlObj.hostname.replace('www.', '');
            } catch {
                return 'Documentation';
            }
        };

        const domain = getDomain(url);
        const isOfficial = domain.includes('docs.') || domain.includes('developer.') || domain.includes('guide');

        return (
            <div className="group bg-gradient-to-br from-slate-800/40 to-slate-800/20 hover:from-slate-700/50 hover:to-slate-700/30 border border-slate-700/50 hover:border-purple-500/50 rounded-lg transition-all duration-300 overflow-hidden">
                <div className="p-5">
                    <div className="flex items-start gap-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                {isOfficial && (
                                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
                                        Official
                                    </span>
                                )}
                                <span className="text-xs text-slate-500">{domain}</span>
                            </div>
                            <p className="text-slate-300 text-sm mb-3 line-clamp-1 break-all group-hover:text-purple-300 transition-colors">
                                {url}
                            </p>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                                <FileText className="w-3.5 h-3.5" />
                                Read Documentation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const RoadmapCard = ({ url, index }) => {
        const getDomain = (urlString) => {
            try {
                const urlObj = new URL(urlString);
                return urlObj.hostname.replace('www.', '');
            } catch {
                return 'Roadmap';
            }
        };

        const domain = getDomain(url);
        const isRoadmapSh = domain.includes('roadmap.sh');

        return (
            <div className="group bg-gradient-to-br from-emerald-900/20 to-slate-800/20 hover:from-emerald-800/30 hover:to-slate-700/30 border border-slate-700/50 hover:border-emerald-500/50 rounded-lg transition-all duration-300 overflow-hidden">
                <div className="p-5">
                    <div className="flex items-start gap-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Map className="w-6 h-6 text-emerald-400" />
                            </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                {isRoadmapSh && (
                                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-medium rounded-full">
                                        roadmap.sh
                                    </span>
                                )}
                                <span className="text-xs text-slate-500">{domain}</span>
                            </div>
                            <h3 className="text-slate-200 font-medium text-sm mb-1">Learning Roadmap</h3>
                            <p className="text-slate-400 text-xs mb-3 line-clamp-1 break-all">
                                {url}
                            </p>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                                <Map className="w-3.5 h-3.5" />
                                View Roadmap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const CourseCard = ({ url, index }) => {
        const getPlatform = (urlString) => {
            try {
                const urlObj = new URL(urlString);
                const domain = urlObj.hostname.toLowerCase();
                
                if (domain.includes('udemy')) return { name: 'Udemy', color: 'purple' };
                if (domain.includes('coursera')) return { name: 'Coursera', color: 'blue' };
                if (domain.includes('udacity')) return { name: 'Udacity', color: 'cyan' };
                if (domain.includes('edx')) return { name: 'edX', color: 'red' };
                if (domain.includes('pluralsight')) return { name: 'Pluralsight', color: 'pink' };
                if (domain.includes('linkedin')) return { name: 'LinkedIn Learning', color: 'blue' };
                if (domain.includes('freecodecamp')) return { name: 'freeCodeCamp', color: 'green' };
                if (domain.includes('codecademy')) return { name: 'Codecademy', color: 'indigo' };
                
                return { name: domain.replace('www.', ''), color: 'slate' };
            } catch {
                return { name: 'Course', color: 'slate' };
            }
        };

        const platform = getPlatform(url);
        const colorClasses = {
            purple: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/50 bg-purple-600/80 hover:bg-purple-600',
            blue: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/50 bg-blue-600/80 hover:bg-blue-600',
            cyan: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/50 bg-cyan-600/80 hover:bg-cyan-600',
            red: 'from-red-500/20 to-orange-500/20 text-red-400 border-red-500/50 bg-red-600/80 hover:bg-red-600',
            pink: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/50 bg-pink-600/80 hover:bg-pink-600',
            green: 'from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/50 bg-green-600/80 hover:bg-green-600',
            indigo: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/50 bg-indigo-600/80 hover:bg-indigo-600',
            slate: 'from-slate-500/20 to-slate-600/20 text-slate-400 border-slate-500/50 bg-slate-600/80 hover:bg-slate-600'
        };

        const colors = colorClasses[platform.color] || colorClasses.slate;
        const [gradientColors, iconColor, borderColor, buttonColors] = colors.split(' ');

        return (
            <div className={`group bg-gradient-to-br from-slate-800/40 to-slate-800/20 hover:from-slate-700/50 hover:to-slate-700/30 border border-slate-700/50 hover:${borderColor} rounded-lg transition-all duration-300 overflow-hidden`}>
                <div className="p-5">
                    <div className="flex items-start gap-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                            <div className={`w-12 h-12 bg-gradient-to-br ${gradientColors} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <BookOpen className={`w-6 h-6 ${iconColor}`} />
                            </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 bg-gradient-to-r ${gradientColors} ${iconColor} text-xs font-medium rounded-full`}>
                                    {platform.name}
                                </span>
                            </div>
                            <h3 className="text-slate-200 font-medium text-sm mb-1">Online Course</h3>
                            <p className="text-slate-400 text-xs mb-3 line-clamp-1 break-all">
                                {url}
                            </p>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-4 py-2 ${buttonColors} text-white text-xs font-medium rounded-lg transition-colors`}
                            >
                                <BookOpen className="w-3.5 h-3.5" />
                                View Course
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ResourceLink = ({ url, index }) => (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-blue-500/50 rounded-lg transition-all duration-300"
        >
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm group-hover:text-blue-400 transition-colors break-all">
                    {url}
                </p>
            </div>
        </a>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col animate-slideUp">
                {/* Header */}
                <div className="relative px-6 py-5 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                {topic}
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">Learning Resources & Materials</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-slate-400 group-hover:text-slate-200" />
                        </button>
                    </div>

                    {/* Level Selection */}
                    <div className="flex gap-2 mt-4">
                        {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                                    selectedLevel === level
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                            <p className="text-slate-400">Loading resources...</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tabs.map((tab) => {
                                if (tab.id !== activeTab) return null;

                                const data = getResourceData(tab.key);

                                if (data.length === 0) {
                                    return (
                                        <div key={tab.id} className="text-center py-12">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                                                <tab.icon className="w-8 h-8 text-slate-600" />
                                            </div>
                                            <p className="text-slate-500">No {tab.label.toLowerCase()} available</p>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={tab.id}>
                                        {data.map((url, index) => {
                                            // Render appropriate card based on tab type
                                            if (tab.id === 'youtube') {
                                                return <YouTubePlaylistCard key={index} url={url} index={index} />;
                                            } else if (tab.id === 'docs') {
                                                return <DocumentationCard key={index} url={url} index={index} />;
                                            } else if (tab.id === 'roadmaps') {
                                                return <RoadmapCard key={index} url={url} index={index} />;
                                            } else if (tab.id === 'courses') {
                                                return <CourseCard key={index} url={url} index={index} />;
                                            } else {
                                                return <ResourceLink key={index} url={url} index={index} />;
                                            }
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <p className="text-slate-500 text-sm">
                            {!loading && getCurrentResource() && (
                                <>Total: {getResourceData(tabs.find(t => t.id === activeTab)?.key || '').length} resources</>
                            )}
                        </p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors text-sm font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default CoursesCard;