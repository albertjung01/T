const cron = require('node-cron');
const newsService = require('../services/newsService');
const summaryService = require('../services/summaryService');
const telegramService = require('../services/telegramService');

class DailyNewsJob {
  constructor() {
    this.isRunning = false;
    this.scheduledTask = null;
  }

  /**
   * 일일 뉴스 작업을 실행합니다
   */
  async execute() {
    if (this.isRunning) {
      console.log('⚠️ 이미 뉴스 작업이 실행 중입니다.');
      return;
    }

    this.isRunning = true;
    console.log('🔄 일일 뉴스 작업 시작...');

    try {
      // 환경 변수에서 뉴스 키워드 가져오기
      const newsTopics = process.env.NEWS_TOPICS
        ? process.env.NEWS_TOPICS.split(',').map(topic => topic.trim())
        : null;

      let articles;
      let summary;

      if (newsTopics && newsTopics.length > 0) {
        // 사용자가 지정한 토픽으로 뉴스 검색
        console.log(`📰 검색 키워드: ${newsTopics.join(', ')}`);

        const newsData = await newsService.searchMultipleTopics(newsTopics, 5);
        console.log('✅ 뉴스 검색 완료');

        summary = await summaryService.summarizeMultipleTopics(newsData);
        console.log('✅ 뉴스 요약 완료');
      } else {
        // 기본: 한국 주요 헤드라인
        console.log('📰 한국 주요 헤드라인을 가져옵니다...');

        articles = await newsService.getTopHeadlines(10);
        console.log('✅ 뉴스 검색 완료');

        summary = await summaryService.summarizeNews(articles);
        console.log('✅ 뉴스 요약 완료');
      }

      // 텔레그램으로 전송
      const success = await telegramService.sendNewsSummary(summary);

      if (success) {
        console.log('✅ 일일 뉴스 작업 완료!');
      } else {
        console.error('❌ 텔레그램 전송 실패');
      }
    } catch (error) {
      console.error('❌ 일일 뉴스 작업 중 오류 발생:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * 스케줄러를 시작합니다
   * @param {string} cronExpression - Cron 표현식 (기본값: 매일 오전 8시)
   */
  start(cronExpression = '0 8 * * *') {
    if (this.scheduledTask) {
      console.log('⚠️ 스케줄러가 이미 실행 중입니다.');
      return;
    }

    // 텔레그램 봇 초기화
    telegramService.initialize();

    // Cron 작업 스케줄링
    this.scheduledTask = cron.schedule(cronExpression, () => {
      console.log(`⏰ 스케줄된 시간: ${new Date().toLocaleString('ko-KR')}`);
      this.execute();
    });

    console.log(`✅ 일일 뉴스 스케줄러 시작됨 (Cron: ${cronExpression})`);
    console.log('   매일 지정된 시간에 뉴스를 요약하여 텔레그램으로 전송합니다.');
  }

  /**
   * 스케줄러를 중지합니다
   */
  stop() {
    if (this.scheduledTask) {
      this.scheduledTask.stop();
      this.scheduledTask = null;
      console.log('⏹️ 일일 뉴스 스케줄러가 중지되었습니다.');
    }
  }

  /**
   * 즉시 실행 (테스트용)
   */
  async runNow() {
    console.log('▶️ 수동으로 뉴스 작업 실행...');
    await this.execute();
  }
}

module.exports = new DailyNewsJob();
