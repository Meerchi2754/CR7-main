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
                                        {data.map((url, index) => (
                                            <ResourceLink key={index} url={url} index={index} />
                                        ))}
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