import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trash2, Eye } from 'lucide-react';
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />

            <div className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">History</h1>
                        <p className="text-gray-600">View your visited topics</p>
                    </div>

                    {topicViews.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </button>
                    )}
                </div>

                {topicViews.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg mb-2">No topic views yet</p>
                            <p className="text-gray-500 mb-6">Start exploring topics to build your history!</p>
                            <button
                                onClick={() => navigate('/courses')}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Explore Topics
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Topic
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date Visited
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {topicViews.map((view) => (
                                            <tr key={view.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{view.topic}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(view.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleTopicClick(view.topic)}
                                                        className="text-blue-600 hover:text-blue-700 mr-4 inline-flex items-center gap-1"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View Resources
                                                    </button>
                                                    <button
                                                        onClick={() => deleteTopicView(view.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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