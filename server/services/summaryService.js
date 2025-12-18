const Anthropic = require('@anthropic-ai/sdk');

class SummaryService {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
  }

  /**
   * 뉴스 기사들을 Claude API를 사용하여 요약합니다
   * @param {Array} articles - 뉴스 기사 배열
   * @param {string} topic - 토픽 이름 (선택사항)
   * @returns {Promise<string>} 요약된 텍스트
   */
  async summarizeNews(articles, topic = '') {
    try {
      if (!articles || articles.length === 0) {
        return '오늘 해당 주제의 뉴스가 없습니다.';
      }

      const newsText = articles
        .map((article, index) => {
          return `${index + 1}. ${article.title}
출처: ${article.source}
날짜: ${article.pubDate}
링크: ${article.link}
내용: ${article.description}
`;
        })
        .join('\n---\n\n');

      const prompt = topic
        ? `다음은 "${topic}" 주제의 최신 뉴스 기사들입니다. 이 뉴스들을 읽고 주요 내용을 한국어로 간결하게 요약해주세요. 각 뉴스의 핵심 내용을 파악하여 3-5개의 bullet point로 정리해주세요.

${newsText}

요약 형식:
📌 ${topic} 주요 뉴스

• [첫 번째 주요 뉴스의 핵심 내용]
• [두 번째 주요 뉴스의 핵심 내용]
...

마지막에 간단한 한 줄 총평을 추가해주세요.`
        : `다음은 오늘의 주요 뉴스 기사들입니다. 이 뉴스들을 읽고 주요 내용을 한국어로 간결하게 요약해주세요. 카테고리별로 구분하여 각 뉴스의 핵심 내용을 파악하여 정리해주세요.

${newsText}

요약 형식:
📰 오늘의 주요 뉴스

🔹 정치/경제
• [관련 뉴스 핵심 내용]

🔹 사회/문화
• [관련 뉴스 핵심 내용]

🔹 국제
• [관련 뉴스 핵심 내용]

🔹 기타
• [관련 뉴스 핵심 내용]

마지막에 간단한 한 줄 총평을 추가해주세요.`;

      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      return message.content[0].text;
    } catch (error) {
      console.error('뉴스 요약 오류:', error);
      throw new Error('뉴스 요약 중 오류가 발생했습니다.');
    }
  }

  /**
   * 여러 토픽의 뉴스를 요약합니다
   * @param {Object} newsData - 토픽별 뉴스 객체
   * @returns {Promise<string>} 요약된 전체 텍스트
   */
  async summarizeMultipleTopics(newsData) {
    try {
      const summaries = [];

      for (const [topic, articles] of Object.entries(newsData)) {
        const summary = await this.summarizeNews(articles, topic);
        summaries.push(summary);

        // API 요청 제한을 피하기 위한 딜레이
        await this.delay(1000);
      }

      return summaries.join('\n\n' + '='.repeat(50) + '\n\n');
    } catch (error) {
      console.error('다중 토픽 요약 오류:', error);
      throw error;
    }
  }

  /**
   * 지연 함수
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new SummaryService();
