import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, Brain, Award, Search, Star, Clock, ExternalLink, X, TrendingUp, Target, Zap } from "lucide-react";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import CoursesCard from "../components/CoursesCard";

// Sample courses data
const courses = [
    {
        id: 1,
        title: "Complete React Developer Course",
        provider: "Udemy",
        topic: "React",
        level: "intermediate",
        rating: 4.8,
        duration: "40 hours",
        price: "$89.99",
        description: "Master React by building real-world projects",
        skills: ["React", "JavaScript", "Hooks", "Redux"],
        url: "https://www.udemy.com"
    },
    {
        id: 2,
        title: "Python for Data Science",
        provider: "Coursera",
        topic: "Python",
        level: "beginner",
        rating: 4.7,
        duration: "30 hours",
        price: "Free",
        description: "Learn Python fundamentals and data analysis",
        skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
        url: "https://www.coursera.org"
    },
    {
        id: 3,
        title: "Advanced JavaScript Concepts",
        provider: "Frontend Masters",
        topic: "JavaScript",
        level: "expert",
        rating: 4.9,
        duration: "15 hours",
        price: "$39/month",
        description: "Deep dive into advanced JavaScript patterns",
        skills: ["JavaScript", "Closures", "Prototypes", "Async"],
        url: "https://frontendmasters.com"
    },
    {
        id: 4,
        title: "Machine Learning Fundamentals",
        provider: "Coursera",
        topic: "Machine Learning",
        level: "intermediate",
        rating: 4.6,
        duration: "45 hours",
        price: "$49.99",
        description: "Introduction to ML algorithms and applications",
        skills: ["Python", "ML", "TensorFlow", "Neural Networks"],
        url: "https://www.coursera.org"
    },
    {
        id: 5,
        title: "Web Development Bootcamp",
        provider: "Udemy",
        topic: "Web Development",
        level: "beginner",
        rating: 4.7,
        duration: "60 hours",
        price: "$79.99",
        description: "Complete web development from scratch",
        skills: ["HTML", "CSS", "JavaScript", "Node.js"],
        url: "https://www.udemy.com"
    },
    {
        id: 6,
        title: "Data Structures & Algorithms",
        provider: "Coursera",
        topic: "Algorithms",
        level: "intermediate",
        rating: 4.8,
        duration: "35 hours",
        price: "$59.99",
        description: "Master DSA for coding interviews",
        skills: ["Algorithms", "Data Structures", "Problem Solving"],
        url: "https://www.coursera.org"
    }
];

// Sample test questions
const sampleQuestions = [
    {
        topic: "React",
        question: "What is JSX in React?",
        options: [
            "A JavaScript library",
            "A syntax extension for JavaScript",
            "A CSS framework",
            "A database query language"
        ],
        correctAnswer: 1
    },
    {
        topic: "JavaScript",
        question: "What does 'const' keyword do in JavaScript?",
        options: [
            "Creates a variable that can be reassigned",
            "Creates a constant that cannot be reassigned",
            "Creates a function",
            "Creates an object"
        ],
        correctAnswer: 1
    },
    {
        topic: "Python",
        question: "Which of these is used to define a function in Python?",
        options: [
            "function",
            "def",
            "func",
            "define"
        ],
        correctAnswer: 1
    },
    {
        topic: "Programming",
        question: "What is an algorithm?",
        options: [
            "A programming language",
            "A step-by-step procedure to solve a problem",
            "A type of database",
            "A web framework"
        ],
        correctAnswer: 1
    },
    {
        topic: "Web Development",
        question: "What does HTML stand for?",
        options: [
            "High Tech Modern Language",
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlink and Text Markup Language"
        ],
        correctAnswer: 1
    }
];

// Animated Background Component
const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-blue-500/10 blur-3xl animate-float"
                    style={{
                        width: `${Math.random() * 400 + 200}px`,
                        height: `${Math.random() * 400 + 200}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${Math.random() * 20 + 20}s`
                    }}
                />
            ))}
        </div>
        <style>{`
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -30px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      .animate-float {
        animation: float linear infinite;
      }
    `}</style>
    </div>
);

