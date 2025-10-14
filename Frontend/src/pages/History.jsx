import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trash2, Eye, Calendar, Sparkles } from 'lucide-react';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import CoursesCard from '../components/CoursesCard';

const History = () => {
    const navigate = useNavigate();
    const [topicViews, setTopicViews] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistoryFromDatabase();
    }, []);

    const fetchHistoryFromDatabase = async () => {
        try {
            setLoading(true);
            const userEmail = localStorage.getItem('userEmail');
            
            if (!userEmail) {
                console.warn('User email not found. Loading from session storage only.');
                const topicHistory = JSON.parse(sessionStorage.getItem('topicHistory') || '[]');
                setTopicViews(topicHistory);
                setLoading(false);
                return;
            }

            const response = await fetch(`http://localhost:3000/api/v1/history/user/${userEmail}`);
            const result = await response.json();

            if (result.success && result.data) {
                // Transform database data to match the UI format
                const formattedHistory = result.data.map(item => ({
                    id: item._id,
                    topic: item.topic,
                    date: item.createdAt,
                    type: 'topic_view'
                }));
                setTopicViews(formattedHistory);
            } else {
                // Fallback to session storage
                const topicHistory = JSON.parse(sessionStorage.getItem('topicHistory') || '[]');
                setTopicViews(topicHistory);
            }
        } catch (error) {
            console.error('Error fetching history from database:', error);
            // Fallback to session storage
            const topicHistory = JSON.parse(sessionStorage.getItem('topicHistory') || '[]');
            setTopicViews(topicHistory);
        } finally {
            setLoading(false);
        }
    };

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear all topic view history?')) {
            sessionStorage.removeItem('topicHistory');
            setTopicViews([]);
        }
    };

    const deleteTopicView = async (id) => {
        try {
            // Delete from database if it's a MongoDB ID
            if (typeof id === 'string' && id.length === 24) {
                await fetch(`http://localhost:3000/api/v1/history/${id}`, {
                    method: 'DELETE'
                });
            }
            
            // Also remove from local state
            const updatedHistory = topicViews.filter(view => view.id !== id);
            sessionStorage.setItem('topicHistory', JSON.stringify(updatedHistory));
            setTopicViews(updatedHistory);
        } catch (error) {
            console.error('Error deleting history:', error);
        }
    };

    const handleTopicClick = (topicName) => {
        setSelectedTopic(topicName);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedTopic(null), 300);
    };


    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col">
            <Navigation />

            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0F172A]">
                <div className="absolute inset-0">
                    <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] opacity-15 -top-[10%] -left-[10%] animate-pulse" />
                    <div className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-[100px] opacity-15 -bottom-[15%] -right-[15%] animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
            </div>

            <div className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full relative z-10">
                {/* Header Section */}
                <motion.div 
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="w-8 h-8 text-blue-500" />
                            <h1 className="text-4xl font-bold text-[#E2E8F0]">Learning History</h1>
                        </div>
                        <p className="text-slate-400">Track your learning journey and revisit topics</p>
                    </div>

                    {topicViews.length > 0 && (
                        <motion.button
                            onClick={clearHistory}
                            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-red-500/30"
                            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </motion.button>
                    )}
                </motion.div>

                {topicViews.length === 0 ? (
                        <motion.div 
                            className="text-center py-20 bg-[#1E293B] border border-[#475569] rounded-xl shadow-xl"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <BookOpen className="w-20 h-20 text-slate-600 mx-auto mb-6" />
                            <h3 className="text-2xl font-semibold text-[#E2E8F0] mb-3">No Learning History Yet</h3>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">Start exploring topics to build your personalized learning journey!</p>
                            <motion.button
                                onClick={() => navigate('/home')}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30"
                                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Topics
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="bg-[#1E293B] border border-[#475569] rounded-xl shadow-xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#0F172A] border-b border-[#475569]">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                Topic
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    Date Visited
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#475569]">
                                        {topicViews.map((view, index) => (
                                            <motion.tr 
                                                key={view.id} 
                                                className="hover:bg-[#334155] transition-colors"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-blue-400" />
                                                        <span className="font-semibold text-[#E2E8F0]">{view.topic}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                                    {new Date(view.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <motion.button
                                                        onClick={() => handleTopicClick(view.topic)}
                                                        className="text-blue-400 hover:text-blue-300 mr-4 inline-flex items-center gap-1 transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View Resources
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => deleteTopicView(view.id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )
                }
            </div>

            <Footer />

            {/* Modal for viewing topic resources */}
            <CoursesCard
                topic={selectedTopic}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default History;