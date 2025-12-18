#!/usr/bin/env node

/**
 * 일일 뉴스 봇 테스트 스크립트
 *
 * 사용법:
 *   node test-news-bot.js
 *
 * 이 스크립트는 뉴스 봇을 즉시 실행하여 텔레그램으로 뉴스를 전송합니다.
 * 스케줄 설정을 테스트하기 전에 사용하세요.
 */

require('dotenv').config();
const dailyNewsJob = require('./server/jobs/dailyNews');

console.log('==========================================');
console.log('📰 일일 뉴스 봇 테스트 실행');
console.log('==========================================\n');

// 환경 변수 확인
const requiredEnvVars = [
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID',
  'CLAUDE_API_KEY'
];

let hasError = false;

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ ${varName}이(가) 설정되지 않았습니다.`);
    hasError = true;
  } else {
    // 토큰의 일부만 표시 (보안)
    const value = process.env[varName];
    const maskedValue = value.length > 10
      ? value.substring(0, 8) + '...' + value.substring(value.length - 4)
      : '***';
    console.log(`✅ ${varName}: ${maskedValue}`);
  }
});

if (hasError) {
  console.error('\n❌ .env 파일을 확인하고 필수 환경 변수를 설정하세요.');
  console.error('자세한 내용은 NEWS_BOT_GUIDE.md를 참조하세요.\n');
  process.exit(1);
}

console.log('\n설정된 뉴스 키워드:', process.env.NEWS_TOPICS || '(헤드라인 모드)');
console.log('\n뉴스 수집 및 전송을 시작합니다...\n');

// 즉시 실행
dailyNewsJob.runNow()
  .then(() => {
    console.log('\n==========================================');
    console.log('✅ 테스트 완료!');
    console.log('텔레그램에서 메시지를 확인하세요.');
    console.log('==========================================\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n==========================================');
    console.error('❌ 테스트 실패:', error.message);
    console.error('==========================================\n');
    process.exit(1);
  });
