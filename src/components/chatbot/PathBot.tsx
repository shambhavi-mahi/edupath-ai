"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { X, Send, ThumbsUp, ThumbsDown, Download, GraduationCap, Brain } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { ChatMessage } from "@/types";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function PathBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatMessages, addChatMessage, updateChatFeedback, profile } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-pathbot", handler);
    return () => window.removeEventListener("open-pathbot", handler);
  }, []);

  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      addChatMessage({
        id: uuidv4(),
        role: "assistant",
        content: `Hi! I'm **PathBot**, your AI career guide 🎓\n\nI can help with:\n- Stream selection after Class 10\n- Entrance exams (JEE, NEET, CLAT, CAT...)\n- College recommendations\n- Career transitions\n\nWhat would you like to know?`,
        timestamp: new Date(),
        quickReplies: ["Which stream after 10th?", "Show entrance exams", "Find colleges", "Start Assessment"],
      });
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    addChatMessage(userMsg);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: chatMessages.map((m) => ({ role: m.role, content: m.content })),
          profile,
        }),
      });
      const data = await res.json();

      addChatMessage({
        id: uuidv4(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        quickReplies: data.quickReplies,
      });
    } catch {
      addChatMessage({
        id: uuidv4(),
        role: "assistant",
        content: "Let me connect you to our full assessment tool for a more personalised answer. [Start Assessment](/assessment)",
        timestamp: new Date(),
        quickReplies: ["Start Brain Assessment", "Try again"],
      });
    } finally {
      setIsTyping(false);
    }
  }, [chatMessages, profile, addChatMessage, isTyping]);

  const exportChatPDF = () => {
    const content = chatMessages
      .map((m) => `[${m.role.toUpperCase()}] ${m.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob(
      [`EduPath AI — PathBot Chat Export\n${new Date().toLocaleDateString()}\n\n${content}`],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edupath-pathbot-chat.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-white shadow-lg flex items-center justify-center group"
            aria-label="Open PathBot"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse-ring" />
            <div className="relative flex flex-col items-center">
              <GraduationCap className="w-5 h-5" />
              <Brain className="w-3 h-3 -mt-1" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-2rem)] flex flex-col rounded-card overflow-hidden shadow-2xl border border-primary-light/30 bg-white/90 dark:bg-card-dark/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-sm">PathBot</h3>
                  <p className="text-xs text-white/70 font-inter">AI Career Guide</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={exportChatPDF} className="p-1.5 hover:bg-white/20 rounded-button" aria-label="Export chat">
                  <Download className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-button" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] ${msg.role === "user" ? "" : "space-y-2"}`}>
                    <div
                      className={`px-4 py-3 rounded-card text-sm font-inter leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-br-sm"
                          : "bg-card dark:bg-background-dark text-text dark:text-gray-200 rounded-bl-sm"
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <Link href={href || "#"} className="text-secondary underline">
                              {children}
                            </Link>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>

                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-xs text-text-muted font-inter">Helpful?</span>
                        <button
                          onClick={() => updateChatFeedback(msg.id, "helpful")}
                          className={`p-1 rounded ${msg.feedback === "helpful" ? "text-secondary" : "text-text-muted hover:text-secondary"}`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateChatFeedback(msg.id, "not-helpful")}
                          className={`p-1 rounded ${msg.feedback === "not-helpful" ? "text-red-500" : "text-text-muted hover:text-red-500"}`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {msg.quickReplies && msg.role === "assistant" && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {msg.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => {
                              if (reply === "Start Assessment" || reply === "Start Brain Assessment") {
                                window.location.href = "/assessment";
                              } else {
                                sendMessage(reply);
                              }
                            }}
                            className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary/10 font-dmsans transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1 px-4 py-3 bg-card dark:bg-background-dark rounded-card w-fit">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce-dot"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Assessment handoff */}
            <div className="px-4 py-2 border-t border-primary-light/20">
              <Link
                href="/assessment"
                className="text-xs font-dmsans text-primary hover:text-secondary transition-colors"
              >
                Want your full Brain Assessment? Click here →
              </Link>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-primary-light/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about exams, colleges, careers..."
                className="flex-1 px-3 py-2 text-sm rounded-button border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark font-inter focus:outline-none focus:shadow-glow"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-primary text-white rounded-button hover:bg-primary-dark disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
