export const testQuestions = [
  // Java Questions
  {
    id: "java-1",
    question: "What is the main method signature in Java?",
    options: [
      "public static void main(String[] args)",
      "public void main(String args)",
      "static main(String[] args)",
      "public main(String[] args)"
    ],
    correctAnswer: 0,
    topic: "java",
    level: "beginner"
  },
  {
    id: "java-2",
    question: "Which of these is NOT a Java primitive data type?",
    options: ["int", "String", "boolean", "double"],
    correctAnswer: 1,
    topic: "java",
    level: "beginner"
  },
  {
    id: "java-3",
    question: "What does JVM stand for?",
    options: [
      "Java Virtual Machine",
      "Java Variable Method",
      "Java Version Manager",
      "Java Visual Monitor"
    ],
    correctAnswer: 0,
    topic: "java",
    level: "intermediate"
  },
  {
    id: "java-4",
    question: "Which keyword is used for inheritance in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correctAnswer: 1,
    topic: "java",
    level: "intermediate"
  },
  {
    id: "java-5",
    question: "What is encapsulation in Java?",
    options: [
      "Hiding implementation details",
      "Creating multiple classes",
      "Using loops",
      "Declaring variables"
    ],
    correctAnswer: 0,
    topic: "java",
    level: "expert"
  },

  // Python Questions
  {
    id: "python-1",
    question: "In Python, what does 'def' keyword do?",
    options: [
      "Defines a variable",
      "Defines a function", 
      "Defines a class",
      "Defines a loop"
    ],
    correctAnswer: 1,
    topic: "python",
    level: "beginner"
  },
  {
    id: "python-2",
    question: "Which of these is the correct way to create a list in Python?",
    options: [
      "list = {1, 2, 3}",
      "list = [1, 2, 3]",
      "list = (1, 2, 3)",
      "list = <1, 2, 3>"
    ],
    correctAnswer: 1,
    topic: "python",
    level: "beginner"
  },
  {
    id: "python-3",
    question: "What is the output of print(type([]))?",
    options: [
      "<class 'dict'>",
      "<class 'list'>",
      "<class 'tuple'>",
      "<class 'set'>"
    ],
    correctAnswer: 1,
    topic: "python",
    level: "intermediate"
  },
  {
    id: "python-4",
    question: "Which method is used to add an element to a Python list?",
    options: ["add()", "append()", "insert()", "push()"],
    correctAnswer: 1,
    topic: "python",
    level: "intermediate"
  },
  {
    id: "python-5",
    question: "What is a Python decorator?",
    options: [
      "A function that modifies another function",
      "A way to format strings",
      "A type of loop",
      "A data structure"
    ],
    correctAnswer: 0,
    topic: "python",
    level: "expert"
  },

  // JavaScript Questions
  {
    id: "javascript-1",
    question: "Which of these is a JavaScript framework?",
    options: ["React", "HTML", "CSS", "Python"],
    correctAnswer: 0,
    topic: "javascript",
    level: "intermediate"
  },
  {
    id: "javascript-2",
    question: "How do you declare a variable in JavaScript?",
    options: ["var x = 5", "variable x = 5", "v x = 5", "declare x = 5"],
    correctAnswer: 0,
    topic: "javascript",
    level: "beginner"
  },
  {
    id: "javascript-3",
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: [
      "No difference",
      "=== checks type and value, == only checks value",
      "== checks type and value, === only checks value",
      "Both are deprecated"
    ],
    correctAnswer: 1,
    topic: "javascript",
    level: "intermediate"
  },
  {
    id: "javascript-4",
    question: "What is a closure in JavaScript?",
    options: [
      "A way to end a function",
      "A function that has access to outer function's variables",
      "A type of loop",
      "A syntax error"
    ],
    correctAnswer: 1,
    topic: "javascript",
    level: "expert"
  },
  {
    id: "javascript-5",
    question: "Which method is used to add elements to the end of an array?",
    options: ["push()", "add()", "append()", "insert()"],
    correctAnswer: 0,
    topic: "javascript",
    level: "beginner"
  },

  // React Questions
  {
    id: "react-1",
    question: "What is React's virtual DOM?",
    options: [
      "A real DOM element",
      "A lightweight copy of the real DOM in memory",
      "A CSS framework",
      "A database"
    ],
    correctAnswer: 1,
    topic: "react",
    level: "intermediate"
  },
  {
    id: "react-2",
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
    topic: "react",
    level: "beginner"
  },
  {
    id: "react-3",
    question: "What is JSX?",
    options: [
      "A new programming language",
      "JavaScript XML - syntax extension",
      "A CSS preprocessor",
      "A database query language"
    ],
    correctAnswer: 1,
    topic: "react",
    level: "beginner"
  },
  {
    id: "react-4",
    question: "When does useEffect run?",
    options: [
      "Only on component mount",
      "After every render by default",
      "Only on component unmount",
      "Never automatically"
    ],
    correctAnswer: 1,
    topic: "react",
    level: "intermediate"
  },
  {
    id: "react-5",
    question: "What is the purpose of React keys?",
    options: [
      "To style components",
      "To help React identify which items have changed",
      "To create animations",
      "To handle events"
    ],
    correctAnswer: 1,
    topic: "react",
    level: "expert"
  },

  // Machine Learning Questions
  {
    id: "ml-1",
    question: "What is machine learning?",
    options: [
      "A type of computer hardware",
      "A subset of AI that learns from data",
      "A programming language",
      "A database system"
    ],
    correctAnswer: 1,
    topic: "machine learning",
    level: "beginner"
  },
  {
    id: "ml-2",
    question: "What is a neural network?",
    options: [
      "A computer network",
      "A computing system inspired by biological neural networks",
      "A type of database",
      "A programming paradigm"
    ],
    correctAnswer: 1,
    topic: "machine learning",
    level: "intermediate"
  },
  {
    id: "ml-3",
    question: "What is supervised learning?",
    options: [
      "Learning with labeled training data",
      "Learning without any data",
      "Learning while being watched",
      "Learning from unlabeled data"
    ],
    correctAnswer: 0,
    topic: "machine learning",
    level: "beginner"
  },
  {
    id: "ml-4",
    question: "What is overfitting in machine learning?",
    options: [
      "Model performs well on training but poorly on new data",
      "Model is too simple",
      "Model has too few parameters",
      "Model trains too slowly"
    ],
    correctAnswer: 0,
    topic: "machine learning",
    level: "intermediate"
  },
  {
    id: "ml-5",
    question: "What is the purpose of cross-validation?",
    options: [
      "To increase training speed",
      "To evaluate model performance on unseen data",
      "To reduce model complexity",
      "To add more features"
    ],
    correctAnswer: 1,
    topic: "machine learning",
    level: "expert"
  },

  // Data Science Questions
  {
    id: "ds-1",
    question: "What is data science?",
    options: [
      "A type of computer science",
      "Extracting insights from data using statistics and programming",
      "A database management system",
      "A web development framework"
    ],
    correctAnswer: 1,
    topic: "data science",
    level: "beginner"
  },
  {
    id: "ds-2",
    question: "Which library is commonly used for data manipulation in Python?",
    options: ["pandas", "flask", "django", "react"],
    correctAnswer: 0,
    topic: "data science",
    level: "beginner"
  },
  {
    id: "ds-3",
    question: "What is the purpose of data visualization?",
    options: [
      "To make data look pretty",
      "To communicate insights and patterns in data",
      "To store data",
      "To delete unnecessary data"
    ],
    correctAnswer: 1,
    topic: "data science",
    level: "intermediate"
  },
  {
    id: "ds-4",
    question: "What is ETL in data science?",
    options: [
      "Evaluate, Test, Learn",
      "Extract, Transform, Load",
      "Estimate, Track, Log",
      "Execute, Transfer, Link"
    ],
    correctAnswer: 1,
    topic: "data science",
    level: "intermediate"
  },
  {
    id: "ds-5",
    question: "What is statistical significance?",
    options: [
      "How important statistics are",
      "The likelihood that results are not due to chance",
      "The size of the dataset",
      "The number of variables"
    ],
    correctAnswer: 1,
    topic: "data science",
    level: "expert"
  },

  // Web Development Questions
  {
    id: "web-1",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language", 
      "Hyperlinks and Text Markup Language",
      "Hyper Text Making Language"
    ],
    correctAnswer: 0,
    topic: "web development",
    level: "beginner"
  },
  {
    id: "web-2",
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets", 
      "Colorful Style Sheets"
    ],
    correctAnswer: 1,
    topic: "web development",
    level: "beginner"
  },
  {
    id: "web-3",
    question: "Which HTTP status code indicates 'Not Found'?",
    options: ["200", "404", "500", "301"],
    correctAnswer: 1,
    topic: "web development",
    level: "intermediate"
  },
  {
    id: "web-4",
    question: "What is responsive web design?",
    options: [
      "Fast loading websites",
      "Websites that adapt to different screen sizes",
      "Websites with animations",
      "Websites that respond to user clicks"
    ],
    correctAnswer: 1,
    topic: "web development",
    level: "intermediate"
  },
  {
    id: "web-5",
    question: "What is the purpose of a CDN?",
    options: [
      "To write better code",
      "To deliver content from servers closer to users",
      "To create databases",
      "To design user interfaces"
    ],
    correctAnswer: 1,
    topic: "web development",
    level: "expert"
  }
];