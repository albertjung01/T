const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const universityRoutes = require('./routes/universities');
const admissionsRoutes = require('./routes/admissions');
const dailyNewsJob = require('./jobs/dailyNews');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/admissions', admissionsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '한국 대학입시 챗봇 서버가 정상 작동 중입니다.' });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📚 한국 대학입시 정보 챗봇 서비스`);

  // 일일 뉴스 스케줄러 시작
  if (process.env.ENABLE_NEWS_BOT === 'true') {
    const cronSchedule = process.env.NEWS_SCHEDULE || '0 8 * * *';
    dailyNewsJob.start(cronSchedule);
  } else {
    console.log('ℹ️ 일일 뉴스 봇이 비활성화되어 있습니다. (ENABLE_NEWS_BOT=true로 설정하여 활성화)');
  }
});

module.exports = app;
