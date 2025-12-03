const { getUniversityData } = require('../data/universities');
const { getAdmissionsData } = require('../data/admissions');
const { getSuneungData } = require('../data/suneung');

class ChatbotService {
  constructor() {
    this.conversationHistory = new Map();
  }

  /**
   * 사용자 메시지 처리 및 응답 생성
   */
  async processMessage(userId, message) {
    const lowerMessage = message.toLowerCase().trim();

    // 대화 히스토리 저장
    if (!this.conversationHistory.has(userId)) {
      this.conversationHistory.set(userId, []);
    }

    const history = this.conversationHistory.get(userId);
    history.push({ role: 'user', message, timestamp: new Date() });

    let response = '';

    // 인사말 처리
    if (this.isGreeting(lowerMessage)) {
      response = this.getGreetingResponse();
    }
    // 수능 관련 질문
    else if (this.isSuneungRelated(lowerMessage)) {
      response = this.getSuneungResponse(lowerMessage);
    }
    // 내신 관련 질문
    else if (this.isNaesinRelated(lowerMessage)) {
      response = this.getNaesinResponse(lowerMessage);
    }
    // 대학 정보 질문
    else if (this.isUniversityRelated(lowerMessage)) {
      response = this.getUniversityResponse(lowerMessage);
    }
    // 전형 정보 질문
    else if (this.isAdmissionsRelated(lowerMessage)) {
      response = this.getAdmissionsResponse(lowerMessage);
    }
    // 학생부종합전형 관련
    else if (this.isHakjongRelated(lowerMessage)) {
      response = this.getHakjongResponse(lowerMessage);
    }
    // 기타 질문
    else {
      response = this.getDefaultResponse();
    }

    history.push({ role: 'bot', message: response, timestamp: new Date() });

    return {
      response,
      suggestions: this.getSuggestions(lowerMessage)
    };
  }

  /**
   * 인사말 감지
   */
  isGreeting(message) {
    const greetings = ['안녕', 'hi', 'hello', '헬로', '반가워', '처음', '시작'];
    return greetings.some(greeting => message.includes(greeting));
  }

  /**
   * 인사말 응답
   */
  getGreetingResponse() {
    return `안녕하세요! 😊 한국 대학입시 정보 챗봇입니다.

저는 다음과 같은 정보를 제공해드릴 수 있습니다:

📚 **수능 정보**: 시험 일정, 과목, 학습 방법
📖 **내신 관리**: 등급 계산, 학생부 관리
🏫 **대학 정보**: 주요 대학 입시 요강
📊 **전형 안내**: 수시/정시 전형 정보
💡 **학생부종합**: 학종 준비 가이드

어떤 정보가 필요하신가요?`;
  }

  /**
   * 수능 관련 감지
   */
  isSuneungRelated(message) {
    const keywords = ['수능', '수학능력시험', '모의고사', '평가원', '등급', '표준점수', '백분위'];
    return keywords.some(keyword => message.includes(keyword));
  }

  /**
   * 수능 응답
   */
  getSuneungResponse(message) {
    const suneungData = getSuneungData();

    if (message.includes('일정') || message.includes('날짜') || message.includes('언제')) {
      return `📅 **2024학년도 수능 일정**

- **시험일**: 2023년 11월 16일 (목)
- **성적 통지**: 2023년 12월 8일 (금)

**시험 시간표**:
1교시 (08:40~10:00): 국어 (80분)
2교시 (10:30~12:10): 수학 (100분)
3교시 (13:10~14:20): 영어 (70분)
4교시 (14:50~16:00): 한국사 및 탐구 (70분)
5교시 (16:35~17:45): 제2외국어/한문 (40분)`;
    }

    if (message.includes('등급') || message.includes('계산')) {
      return `📊 **수능 등급 계산 방법**

수능 등급은 상위 누적 비율에 따라 9등급으로 나뉩니다:

- 1등급: 상위 4%
- 2등급: 상위 11%
- 3등급: 상위 23%
- 4등급: 상위 40%
- 5등급: 상위 60%
- 6등급: 상위 77%
- 7등급: 상위 89%
- 8등급: 상위 96%
- 9등급: 상위 100%

**참고**: 대학별로 표준점수, 백분위, 등급을 다르게 반영하니 지원 대학의 입시 요강을 확인하세요!`;
    }

    return suneungData.general;
  }

