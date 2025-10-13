import { useState } from "react";
import { BookOpen, Award, X } from "lucide-react";

// Sample test questions - replace with your actual testQuestions import
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

export const SkillTest = ({ onTestComplete, onClose, topic }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);

    // Select 5 relevant questions
    const [selectedQuestions] = useState(() => {
        const topicKeywords = topic.toLowerCase().split(" ");
        const relevantQuestions = sampleQuestions.filter((question) =>
            topicKeywords.some(
                (keyword) =>
                    question.topic.toLowerCase().includes(keyword) ||
                    question.question.toLowerCase().includes(keyword)
            )
        );

        const questionsToUse =
            relevantQuestions.length >= 3 ? relevantQuestions : sampleQuestions;
        const shuffled = [...questionsToUse].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(5, shuffled.length));
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
        const topicCounts = {};

        selectedQuestions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
            topicCounts[question.topic] = (topicCounts[question.topic] || 0) + 1;
        });

        const recommendedTopics = Object.keys(topicCounts)
            .sort((a, b) => topicCounts[b] - topicCounts[a])
            .slice(0, 3);

        let recommendedLevel;
        const percentage = score / selectedQuestions.length;
        if (percentage <= 0.4) recommendedLevel = "beginner";
        else if (percentage <= 0.7) recommendedLevel = "intermediate";
        else recommendedLevel = "expert";

        const result = {
            score,
            totalQuestions: selectedQuestions.length,
            recommendedLevel,
            recommendedTopics: recommendedTopics.length > 0 ? recommendedTopics : [topic],
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
            <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-xl">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
                            <Award className="w-6 h-6 text-blue-600" />
                            Test Complete!
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6 text-center">
                        <div className="text-6xl font-bold text-blue-600">
                            {finalScore}/{selectedQuestions.length}
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Based on your results, we recommend{" "}
                            <strong className="text-foreground">
                                {finalScore <= Math.floor(selectedQuestions.length * 0.4)
                                    ? "beginner"
                                    : finalScore <= Math.floor(selectedQuestions.length * 0.7)
                                        ? "intermediate"
                                        : "expert"}
                            </strong>{" "}
                            level courses.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Find Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedQuestions.length === 0) {
        return (
            <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-xl p-6">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">No questions available for this topic.</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-xl">
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        Skill Assessment Test
                    </h3>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            Question {currentQuestion + 1} of {selectedQuestions.length}
                        </span>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="w-full h-2 bg-muted rounded-full mb-6">
                    <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">
                            {selectedQuestions[currentQuestion].question}
                        </h3>
                        <div className="space-y-3">
                            {selectedQuestions[currentQuestion].options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 transition-colors ${selectedAnswer === index.toString()
                                            ? 'border-blue-500 bg-blue-950/30'
                                            : 'border-border hover:border-muted-foreground hover:bg-accent'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion}`}
                                        value={index}
                                        checked={selectedAnswer === index.toString()}
                                        onChange={() => setSelectedAnswer(index.toString())}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-foreground flex-1">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end pt-4 border-t">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === ""}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {currentQuestion === selectedQuestions.length - 1
                                ? "Finish Test"
                                : "Next Question"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillTest;
