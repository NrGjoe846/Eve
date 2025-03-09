import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Swords, Map as MapIcon, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import DragDropQuestion from './DragDropQuestion';
import MatchQuestion from './MatchQuestion';
import FillQuestion from './FillQuestion';
import OrderQuestion from './OrderQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import TranslateCodeQuestion from './TranslateCodeQuestion';
import MultipleSelectionQuestion from './MultipleSelectionQuestion';
import CodeCorrectionQuestion from './CodeCorrectionQuestion';
import FillInTheBlank from './FillInTheBlank';
import PythonCompanion from './PythonCompanion';
import questionsData from "../../data/quizzes/pythonBasics.json";

const componentMap: Record<string, React.FC<any>> = {
  DragDropQuestion,
  MatchQuestion,
  FillQuestion,
  OrderQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  TranslateCodeQuestion,
  MultipleSelectionQuestion,
  CodeCorrectionQuestion,
  FillInTheBlank
};

interface PythonQuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  moduleTitle: string;
  phaseId?: string;
  topicId?: string;
  storyChapters?: any[];
}

const PythonQuizPopup: React.FC<PythonQuizPopupProps> = ({
  isOpen,
  onClose,
  onComplete,
  moduleTitle,
  phaseId,
  topicId,
  storyChapters
}) => {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width, height } = useWindowSize();

  const findQuestionsForModule = () => {
    if (!questionsData || !Array.isArray(questionsData)) {
      console.error("Error: questionsData is undefined or not an array.", questionsData);
      return [];
    }
    for (const phase of questionsData) {
      for (const topic of phase.topics) {
        for (const subtopic of topic.subtopics) {
          if (subtopic.subtopic === moduleTitle && subtopic.questionsData?.length > 0) {
            return subtopic.questionsData;
          }
        }
      }
    }
    return [];
  };

  const questions = useMemo(() => findQuestionsForModule(), [moduleTitle]);
  const currentQuestion = questions[currentQuestionIndex] || {};
  const QuestionComponent = componentMap[currentQuestion.component] || null;
  const hints = currentQuestion.hints || [];

  useEffect(() => {
    try {
      setIsLoading(true);
      if (!questions.length) {
        setError("No questions found for this module");
      }
    } catch (err) {
      setError("Failed to load quiz content");
    } finally {
      setIsLoading(false);
    }
  }, [questions]);

  useEffect(() => {
    if (!isOpen) {
      setShowResults(false);
      setScore(0);
      setShowConfetti(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowHint(false);
      setCurrentHintIndex(0);
      setError(null);
    } else {
      setCurrentHintIndex(0);
    }
  }, [isOpen, currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowHint(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (q.answer && Array.isArray(q.answer)) {
        const userAnswer = answers[index];
        const isCorrect = Array.isArray(userAnswer) &&
          userAnswer.length === q.answer.length &&
          userAnswer.every((ans, i) => ans === q.answer[i]);
        if (isCorrect) correctAnswers++;
      } else {
        if (answers[index] === q.answer) correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    onComplete(finalScore);
  };

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const toggleHint = () => setShowHint((prev) => !prev);

  const handleNextHint = () => setCurrentHintIndex((prev) => (prev + 1) % hints.length);
  const handlePrevHint = () => setCurrentHintIndex((prev) => (prev - 1 + hints.length) % hints.length);

  const ProgressBar = () => (
    <div className="w-full bg-[#d3c092] rounded-full h-2.5 mb-4">
      <div 
        className="bg-[#8b5e3c] h-2.5 rounded-full transition-all" 
        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
      />
    </div>
  );

  const storyChapter = storyChapters?.find(ch => ch.phaseId === phaseId);
  const storyText = storyChapter?.topics?.[topicId]?.subtopics?.[moduleTitle.split('-')[1]] || "Solve this trial to restore the realm’s glory!";

  const getCompanionMood = (): 'happy' | 'sad' | 'thinking' | 'victory' => {
    if (showResults) return 'victory';
    if (answers[currentQuestionIndex] === undefined) return 'thinking';
    if (answers[currentQuestionIndex] === currentQuestion.answer) return 'happy';
    return 'sad';
  };

  const getCompanionDialogue = () => {
    if (showResults) return `Huzzah! The realm honors thy ${score}% valor!`;
    if (answers[currentQuestionIndex] === undefined) return 'Ponder well, brave coder...';
    if (answers[currentQuestionIndex] === currentQuestion.answer) return 'A masterful strike!';
    return 'Fear not, we’ll conquer this yet!';
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#f4e4bc] rounded-2xl p-6 max-w-md w-full m-4 text-center border-2 border-[#8b5e3c] shadow-lg font-serif">
          <p className="text-xl text-[#3c2f2f] mb-4">Preparing your trial...</p>
        </div>
      </motion.div>
    );
  }

  if (error || !questions.length) {
    return (
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#f4e4bc] rounded-2xl p-6 max-w-md w-full m-4 text-center border-2 border-[#8b5e3c] shadow-lg font-serif">
          <p className="text-xl text-[#3c2f2f] mb-4">{error || "No quests available for this trial yet, adventurer."}</p>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-colors shadow-md"
          >
            Return to Realm
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <DndProvider backend={HTML5Backend}>
        {showConfetti && <Confetti width={width} height={height} />}
        <motion.div 
          className="relative w-full max-w-4xl bg-[#f4e4bc] rounded-2xl shadow-2xl p-6 m-4 max-h-[90vh] overflow-y-auto border-2 border-[#8b5e3c] font-serif"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#8b5e3c]/20 rounded-lg transition-all text-[#8b5e3c]"
            aria-label="Close quiz"
          >
            <X className="w-6 h-6" />
          </button>

          {!showResults ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#3c2f2f]">{moduleTitle} Trial</h2>
                <p className="text-sm text-[#6b4e31]">Challenge {currentQuestionIndex + 1} of {questions.length}</p>
                <ProgressBar />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 bg-[#d3c092]/50 rounded-lg border border-[#8b5e3c] shadow-inner flex justify-between items-center"
                >
                  {showHint && hints.length > 0 ? (
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={handlePrevHint}
                        className="p-1 hover:bg-[#8b5e3c]/20 rounded-full text-[#8b5e3c] transition-all"
                        disabled={hints.length <= 1}
                        aria-label="Previous hint"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <p className="text-sm text-[#6b4e31] italic flex-1 text-center">
                        {hints[currentHintIndex].text}
                      </p>
                      <button
                        onClick={handleNextHint}
                        className="p-1 hover:bg-[#8b5e3c]/20 rounded-full text-[#8b5e3c] transition-all"
                        disabled={hints.length <= 1}
                        aria-label="Next hint"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-[#6b4e31] italic flex-1">
                      {storyText}
                    </p>
                  )}
                  <button
                    onClick={toggleHint}
                    className="p-1 hover:bg-[#8b5e3c]/20 rounded-full text-[#8b5e3c] transition-all"
                    title="Seek Wisdom"
                    aria-label="Toggle hint"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>

              {QuestionComponent && (
                <div className="text-[#3c2f2f]">
                  <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
                </div>
              )}

              <button
                onClick={handleNext}
                className="mt-6 px-6 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-colors w-full shadow-md flex items-center justify-center gap-2"
                aria-label={currentQuestionIndex === questions.length - 1 ? "Complete quiz" : "Next question"}
              >
                <Swords className="w-5 h-5" />
                {currentQuestionIndex === questions.length - 1 ? 'Claim Victory' : 'Next Trial'}
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <Swords className="w-16 h-16 text-[#a67c00] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#3c2f2f] mb-4">Trial Conquered!</h2>
              <p className="text-xl text-[#3c2f2f] mb-4">Your Might: {score}%</p>
              <p className="text-[#6b4e31] mb-6 italic">
                {storyChapter?.completion || "The realm salutes your valor, brave coder!"}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 mx-auto"
                aria-label="Return to main content"
              >
                <MapIcon className="w-5 h-5" />
                Journey Onward
              </button>
            </div>
          )}
          <PythonCompanion mood={getCompanionMood()} dialogue={getCompanionDialogue()} />
        </motion.div>
      </DndProvider>
    </motion.div>
  );
};

export default PythonQuizPopup;