  /**
   * 내신 관련 감지
   */
  isNaesinRelated(message) {
    const keywords = ['내신', '학생부', '생기부', '교과', '성적', 'gpa'];
    return keywords.some(keyword => message.includes(keyword));
  }

  /**
   * 내신 응답
   */
  getNaesinResponse(message) {
    if (message.includes('등급') || message.includes('계산')) {
      return `📖 **내신 등급 계산 방법**

내신 등급 = (석차 / 재적 학생 수) × 100

**등급 구분**:
- 1등급: 상위 4% 이내
- 2등급: 상위 11% 이내
- 3등급: 상위 23% 이내
- 4등급: 상위 40% 이내
- 5등급: 상위 60% 이내

**예시**: 전교생 200명 중 10등
→ (10/200) × 100 = 5% → 2등급

**팁**:
- 주요 과목(국영수) 내신이 특히 중요합니다
- 학기별 성적 추이도 평가 요소입니다`;
    }

    if (message.includes('관리') || message.includes('올리') || message.includes('향상')) {
      return `✨ **내신 관리 전략**

**1. 철저한 수업 집중**
- 수업 시간에 배운 내용이 시험의 80% 이상
- 선생님의 강조 사항 메모

**2. 교과서 중심 학습**
- 교과서 완벽 숙지가 기본
- 부교재는 보조 수단으로 활용

**3. 기출문제 분석**
- 전년도 기출문제 패턴 파악
- 선배들의 시험 정보 수집

**4. 시험 기간 계획**
- 최소 2-3주 전부터 준비
- 과목별 학습 시간 배분

**5. 꾸준한 복습**
- 수업 당일 복습이 가장 효과적
- 주말을 활용한 주간 복습`;
    }

    return `📖 **내신 정보**

내신(학교 내신 성적)은 대학 입시에서 매우 중요한 요소입니다.

**주요 포인트**:
- 학생부교과전형: 내신이 가장 중요
- 학생부종합전형: 내신 + 비교과 활동
- 정시: 주로 수능 성적 반영

더 구체적인 질문이 있으시면 말씀해주세요!`;
  }

  /**
   * 대학 관련 감지
   */
  isUniversityRelated(message) {
    const keywords = ['대학', '학교', '서울대', '연세대', '고려대', 'sky', '카이스트', '포항공대'];
    return keywords.some(keyword => message.includes(keyword));
  }

  /**
   * 대학 응답
   */
  getUniversityResponse(message) {
    const universities = getUniversityData();

    if (message.includes('sky') || message.includes('서울대') || message.includes('연세') || message.includes('고려')) {
      return `🏫 **SKY 대학 정보**

**서울대학교**
- 위치: 서울 관악구
- 특징: 국내 최고 명문대, 연구 중심 대학
- 주요 전형: 지역균형선발, 일반전형

**연세대학교**
- 위치: 서울 서대문구 (신촌)
- 특징: 국제화, 리버럴아츠 교육
- 주요 전형: 학생부종합(활동우수형), 논술

**고려대학교**
- 위치: 서울 성북구 (안암)
- 특징: 실용 교육, 취업률 우수
- 주요 전형: 학생부종합(계열적합형), 학교추천

**입시 팁**:
- SKY는 내신 1-2등급 + 수능 1-2등급 필요
- 학생부종합은 비교과 활동도 중요
- 논술은 고난도 문제 대비 필수`;
    }

    return `🏫 **대학 정보**

한국의 주요 대학들에 대한 정보를 제공해드립니다.

**대학 분류**:
- SKY: 서울대, 연세대, 고려대
- 주요 대학: 성균관대, 한양대, 서강대, 중앙대, 경희대, 한국외대, 서울시립대 등
- 이공계 특성화: KAIST, POSTECH, GIST, DGIST, UNIST

어떤 대학에 대해 알고 싶으신가요?`;
  }

