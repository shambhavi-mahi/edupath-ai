"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserProfile, UserStage, AssessmentResult, ChatMessage } from "@/types";

interface AppState {
  profile: Partial<UserProfile>;
  assessmentResult: AssessmentResult | null;
  assessmentProgress: Record<string, number>;
  assessmentStep: number;
  chatMessages: ChatMessage[];
  savedReportId: string | null;
  darkMode: boolean;
}

interface AppContextType extends AppState {
  setStage: (stage: UserStage, year?: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setAssessmentAnswer: (questionId: string, score: number) => void;
  setAssessmentStep: (step: number) => void;
  setAssessmentResult: (result: AssessmentResult) => void;
  addChatMessage: (message: ChatMessage) => void;
  updateChatFeedback: (messageId: string, feedback: "helpful" | "not-helpful") => void;
  toggleDarkMode: () => void;
  resetAssessment: () => void;
  saveProgress: () => void;
  loadProgress: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "edupath-ai-state";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    profile: { interests: [], preferences: [] },
    assessmentResult: null,
    assessmentProgress: {},
    assessmentStep: 0,
    chatMessages: [],
    savedReportId: null,
    darkMode: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, ...parsed }));
      } catch { /* ignore */ }
    }
    const darkPref = localStorage.getItem("edupath-dark");
    if (darkPref === "true") {
      document.documentElement.classList.add("dark");
      setState((prev) => ({ ...prev, darkMode: true }));
    }
  }, []);

  const saveProgress = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      profile: state.profile,
      assessmentResult: state.assessmentResult,
      assessmentProgress: state.assessmentProgress,
      assessmentStep: state.assessmentStep,
    }));
  }, [state.profile, state.assessmentResult, state.assessmentProgress, state.assessmentStep]);

  const loadProgress = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setState((prev) => ({ ...prev, ...parsed }));
    }
  }, []);

  const setStage = (stage: UserStage, year?: number) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, stage, year },
    }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const setAssessmentAnswer = (questionId: string, score: number) => {
    setState((prev) => ({
      ...prev,
      assessmentProgress: { ...prev.assessmentProgress, [questionId]: score },
    }));
  };

  const setAssessmentStep = (step: number) => {
    setState((prev) => ({ ...prev, assessmentStep: step }));
  };

  const setAssessmentResult = (result: AssessmentResult) => {
    setState((prev) => ({ ...prev, assessmentResult: result }));
  };

  const addChatMessage = (message: ChatMessage) => {
    setState((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, message],
    }));
  };

  const updateChatFeedback = (messageId: string, feedback: "helpful" | "not-helpful") => {
    setState((prev) => ({
      ...prev,
      chatMessages: prev.chatMessages.map((m) =>
        m.id === messageId ? { ...m, feedback } : m
      ),
    }));
  };

  const toggleDarkMode = () => {
    setState((prev) => {
      const newDark = !prev.darkMode;
      if (newDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("edupath-dark", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("edupath-dark", "false");
      }
      return { ...prev, darkMode: newDark };
    });
  };

  const resetAssessment = () => {
    setState((prev) => ({
      ...prev,
      assessmentProgress: {},
      assessmentStep: 0,
      assessmentResult: null,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setStage,
        updateProfile,
        setAssessmentAnswer,
        setAssessmentStep,
        setAssessmentResult,
        addChatMessage,
        updateChatFeedback,
        toggleDarkMode,
        resetAssessment,
        saveProgress,
        loadProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
