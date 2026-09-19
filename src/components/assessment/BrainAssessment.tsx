"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import ProgressBar from "@/components/shared/ProgressBar";
import BrainRadarChart from "./BrainRadarChart";
import GlassCard from "@/components/shared/GlassCard";
import { Check, ArrowRight, Download } from "lucide-react";
import { calculateCareerMatches } from "@/lib/utils";

interface Question {
  id: string;
  dimension: string;
  question_text: string;
  question_type: string;
  options: { label: string; value: string }[];
}

interface AnswerRecord {
  question_id: string;
  answer: string;
  response_time: number;
}

const INTEREST_CATEGORIES = [
  'Technology', 'Engineering', 'Healthcare', 'Science & Research',
  'Business & Finance', 'Law & Public Service', 'Creative & Design',
  'Media & Communication', 'Education & Psychology', 'Environment & Agriculture'
];

export default function BrainAssessment() {
  const { profile } = useApp();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const startAssessment = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/assessment/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: null }) 
        });
        const data = await res.json();
        if (data.assessment_id) {
          setSessionId(data.assessment_id);
          setQuestions(data.questions);
          setStartTime(Date.now());
        }
      } catch (err) {
        setError("Failed to load assessment prototype.");
      } finally {
        setLoading(false);
      }
    };
    startAssessment();
  }, []);

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? (currentStep / totalQuestions) * 100 : 0;
  const isComplete = totalQuestions > 0 && currentStep >= totalQuestions;

  const handleAnswer = async (value: string) => {
    const responseTime = Date.now() - startTime;
    const currentQ = questions[currentStep];

    const newAnswers = [...answers, { question_id: currentQ.id, answer: value, response_time: responseTime }];
    setAnswers(newAnswers);

    if (currentStep + 1 >= totalQuestions) {
      setLoading(true);
      try {
        const res = await fetch("/api/assessment/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assessment_id: sessionId,
            student_id: null,
            answers: newAnswers
          })
        });
        const data = await res.json();
        if (data.assessment_id) {
          setResult(data);
        } else {
          setError("Failed to get results.");
        }
      } catch (err) {
        setError("Failed to submit assessment.");
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
      setStartTime(Date.now());
    }
  };

  if (loading && !result) {
    return <div className="text-center py-20 font-inter text-text-muted">Loading Assessment Prototype...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (isComplete && result) {
    // Separate Aptitude from Interest
    const aptitudeScores = Object.entries(result.scores).filter(([dim]) => !INTEREST_CATEGORIES.includes(dim));
    const interestScores = Object.entries(result.scores).filter(([dim]) => INTEREST_CATEGORIES.includes(dim));

    const radarData = aptitudeScores.map(([dim, score]) => ({
      dimension: dim.split(" ")[0],
      score: Number(score),
    }));

    const careerMatches = calculateCareerMatches(result.scores);

    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="font-poppins text-3xl font-bold text-text dark:text-white mb-2">
            Dual Profile Results
          </h2>
          <p className="font-inter text-text-muted max-w-2xl mx-auto">
            Here are career areas that appear aligned with your current interests, strengths, and academic profile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="flex flex-col h-full">
            <h3 className="section-heading mb-4 text-center">Aptitude Profile</h3>
            <div className="flex-1 min-h-[300px]">
              <BrainRadarChart data={radarData} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {aptitudeScores.map(([dim, score]) => (
                <div key={dim} className="text-center p-2 bg-primary/5 rounded-lg">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">{dim}</p>
                  <p className="font-poppins font-bold text-primary">{Number(score)}%</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col h-full">
            <h3 className="section-heading mb-4 text-center">Interest Profile</h3>
            <div className="flex-1 space-y-3">
              {interestScores.sort((a, b) => Number(b[1]) - Number(a[1])).map(([dim, score]) => (
                <div key={dim} className="relative pt-1">
                  <div className="flex mb-1 items-center justify-between">
                    <span className="text-xs font-semibold inline-block text-text dark:text-white uppercase">
                      {dim}
                    </span>
                    <span className="text-xs font-semibold inline-block text-primary">
                      {Number(score)}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary/20">
                    <div style={{ width: `${Number(score)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <h3 className="section-heading mb-6">Top Career Matches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {careerMatches.slice(0, 3).map((match, idx) => (
              <div key={idx} className="glass-card p-4 border border-primary/20 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${match.matchLevel === 'Strong' ? 'bg-green-500' : 'bg-blue-500'}`} />
                <h4 className="font-montserrat font-bold text-lg mb-3">{match.careerName}</h4>
                <div className="space-y-2 text-sm font-inter text-text-muted">
                  <div className="flex justify-between">
                    <span>Overall Match</span>
                    <span className="font-bold text-text dark:text-white">{match.overallMatch}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aptitude Fit</span>
                    <span>{match.aptitudeFit}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Fit</span>
                    <span>{match.interestFit}%</span>
                  </div>
                </div>
                <div className="mt-4 inline-block text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {match.matchLevel} Match
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => window.print()}
            className="font-dmsans px-6 py-3 border border-primary/20 rounded-button text-primary hover:bg-primary/10 inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentStep];
  if (!currentQ) return null;

  const isLikert = currentQ.question_type === 'likert_scale';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="font-dmsans text-sm text-text-muted">
            Question {currentStep + 1} of {totalQuestions}
          </span>
          <span className="font-dmsans text-sm text-primary font-semibold">
            {isLikert ? "Interest Survey" : "Aptitude Assessment"}
          </span>
        </div>
        <ProgressBar progress={progress} showPercentage />
      </div>

      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <GlassCard className="text-center">
          <span className="text-xs font-dmsans px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 inline-block uppercase tracking-wider">
            {currentQ.dimension}
          </span>
          <h3 className="font-montserrat text-xl font-semibold text-text dark:text-white mb-8 leading-relaxed max-w-lg mx-auto">
            {currentQ.question_text}
          </h3>
          
          {isLikert ? (
             <div className="flex flex-col sm:flex-row justify-center items-stretch gap-2 mb-4">
              {currentQ.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.value)}
                  className="flex-1 px-2 py-4 rounded-button border border-primary/20 hover:border-primary hover:bg-primary/5 font-inter text-xs text-text dark:text-gray-300 transition-all hover:-translate-y-1"
                >
                  {option.label.split(" - ")[1] || option.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {currentQ.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left px-5 py-4 rounded-button border border-primary/10 hover:border-primary hover:bg-primary/5 font-inter text-sm text-text dark:text-gray-300 transition-all hover:scale-[1.01]"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