  /**
   * 전형 관련 감지
   */
  isAdmissionsRelated(message) {
    const keywords = ['전형', '수시', '정시', '모집', '지원', '입시'];
    return keywords.some(keyword => message.includes(keyword));
  }

  /**
   * 전형 응답
   */
  getAdmissionsResponse(message) {
    if (message.includes('수시')) {
      return `📊 **수시 전형 안내**

수시는 9월에 지원하며, 최대 6개 대학(전형)까지 지원 가능합니다.

**주요 전형 유형**:

**1. 학생부종합전형**
- 내신 + 비교과 활동 종합 평가
- 서류 평가 + 면접
- 자기소개서 폐지 (2024학년도부터)

**2. 학생부교과전형**
- 내신 성적 중심 평가
- 일부 대학은 면접 실시
- 가장 많은 인원 선발

**3. 논술전형**
- 논술 시험 + 학생부
- 논술 비중 60-80%
- 고난도 사고력 평가

**4. 실기/실적전형**
- 예체능 계열
- 실기 시험 중심

**수시 6회 제한**: 합격하면 정시 지원 불가하니 신중하게!`;
    }

    if (message.includes('정시')) {
      return `📊 **정시 전형 안내**

정시는 수능 성적으로 지원하며, 12월 말~1월 초에 지원합니다.

**모집 군별 지원**:
- **가군**: 주로 SKY 및 주요 대학
- **나군**: 가군과 겹치지 않는 대학 배치
- **다군**: 추가 기회

**각 군당 1개씩, 총 3개 대학 지원 가능**

**성적 반영 방식**:
- 표준점수: 원점수의 상대적 위치
- 백분위: 전체에서의 상대적 위치
- 등급: 9등급제

**대학별 반영 비율**:
- 인문계: 국어 > 영어 > 수학
- 자연계: 수학 > 과탐 > 국어
- 탐구영역: 2과목 평균 (상위 1과목만 반영하는 대학도 있음)

**전략**:
1. 가군: 소신 지원
2. 나군: 적정 지원
3. 다군: 안정 지원`;
    }

    return `📊 **대학 입시 전형 정보**

대학 입시는 크게 **수시**와 **정시**로 나뉩니다.

**수시** (9월):
- 학생부종합, 학생부교과, 논술 등
- 최대 6개 지원 가능

**정시** (12월~1월):
- 수능 성적 중심
- 가/나/다군 각 1개씩, 총 3개 지원

더 자세한 정보가 필요하시면 '수시' 또는 '정시'를 입력해주세요!`;
  }

  /**
   * 학생부종합전형 관련 감지
   */
  isHakjongRelated(message) {
    const keywords = ['학종', '학생부종합', '비교과', '자소서', '면접', '활동'];
    return keywords.some(keyword => message.includes(keyword));
  }

