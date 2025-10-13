import { useState, useEffect } from 'react';
import { BookmarkPlus } from 'lucide-react';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import CoursesCard from '../components/CoursesCard';

const Courses = () => {
    const [learningPaths, setLearningPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/v1/resource/topics');
            const result = await response.json();

            if (result.success) {
                const paths = result.data.map(topic => ({
                    name: topic,
                    path: `/roadmap/${topic.toLowerCase().replace(/\s+/g, '-')}`
                }));
                setLearningPaths(paths);
            } else {
                setError('Failed to fetch topics');
            }
        } catch (err) {
            console.error('Error fetching topics:', err);
            setError('Error loading topics');
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (e, topicName) => {
        e.preventDefault();
        setSelectedTopic(topicName);
        setIsModalOpen(true);
        
        // Save to history (both local and database)
        saveToHistory(topicName);
        saveToDatabase(topicName);
    };

    const saveToHistory = (topicName) => {
        const history = JSON.parse(sessionStorage.getItem('topicHistory') || '[]');
        
        const newEntry = {
            id: Date.now(),
            topic: topicName,
            date: new Date().toISOString(),
            type: 'topic_view'
        };
        
        // Add to beginning of array (most recent first)
        const updatedHistory = [newEntry, ...history];
        
        // Keep only last 50 entries to avoid storage issues
        const limitedHistory = updatedHistory.slice(0, 50);
        
        sessionStorage.setItem('topicHistory', JSON.stringify(limitedHistory));
    };

    const saveToDatabase = async (topicName) => {
        try {
            // Get user email from localStorage (assuming it's stored during login)
            const userEmail = localStorage.getItem('userEmail');
            
            if (!userEmail) {
                console.warn('User email not found. History not saved to database.');
                return;
            }

            const response = await fetch('http://localhost:3000/api/v1/history/addhistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    topic: topicName
                })
            });

            const result = await response.json();
            
            if (!result.success) {
                console.error('Failed to save history to database:', result.message);
            }
        } catch (error) {
            console.error('Error saving history to database:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedTopic(null), 300);
    };

    const RoadmapCard = ({ name, path }) => (
        <div
            onClick={(e) => handleCardClick(e, name)}
            className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-blue-500/50 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <span className="text-slate-200 font-medium group-hover:text-blue-400 transition-colors">
                    {name}
                </span>
                <BookmarkPlus className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col">
            <Navigation />

            <div className="flex-grow px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                            Available Resources
                        </h1>
                        <p className="text-slate-300 text-lg">
                            Explore curated learning paths and resources for your development journey
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-16">
                            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-slate-400">Loading resources...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-16">
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                                <p className="text-red-400">{error}</p>
                                <button
                                    onClick={fetchTopics}
                                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Roadmaps Grid */}
                    {!loading && !error && learningPaths.length > 0 && (
                        <div>
                            <div className="mb-6 text-center">
                                <p className="text-slate-400">
                                    {learningPaths.length} learning path{learningPaths.length !== 1 ? 's' : ''} available
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {learningPaths.map((roadmap, index) => (
                                    <RoadmapCard key={index} name={roadmap.name} path={roadmap.path} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && learningPaths.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-slate-400 text-lg">No learning paths available yet.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            {/* Modal */}
            <CoursesCard
                topic={selectedTopic}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Courses;