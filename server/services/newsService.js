const Parser = require('rss-parser');
const axios = require('axios');

class NewsService {
  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ['description', 'pubDate', 'link']
      }
    });
  }

  /**
   * Google News RSS를 통해 한국 뉴스를 검색합니다
   * @param {string} query - 검색 키워드
   * @param {number} limit - 가져올 뉴스 개수 (기본값: 10)
   * @returns {Promise<Array>} 뉴스 기사 배열
   */
  async searchNews(query, limit = 10) {
    try {
      const encodedQuery = encodeURIComponent(query);
      // Google News RSS 피드 URL (한국어)
      const rssUrl = `https://news.google.com/rss/search?q=${encodedQuery}&hl=ko&gl=KR&ceid=KR:ko`;

      const feed = await this.parser.parseURL(rssUrl);

      const articles = feed.items.slice(0, limit).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: this.cleanDescription(item.contentSnippet || item.description || ''),
        source: this.extractSource(item.title)
      }));

      return articles;
    } catch (error) {
      console.error('뉴스 검색 오류:', error);
      throw new Error('뉴스를 가져오는 중 오류가 발생했습니다.');
    }
  }

  /**
   * 여러 키워드로 뉴스를 검색합니다
   * @param {Array<string>} queries - 검색 키워드 배열
   * @param {number} limitPerQuery - 각 키워드당 가져올 뉴스 개수
   * @returns {Promise<Object>} 키워드별 뉴스 객체
   */
  async searchMultipleTopics(queries, limitPerQuery = 5) {
    try {
      const results = {};

      for (const query of queries) {
        const articles = await this.searchNews(query, limitPerQuery);
        results[query] = articles;

        // API 요청 제한을 피하기 위한 딜레이
        await this.delay(1000);
      }

      return results;
    } catch (error) {
      console.error('다중 토픽 검색 오류:', error);
      throw error;
    }
  }

  /**
   * 한국 주요 뉴스 (헤드라인)를 가져옵니다
   * @param {number} limit - 가져올 뉴스 개수
   * @returns {Promise<Array>} 뉴스 기사 배열
   */
  async getTopHeadlines(limit = 10) {
    try {
      // Google News 한국 헤드라인
      const rssUrl = 'https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko';

      const feed = await this.parser.parseURL(rssUrl);

      const articles = feed.items.slice(0, limit).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: this.cleanDescription(item.contentSnippet || item.description || ''),
        source: this.extractSource(item.title)
      }));

      return articles;
    } catch (error) {
      console.error('헤드라인 가져오기 오류:', error);
      throw new Error('헤드라인을 가져오는 중 오류가 발생했습니다.');
    }
  }

  /**
   * HTML 태그를 제거하고 텍스트만 추출합니다
   */
  cleanDescription(text) {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  }

  /**
   * 뉴스 제목에서 출처를 추출합니다
   */
  extractSource(title) {
    if (!title) return '';
    const match = title.match(/- (.+)$/);
    return match ? match[1] : '';
  }

  /**
   * 지연 함수
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new NewsService();