  /**
   * 학생부종합전형 응답
   */
  getHakjongResponse(message) {
    if (message.includes('비교과') || message.includes('활동')) {
      return `💡 **학생부종합전형 비교과 활동 가이드**

**평가 요소**:
1. **학업역량**: 학업 성취도, 학업 태도
2. **진로역량**: 진로 탐색 활동, 전공 적합성
3. **공동체역량**: 협업, 나눔, 배려

**추천 활동**:

**📚 교과 관련**:
- 심화 독서 및 독서 활동
- 교과 세부능력 특기사항 (세특) 관리
- 교과 우수 발표/보고서

**🔬 진로 탐색**:
- 진로 관련 동아리 활동
- 진로 체험 및 탐색
- 관심 분야 프로젝트

**🤝 봉사/리더십**:
- 학급 임원 활동
- 교내 봉사 활동
- 또래 멘토링

**⚠️ 주의사항**:
- 양보다 질! 깊이 있는 활동이 중요
- 단순 스펙 쌓기는 NO
- 자신만의 스토리 만들기`;
    }

    if (message.includes('면접')) {
      return `🎤 **학생부종합전형 면접 준비**

**면접 유형**:

**1. 서류 기반 면접**
- 제출한 학생부 내용 확인
- 활동의 진정성, 깊이 평가
- 본인이 한 활동을 구체적으로 설명

**2. 제시문 면접**
- 인문/사회/과학 지문 제시
- 논리적 사고력 평가
- 즉석에서 답변

**준비 방법**:

**📝 학생부 숙지**:
- 본인의 모든 활동 완벽 숙지
- 활동별 배경, 과정, 결과 정리
- "왜 그 활동을 했나요?" 답변 준비

**💭 예상 질문 준비**:
- 지원 동기
- 진로 계획
- 활동 중 어려웠던 점과 극복 과정
- 우리 학교/학과를 선택한 이유

**🗣️ 모의 면접**:
- 선생님, 친구와 모의 면접
- 답변 녹음 후 피드백
- 시간 관리 연습 (답변 1-2분)

**팁**:
- 솔직하고 자신감 있게
- 암기한 듯한 답변 지양
- 경청하고 질문 의도 파악`;
    }

    return `💡 **학생부종합전형 안내**

학생부종합전형(학종)은 학생부의 모든 내용을 종합적으로 평가합니다.

**평가 요소**:
- 학업역량 (내신 성적, 학업 태도)
- 진로역량 (전공 적합성, 진로 탐색)
- 공동체역량 (협업, 리더십)

**전형 방법**:
1단계: 서류 평가 (학생부)
2단계: 면접

**2024학년도 변경사항**:
- 자기소개서 폐지
- 학생부 간소화

더 자세한 내용은 '비교과' 또는 '면접'을 입력해주세요!`;
  }

  /**
   * 기본 응답
   */
  getDefaultResponse() {
    return `죄송합니다. 질문을 정확히 이해하지 못했어요. 😅

다음과 같은 주제로 질문해주세요:
- 수능 (일정, 등급, 학습 방법)
- 내신 (등급 계산, 관리 방법)
- 대학 정보 (SKY, 주요 대학)
- 전형 정보 (수시, 정시)
- 학생부종합전형 (비교과, 면접)

예시: "수능 일정 알려줘", "내신 등급 계산법", "학종 면접 준비"`;
  }

  /**
   * 추천 질문 생성
   */
  getSuggestions(message) {
    if (this.isSuneungRelated(message)) {
      return ['수능 일정', '수능 등급 계산', '모의고사 활용법'];
    }
    if (this.isNaesinRelated(message)) {
      return ['내신 올리는 법', '내신 등급 계산', '학생부 관리'];
    }
    if (this.isUniversityRelated(message)) {
      return ['SKY 정보', '주요 대학', '학과 정보'];
    }
    if (this.isAdmissionsRelated(message)) {
      return ['수시 전형', '정시 전형', '전형 선택'];
    }
    if (this.isHakjongRelated(message)) {
      return ['비교과 활동', '면접 준비', '자소서 작성'];
    }

    return ['수능 정보', '내신 관리', '대학 정보', '전형 안내', '학종 준비'];
  }

  /**
   * 대화 히스토리 조회
   */
  getHistory(userId) {
    return this.conversationHistory.get(userId) || [];
  }

  /**
   * 대화 히스토리 초기화
   */
  clearHistory(userId) {
    this.conversationHistory.delete(userId);
  }
}

module.exports = new ChatbotService();
