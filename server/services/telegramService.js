const TelegramBot = require('node-telegram-bot-api');

class TelegramService {
  constructor() {
    this.bot = null;
    this.isInitialized = false;
  }

  /**
   * 텔레그램 봇을 초기화합니다
   */
  initialize() {
    if (this.isInitialized) {
      return;
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token) {
      console.error('❌ TELEGRAM_BOT_TOKEN이 설정되지 않았습니다.');
      return;
    }

    if (!chatId) {
      console.error('❌ TELEGRAM_CHAT_ID가 설정되지 않았습니다.');
      return;
    }

    try {
      this.bot = new TelegramBot(token, { polling: false });
      this.isInitialized = true;
      console.log('✅ 텔레그램 봇이 초기화되었습니다.');
    } catch (error) {
      console.error('❌ 텔레그램 봇 초기화 실패:', error);
    }
  }

  /**
   * 텔레그램으로 메시지를 전송합니다
   * @param {string} message - 전송할 메시지
   * @param {Object} options - 추가 옵션
   * @returns {Promise<boolean>} 성공 여부
   */
  async sendMessage(message, options = {}) {
    if (!this.isInitialized) {
      this.initialize();
    }

    if (!this.bot) {
      console.error('❌ 텔레그램 봇이 초기화되지 않았습니다.');
      return false;
    }

    const chatId = process.env.TELEGRAM_CHAT_ID;

    try {
      // 메시지가 너무 길면 여러 메시지로 분할
      const maxLength = 4096; // 텔레그램 메시지 최대 길이

      if (message.length <= maxLength) {
        await this.bot.sendMessage(chatId, message, {
          parse_mode: 'Markdown',
          ...options
        });
      } else {
        // 메시지를 여러 부분으로 분할
        const parts = this.splitMessage(message, maxLength);
        for (const part of parts) {
          await this.bot.sendMessage(chatId, part, {
            parse_mode: 'Markdown',
            ...options
          });
          // 메시지 간 딜레이
          await this.delay(500);
        }
      }

      console.log('✅ 텔레그램 메시지가 전송되었습니다.');
      return true;
    } catch (error) {
      console.error('❌ 텔레그램 메시지 전송 실패:', error);
      return false;
    }
  }

  /**
   * 긴 메시지를 여러 부분으로 분할합니다
   * @param {string} message - 분할할 메시지
   * @param {number} maxLength - 최대 길이
   * @returns {Array<string>} 분할된 메시지 배열
   */
  splitMessage(message, maxLength) {
    const parts = [];
    let currentPart = '';

    const lines = message.split('\n');

    for (const line of lines) {
      if ((currentPart + line + '\n').length > maxLength) {
        if (currentPart) {
          parts.push(currentPart.trim());
          currentPart = '';
        }

        // 한 줄이 maxLength보다 긴 경우
        if (line.length > maxLength) {
          let remainingLine = line;
          while (remainingLine.length > 0) {
            parts.push(remainingLine.substring(0, maxLength));
            remainingLine = remainingLine.substring(maxLength);
          }
        } else {
          currentPart = line + '\n';
        }
      } else {
        currentPart += line + '\n';
      }
    }

    if (currentPart) {
      parts.push(currentPart.trim());
    }

    return parts;
  }

  /**
   * 뉴스 요약을 텔레그램으로 전송합니다
   * @param {string} summary - 요약된 뉴스
   * @returns {Promise<boolean>} 성공 여부
   */
  async sendNewsSummary(summary) {
    const date = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    const message = `📰 *일일 뉴스 브리핑*
📅 ${date}

${summary}

_자동 생성된 뉴스 요약입니다._`;

    return await this.sendMessage(message);
  }

  /**
   * 지연 함수
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 봇 정보를 가져옵니다 (테스트용)
   */
  async getBotInfo() {
    if (!this.isInitialized) {
      this.initialize();
    }

    if (!this.bot) {
      return null;
    }

    try {
      const info = await this.bot.getMe();
      return info;
    } catch (error) {
      console.error('봇 정보 가져오기 실패:', error);
      return null;
    }
  }
}

module.exports = new TelegramService();
