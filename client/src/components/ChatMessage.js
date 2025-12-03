import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message }) {
  const isBot = message.role === 'bot';

  const formatMessage = (text) => {
    // 마크다운 스타일 포맷팅 (간단한 버전)
    return text
      .split('\n')
      .map((line, index) => {
        // 볼드 처리
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 리스트 처리
        if (line.trim().startsWith('-')) {
          return `<li key="${index}">${line.substring(1).trim()}</li>`;
        }

        // 헤딩 처리
        if (line.trim().startsWith('##')) {
          return `<h3 key="${index}">${line.substring(2).trim()}</h3>`;
        }

        if (line.trim() === '') {
          return '<br key="${index}" />';
        }

        return `<p key="${index}">${line}</p>`;
      })
      .join('');
  };

  return (
    <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
      <div className={`message ${isBot ? 'bot-message' : 'user-message'}`}>
        {isBot && <div className="bot-avatar">🤖</div>}
        <div className="message-content">
          <div
            className="message-text"
            dangerouslySetInnerHTML={{ __html: formatMessage(message.message) }}
          />
          <div className="message-time">
            {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
