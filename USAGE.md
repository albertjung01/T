# 한국 대학입시 챗봇 사용 가이드

## 📦 설치 및 실행

### 1. 의존성 설치

먼저 루트 디렉토리에서 백엔드 의존성을 설치합니다:

```bash
npm install
```

그 다음 클라이언트 디렉토리로 이동하여 프론트엔드 의존성을 설치합니다:

```bash
cd client
npm install
cd ..
```

### 2. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사합니다:

```bash
cp .env.example .env
```

### 3. 서버 실행

**백엔드만 실행:**
```bash
npm start
```

**개발 모드 (자동 재시작):**
```bash
npm run dev
```

**프론트엔드만 실행:**
```bash
cd client
npm start
```

**백엔드 + 프론트엔드 동시 실행:**
```bash
npm run dev:all
```

### 4. 접속

브라우저에서 다음 주소로 접속:
- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:5000

## 💬 챗봇 사용 방법

### 질문 예시

**수능 관련:**
- "수능 일정 알려줘"
- "수능 등급 계산 방법"
- "수능 과목은 뭐가 있어?"

**내신 관련:**
- "내신 등급 계산법"
- "내신 올리는 방법"
- "학생부 관리 방법"

**대학 정보:**
- "SKY 대학 알려줘"
- "서울대 정보"
- "주요 대학 알려줘"

**전형 정보:**
- "수시 전형이 뭐야?"
- "정시 전형 알려줘"
- "전형 선택 방법"

**학생부종합:**
- "학종이 뭐야?"
- "비교과 활동 추천"
- "면접 준비 방법"

## 🔧 API 엔드포인트

### 채팅 API

**메시지 전송:**
```
POST /api/chat
Body: {
  "userId": "user_123",
  "message": "수능 일정 알려줘"
}
```

**대화 히스토리 조회:**
```
GET /api/chat/history/:userId
```

**대화 히스토리 삭제:**
```
DELETE /api/chat/history/:userId
```

### 대학 정보 API

**모든 대학 조회:**
```
GET /api/universities
```

**ID로 대학 조회:**
```
GET /api/universities/:id
```

**이름으로 대학 검색:**
```
GET /api/universities/search/:name
```

### 입시 정보 API

**모든 입시 정보:**
```
GET /api/admissions
```

**수시 정보:**
```
GET /api/admissions/susi
```

**정시 정보:**
```
GET /api/admissions/jeongsi
```

**입시 일정:**
```
GET /api/admissions/calendar
```

## 📁 프로젝트 구조

```
korean-exam-chatbot/
├── server/                 # 백엔드 서버
│   ├── index.js           # 메인 서버 파일
│   ├── routes/            # API 라우트
│   │   ├── chat.js
│   │   ├── universities.js
│   │   └── admissions.js
│   ├── services/          # 비즈니스 로직
│   │   └── chatbotService.js
│   └── data/              # 데이터 저장소
│       ├── universities.js
│       ├── admissions.js
│       └── suneung.js
├── client/                # 프론트엔드 (React)
│   ├── public/
│   └── src/
│       ├── components/    # React 컴포넌트
│       │   ├── ChatMessage.js
│       │   ├── ChatInput.js
│       │   └── SuggestionChips.js
│       ├── App.js
│       └── index.js
├── package.json           # 백엔드 의존성
└── README.md
```

## 🎨 주요 기능

1. **자연어 처리 기반 대화**
   - 사용자의 질문을 이해하고 적절한 답변 제공
   - 키워드 기반 응답 시스템

2. **추천 질문 (Suggestion Chips)**
   - 사용자가 쉽게 질문할 수 있도록 추천 질문 제공
   - 맥락에 따라 동적으로 변경

3. **대화 히스토리**
   - 사용자별 대화 내용 저장
   - 세션 유지 및 컨텍스트 관리

4. **반응형 디자인**
   - 모바일 및 데스크톱 환경 모두 지원
   - 모던한 UI/UX

## 🔐 보안 고려사항

- 사용자 ID는 클라이언트에서 자동 생성
- 실제 운영 환경에서는 인증 시스템 추가 권장
- CORS 설정 확인 필요
- 환경 변수를 통한 설정 관리

## 🚀 개선 사항 (향후)

1. **AI 모델 통합**
   - OpenAI GPT API 또는 Claude API 연동
   - 더 자연스러운 대화 가능

2. **데이터베이스 연동**
   - MongoDB 또는 PostgreSQL 연동
   - 실시간 입시 정보 업데이트

3. **사용자 인증**
   - JWT 기반 인증 시스템
   - 개인화된 상담 기록 관리

4. **실시간 채팅**
   - WebSocket을 통한 실시간 통신
   - 타이핑 인디케이터

5. **관리자 대시보드**
   - 채팅 로그 분석
   - 자주 묻는 질문 통계

## 📞 문의

프로젝트에 대한 문의나 피드백은 이슈를 등록해주세요.