// Course Card Component
const CourseCard = ({ course }) => {
    const getLevelColor = (level) => {
        switch (level) {
            case 'beginner':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'intermediate':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'expert':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex justify-between items-start gap-2 mb-3">
                <h3 className="text-lg font-semibold text-white leading-tight">{course.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getLevelColor(course.level)}`}>
                    {course.level}
                </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                <span className="font-medium">{course.provider}</span>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                </div>
            </div>

            <p className="text-sm text-slate-300 mb-4 line-clamp-2">{course.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
                {course.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{course.duration}</span>
                </div>
                <div className="font-semibold text-blue-400">{course.price}</div>
            </div>

            <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
            >
                <ExternalLink className="w-4 h-4" />
                View Course
            </a>
        </div>
    );
};

// Skill Test Component
const SkillTest = ({ onTestComplete, onClose, topic }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);

    const [selectedQuestions] = useState(() => {
        const topicKeywords = topic.toLowerCase().split(" ");
        const relevantQuestions = sampleQuestions.filter((question) =>
            topicKeywords.some(
                (keyword) =>
                    question.topic.toLowerCase().includes(keyword) ||
                    question.question.toLowerCase().includes(keyword)
            )
        );

        const questionsToUse = relevantQuestions.length >= 3 ? relevantQuestions : sampleQuestions;
        return [...questionsToUse].sort(() => 0.5 - Math.random()).slice(0, 3);
    });

    const handleNextQuestion = () => {
        if (selectedAnswer === "") return;

        const answers = [...selectedAnswers];
        answers[currentQuestion] = parseInt(selectedAnswer);
        setSelectedAnswers(answers);
        setSelectedAnswer("");

        if (currentQuestion < selectedQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateResult(answers);
        }
    };

    const calculateResult = (answers) => {
        let score = 0;
        selectedQuestions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) score++;
        });

        const percentage = score / selectedQuestions.length;
        let recommendedLevel;
        if (percentage <= 0.4) recommendedLevel = "beginner";
        else if (percentage <= 0.7) recommendedLevel = "intermediate";
        else recommendedLevel = "expert";

        const result = {
            score,
            totalQuestions: selectedQuestions.length,
            recommendedLevel,
            recommendedTopics: [topic]
        };

        setShowResult(true);
        onTestComplete(result);
    };

    const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
    const finalScore = selectedAnswers.filter(
        (answer, index) => answer === selectedQuestions[index]?.correctAnswer
    ).length;

    if (showResult) {
        return (
            <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-700 rounded-lg shadow-2xl">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
                            <Award className="w-6 h-6 text-blue-400" />
                            Test Complete!
                        </h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6 text-center">
                        <div className="text-6xl font-bold text-blue-400">
                            {finalScore}/{selectedQuestions.length}
                        </div>
                        <p className="text-lg text-slate-300">
                            Based on your results, we recommend{" "}
                            <strong className="text-white">
                                {finalScore <= Math.floor(selectedQuestions.length * 0.4)
                                    ? "beginner"
                                    : finalScore <= Math.floor(selectedQuestions.length * 0.7)
                                        ? "intermediate"
                                        : "expert"}
                            </strong>{" "}
                            level courses.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                        >
                            Find Courses
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-700 rounded-lg shadow-2xl">
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        Skill Assessment Test
                    </h3>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">
                            Question {currentQuestion + 1} of {selectedQuestions.length}
                        </span>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="w-full h-2 bg-slate-700 rounded-full mb-6">
                    <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">
                            {selectedQuestions[currentQuestion].question}
                        </h3>
                        <div className="space-y-3">
                            {selectedQuestions[currentQuestion].options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 transition-colors ${selectedAnswer === index.toString()
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion}`}
                                        value={index}
                                        checked={selectedAnswer === index.toString()}
                                        onChange={() => setSelectedAnswer(index.toString())}
                                        className="w-4 h-4 text-blue-500"
                                    />
                                    <span className="text-slate-200 flex-1">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end pt-4 border-t border-slate-700">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-600 text-slate-300 rounded-md hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === ""}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {currentQuestion === selectedQuestions.length - 1 ? "Finish Test" : "Next Question"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all">
        <div className={`inline-flex p-3 rounded-lg mb-4 ${color}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className="text-slate-400">{title}</div>
    </div>
);

// Main Home Component
const Home = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({ topic: '', level: 'all' });
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [showTest, setShowTest] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [userName, setUserName] = useState('');
    const [topicExists, setTopicExists] = useState(false);
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('userName');

        if (!token) {
            navigate('/login');
            return;
        }

        if (user) {
            setUserName(user);
        }
    }, [navigate]);

    const handleSearch = async () => {
        try {
            // Check if topic exists in database
            const response = await fetch('http://localhost:3000/api/v1/resource/topics');
            const result = await response.json();

            if (result.success && result.data) {
                const topicMatch = result.data.find(
                    topic => topic.toLowerCase() === filters.topic.toLowerCase().trim()
                );

                if (topicMatch) {
                    // Topic exists - show resources modal
                    setTopicExists(true);
                    setSelectedTopic(topicMatch);
                    setShowResourceModal(true);
                    setHasSearched(true);
                    setSearchResults([]);

                    // Save to history
                    const userEmail = localStorage.getItem('userEmail');
                    if (userEmail) {
                        await fetch('http://localhost:3000/api/v1/history/addhistory', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: userEmail,
                                topic: topicMatch
                            })
                        });
                    }
                } else {
                    // Topic not found in database
                    setTopicExists(false);
                    setSearchResults([]);
                    setHasSearched(true);
                }
            }
        } catch (error) {
            console.error('Error searching for topic:', error);
            setTopicExists(false);
            setSearchResults([]);
            setHasSearched(true);
        }
    };

    const handleTestComplete = (result) => {
        setTestResult(result);
        const newFilters = {
            topic: result.recommendedTopics[0] || '',
            level: result.recommendedLevel
        };
        setFilters(newFilters);

        const filteredCourses = courses.filter(course => {
            const topicMatch = course.topic.toLowerCase().includes(newFilters.topic.toLowerCase());
            const levelMatch = course.level === newFilters.level;
            return topicMatch && levelMatch;
        });

        setSearchResults(filteredCourses);
        setHasSearched(true);
    };

    return (
        <div className="min-h-screen flex flex-col text-white">
            <AnimatedBackground />
            <Navigation />

            {/* Hero Section */}
            <div className="py-12 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="flex items-center justify-center gap-2 text-blue-400 mb-4">
                        <GraduationCap className="w-8 h-8" />
                        <BookOpen className="w-8 h-8" />
                    </div>

                    {userName && (
                        <h2 className="text-2xl font-semibold text-slate-300">
                            Welcome back, <span className="text-blue-400">{userName}</span>!
                        </h2>
                    )}

                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Personalized Learning Journey
                    </h1>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Discover the perfect courses tailored to your goals. Search by topic and skill level to get personalized recommendations.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="px-4 pb-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard icon={BookOpen} title="Available Courses" value="1000+" color="bg-blue-500/10 text-blue-400" />
                        <StatsCard icon={TrendingUp} title="Learning Paths" value="50+" color="bg-green-500/10 text-green-400" />
                        <StatsCard icon={Award} title="Certifications" value="200+" color="bg-purple-500/10 text-purple-400" />
                    </div>
                </div>
            </div>

            {/* Skill Test Modal */}
            {showTest && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <SkillTest
                        onTestComplete={handleTestComplete}
                        onClose={() => setShowTest(false)}
                        topic={filters.topic}
                    />
                </div>
            )}

            {/* Search Section */}
            <div className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {testResult && (
                        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-blue-400 mb-2">
                                <Award className="w-5 h-5" />
                                <span className="font-semibold">Test Results Applied</span>
                            </div>
                            <p className="text-sm text-slate-300">
                                Based on your test score ({testResult.score}/{testResult.totalQuestions}), we've set your level to{" "}
                                <strong className="text-white">{testResult.recommendedLevel}</strong>.
                            </p>
                        </div>
                    )}

                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        What do you want to learn?
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.topic}
                                        onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="e.g., React, Python, Machine Learning"
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Your skill level
                                    </label>
                                    <select
                                        value={filters.level}
                                        onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    >
                                        <option value="all">All levels</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center pt-2">
                                <button
                                    onClick={handleSearch}
                                    disabled={!filters.topic.trim()}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
                                >
                                    <Search className="w-4 h-4" />
                                    Find Courses
                                </button>
                            </div>
                        </div>
                    </div>

                    {filters.topic && (
                        <div className="mt-6 p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 text-blue-400 mb-3">
                                <Brain className="w-6 h-6" />
                                <Award className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-semibold mb-3 text-center">
                                Test your knowledge in {filters.topic}
                            </h2>
                            <p className="text-slate-300 mb-4 text-center">
                                Take a quick assessment test to evaluate your current skill level and get better course recommendations.
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setShowTest(true)}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md transition-colors font-semibold flex items-center gap-2"
                                >
                                    <Brain className="w-4 h-4" />
                                    Take {filters.topic} Test
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Section - Courses Not Found */}
            {hasSearched && !topicExists && (
                <div className="pb-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8 text-center">
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
                                    <Search className="w-8 h-8 text-red-400" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2 text-red-400">
                                    Courses Not Found
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    We couldn't find any resources for "{filters.topic}". Try searching for a different topic.
                                </p>
                                <button
                                    onClick={() => {
                                        setFilters({ topic: '', level: 'all' });
                                        setHasSearched(false);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition-colors font-medium"
                                >
                                    Try Another Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CoursesCard Modal */}
            <CoursesCard
                topic={selectedTopic}
                isOpen={showResourceModal}
                onClose={() => setShowResourceModal(false)}
            />

            <Footer />
        </div>
    );
};

export default Home;