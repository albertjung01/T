const suneungData = {
  schedule: {
    year: 2024,
    examDate: '2023-11-16',
    scoreDate: '2023-12-08',
    timetable: [
      { period: 1, time: '08:40-10:00', subject: '국어', duration: 80 },
      { period: 2, time: '10:30-12:10', subject: '수학', duration: 100 },
      { period: 3, time: '13:10-14:20', subject: '영어', duration: 70 },
      { period: 4, time: '14:50-16:00', subject: '한국사/탐구', duration: 70 },
      { period: 5, time: '16:35-17:45', subject: '제2외국어/한문', duration: 40 }
    ]
  },
  subjects: {
    korean: {
      name: '국어',
      description: '화법과 작문, 언어와 매체, 문학',
      questionCount: 45,
      duration: 80,
      tips: [
        '독서: 비문학 지문 꼼꼼히 읽기',
        '문학: 작품 분석 능력',
        '문법: 개념 정확히 이해',
        '시간 관리가 핵심'
      ]
    },
    math: {
      name: '수학',
      description: '수학I, 수학II, 확률과 통계/미적분/기하',
      questionCount: 30,
      duration: 100,
      tips: [
        '개념 완벽 이해',
        '기출 문제 반복',
        '킬러 문제 전략적 접근',
        '계산 실수 주의'
      ]
    },
    english: {
      name: '영어',
      description: '듣기, 독해, 어휘',
      questionCount: 45,
      duration: 70,
      grading: '절대평가',
      gradeCriteria: {
        1: '90점 이상',
        2: '80점 이상',
        3: '70점 이상',
        4: '60점 이상'
      },
      tips: [
        '듣기 17문항 실수 금지',
        '어휘력 향상',
        '빈칸 추론 연습',
        '시간 배분 연습'
      ]
    },
    koreanHistory: {
      name: '한국사',
      description: '한국사 전반',
      questionCount: 20,
      duration: 30,
      grading: '절대평가',
      tips: [
        '시대별 흐름 파악',
        '주요 사건 암기',
        '자료 분석 능력'
      ]
    },
    inquiry: {
      name: '탐구 영역',
      types: ['사회탐구', '과학탐구'],
      selectCount: 2,
      subjectsPerTest: 20,
      duration: 30,
      social: [
        '생활과 윤리', '윤리와 사상', '한국지리', '세계지리',
        '동아시아사', '세계사', '경제', '정치와 법', '사회·문화'
      ],
      science: [
        '물리학I', '물리학II', '화학I', '화학II',
        '생명과학I', '생명과학II', '지구과학I', '지구과학II'
      ],
      tips: [
        '자신있는 과목 선택',
        '개념 + 문제 풀이',
        '시간 관리 철저'
      ]
    }
  },
  grades: {
    system: '상대평가 (영어, 한국사는 절대평가)',
    levels: [
      { grade: 1, percentage: 4 },
      { grade: 2, percentage: 11 },
      { grade: 3, percentage: 23 },
      { grade: 4, percentage: 40 },
      { grade: 5, percentage: 60 },
      { grade: 6, percentage: 77 },
      { grade: 7, percentage: 89 },
      { grade: 8, percentage: 96 },
      { grade: 9, percentage: 100 }
    ]
  },
  studyTips: {
    general: [
      '기출문제가 가장 중요한 교재',
      '취약 과목 집중 공략',
      '매일 규칙적인 학습',
      '실전 모의고사 연습',
      '건강 관리와 멘탈 관리'
    ],
    timeline: {
      '6개월 전': ['전 과목 1회독', '기본 개념 학습'],
      '3개월 전': ['기출 문제 풀이', '취약점 보완'],
      '1개월 전': ['실전 모의고사', '시간 관리 연습'],
      '1주일 전': ['오답 노트 복습', '컨디션 조절']
    }
  },
  general: `📚 **수능 (대학수학능력시험)**

수능은 대한민국 대학 입시의 핵심 시험입니다.

**시험 구성**:
- 국어 (80분, 45문항)
- 수학 (100분, 30문항)
- 영어 (70분, 45문항) - 절대평가
- 한국사 (30분, 20문항) - 절대평가
- 탐구 (과목당 30분, 20문항)
- 제2외국어/한문 (40분, 30문항)

**학습 전략**:
1. 기출문제 반복이 핵심
2. 취약 과목 집중 보완
3. 실전 감각 유지 (모의고사)
4. 시간 관리 연습

더 자세한 정보는 '수능 일정', '수능 등급' 등을 물어보세요!`
};

function getSuneungData() {
  return suneungData;
}

function getSuneungSchedule() {
  return suneungData.schedule;
}

function getSuneungSubjects() {
  return suneungData.subjects;
}

function getGradeSystem() {
  return suneungData.grades;
}

function getStudyTips() {
  return suneungData.studyTips;
}

module.exports = {
  getSuneungData,
  getSuneungSchedule,
  getSuneungSubjects,
  getGradeSystem,
  getStudyTips
};
