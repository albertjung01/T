# 📰 일일 뉴스 텔레그램 봇 설정 가이드

매일 아침 원하는 주제의 뉴스를 자동으로 검색하고 요약해서 텔레그램으로 보내주는 봇입니다.

## 🚀 빠른 시작

### 1. 텔레그램 봇 생성

1. 텔레그램에서 [@BotFather](https://t.me/botfather)를 검색하여 대화 시작
2. `/newbot` 명령어 입력
3. 봇 이름과 사용자명 설정
4. 받은 **API 토큰**을 저장 (예: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Chat ID 확인

**방법 1: 개인 채팅**
1. 생성한 봇과 대화 시작
2. 아무 메시지나 전송
3. 브라우저에서 다음 URL 접속:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. 응답에서 `"chat":{"id":123456789}` 부분의 숫자가 Chat ID

**방법 2: 그룹 채팅**
1. 그룹을 생성하고 봇을 초대
2. 그룹에서 아무 메시지나 전송
3. 위와 동일한 URL로 확인
4. 그룹 Chat ID는 음수로 시작 (예: `-987654321`)

### 3. Claude API 키 발급

1. [Anthropic Console](https://console.anthropic.com/)에 로그인
2. API Keys 메뉴에서 새 API 키 생성
3. 발급받은 키 저장

### 4. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 입력:

```bash
# 서버 설정
PORT=5000
NODE_ENV=development

# 일일 뉴스 봇 활성화
ENABLE_NEWS_BOT=true

# 뉴스 전송 시간 설정 (Cron 표현식)
# 형식: 분 시 일 월 요일
# 예시:
# - 매일 오전 8시: 0 8 * * *
# - 매일 오전 7시 30분: 30 7 * * *
# - 평일 오전 9시: 0 9 * * 1-5
NEWS_SCHEDULE=0 8 * * *

# 검색할 뉴스 키워드 (쉼표로 구분)
# 비워두면 한국 주요 헤드라인을 가져옵니다
NEWS_TOPICS=AI,기술,경제,정치

# 텔레그램 봇 토큰 (BotFather에서 받은 토큰)
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# 텔레그램 Chat ID (메시지를 받을 채팅방 ID)
TELEGRAM_CHAT_ID=123456789

# Claude API 키
CLAUDE_API_KEY=sk-ant-api03-xxxxx
```

### 5. 서버 실행

```bash
npm install
npm start
```

서버가 시작되면 다음과 같은 메시지가 표시됩니다:
```
🚀 서버가 포트 5000에서 실행 중입니다.
📚 한국 대학입시 정보 챗봇 서비스
✅ 텔레그램 봇이 초기화되었습니다.
✅ 일일 뉴스 스케줄러 시작됨 (Cron: 0 8 * * *)
```

## 📝 설정 상세 설명

### NEWS_SCHEDULE (Cron 표현식)

Cron 표현식 형식: `분 시 일 월 요일`

| 필드 | 값 범위 | 설명 |
|------|---------|------|
| 분 | 0-59 | 분 |
| 시 | 0-23 | 시 (24시간 형식) |
| 일 | 1-31 | 일 |
| 월 | 1-12 | 월 |
| 요일 | 0-7 | 요일 (0과 7은 일요일) |

**예시:**
```bash
# 매일 오전 8시
NEWS_SCHEDULE=0 8 * * *

# 매일 오전 7시 30분
NEWS_SCHEDULE=30 7 * * *

# 평일(월-금) 오전 9시
NEWS_SCHEDULE=0 9 * * 1-5

# 주말(토-일) 오전 10시
NEWS_SCHEDULE=0 10 * * 0,6

# 매일 오전 8시와 오후 8시 (두 번 실행하려면 별도 설정 필요)
NEWS_SCHEDULE=0 8,20 * * *
```

### NEWS_TOPICS (뉴스 키워드)

- 쉼표(,)로 구분하여 여러 키워드 입력 가능
- 비워두면 한국 주요 헤드라인을 가져옴
- 각 키워드별로 최대 5개의 뉴스를 검색

**예시:**
```bash
# 기술 관련 뉴스
NEWS_TOPICS=AI,인공지능,ChatGPT,반도체,삼성전자

# 경제 뉴스
NEWS_TOPICS=주식,코스피,환율,부동산,경제

# 스포츠 뉴스
NEWS_TOPICS=야구,축구,손흥민,김하성

# 특정 주제만 관심있을 때
NEWS_TOPICS=비트코인

# 헤드라인만 받고 싶을 때 (비워두기)
NEWS_TOPICS=
```

## 🧪 테스트 실행

수동으로 뉴스 봇을 즉시 실행하려면:

1. Node.js REPL을 사용하거나 별도 테스트 스크립트 작성:

```javascript
// test-news-bot.js
require('dotenv').config();
const dailyNewsJob = require('./server/jobs/dailyNews');

// 즉시 실행
dailyNewsJob.runNow();
```

2. 실행:
```bash
node test-news-bot.js
```

## 📱 받게 될 메시지 예시

```
📰 일일 뉴스 브리핑
📅 2025년 1월 15일 수요일

📌 AI 주요 뉴스

• OpenAI, GPT-5 출시 예정 발표 - 성능이 대폭 향상되어 더욱 자연스러운 대화 가능
• 구글, 새로운 AI 검색 기능 도입 - 검색 결과의 정확도 개선
• 네이버, AI 기반 쇼핑 추천 서비스 강화

==================================================

📌 기술 주요 뉴스

• 삼성전자, 차세대 반도체 공정 개발 성공
• 애플, 새로운 MacBook Pro 라인업 공개
• SK하이닉스, HBM3 양산 본격화

오늘은 AI와 반도체 분야의 혁신적인 소식들이 주를 이루고 있습니다.

_자동 생성된 뉴스 요약입니다._
```

## 🛠️ 문제 해결

### 봇이 메시지를 보내지 않을 때

1. `.env` 파일의 설정 확인
   - `ENABLE_NEWS_BOT=true` 로 설정되어 있는지 확인
   - `TELEGRAM_BOT_TOKEN`이 올바른지 확인
   - `TELEGRAM_CHAT_ID`가 올바른지 확인
   - `CLAUDE_API_KEY`가 올바른지 확인

2. 서버 로그 확인
   ```bash
   npm start
   ```
   에러 메시지가 있는지 확인

3. 텔레그램 봇 권한 확인
   - 그룹 채팅의 경우 봇이 메시지 전송 권한이 있는지 확인
   - 봇이 그룹에서 제거되지 않았는지 확인

### API 할당량 초과

- Claude API나 Google News API의 사용량 제한을 확인
- `NEWS_TOPICS`의 키워드 수를 줄이기
- 요청 간 딜레이 늘리기 (코드 수정 필요)

### 스케줄 시간이 맞지 않을 때

- 서버의 시간대(Timezone) 확인
- Cron 표현식이 올바른지 확인
- 서버가 계속 실행 중인지 확인 (서버가 꺼지면 스케줄도 중단됨)

## 🔧 고급 설정

### 시간대 설정

서버의 시간대를 한국 시간(KST)으로 설정하려면:

```bash
# Linux/Mac
export TZ=Asia/Seoul
npm start

# Windows (PowerShell)
$env:TZ="Asia/Seoul"
npm start
```

또는 `.env` 파일에 추가:
```bash
TZ=Asia/Seoul
```

### PM2로 백그라운드 실행

서버를 항상 실행 상태로 유지하려면 PM2 사용:

```bash
# PM2 설치
npm install -g pm2

# 서버 시작
pm2 start server/index.js --name "news-bot"

# 자동 재시작 설정
pm2 startup
pm2 save

# 로그 확인
pm2 logs news-bot

# 상태 확인
pm2 status
```

### Docker로 실행

```dockerfile
# Dockerfile 예시
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV TZ=Asia/Seoul

CMD ["npm", "start"]
```

```bash
# Docker 빌드 및 실행
docker build -t news-bot .
docker run -d --env-file .env -p 5000:5000 news-bot
```

## 📚 추가 기능 아이디어

- 뉴스 카테고리별 필터링
- 특정 언론사 뉴스만 수집
- 주간 요약 리포트
- 중요 키워드 알림
- 뉴스 감정 분석
- 이미지/차트 포함 전송

## 💡 도움말

문제가 계속되거나 추가 기능이 필요하면 이슈를 등록해주세요!
