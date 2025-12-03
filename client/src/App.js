import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import SuggestionChips from './components/SuggestionChips';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([
    '수능 정보',
    '내신 관리',
    '대학 정보',
    '전형 안내',
    '학종 준비'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const userId = useRef(generateUserId());

  useEffect(() => {
    // 초기 환영 메시지
    const welcomeMessage = {
      role: 'bot',
      message: `안녕하세요! 😊 한국 대학입시 정보 챗봇입니다.

저는 다음과 같은 정보를 제공해드릴 수 있습니다:

📚 **수능 정보**: 시험 일정, 과목, 학습 방법
📖 **내신 관리**: 등급 계산, 학생부 관리
🏫 **대학 정보**: 주요 대학 입시 요강
📊 **전형 안내**: 수시/정시 전형 정보
💡 **학생부종합**: 학종 준비 가이드

어떤 정보가 필요하신가요?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // 사용자 메시지 추가
    const userMessage = {
      role: 'user',
      message: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // API 호출
      const response = await axios.post('/api/chat', {
        userId: userId.current,
        message: messageText
      });

      // 봇 응답 추가
      const botMessage = {
        role: 'bot',
        message: response.data.data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // 제안 업데이트
      if (response.data.data.suggestions) {
        setSuggestions(response.data.data.suggestions);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'bot',
        message: '죄송합니다. 메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleClearChat = () => {
    const welcomeMessage = {
      role: 'bot',
      message: '대화가 초기화되었습니다. 새로운 질문을 해주세요! 😊',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setSuggestions(['수능 정보', '내신 관리', '대학 정보', '전형 안내', '학종 준비']);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <h1>🎓 한국 대학입시 챗봇</h1>
            <p>수능, 내신, 대학 정보를 물어보세요!</p>
          </div>
          <button className="clear-button" onClick={handleClearChat}>
            대화 초기화
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="loading-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <SuggestionChips
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
