const admissionsData = {
  susi: {
    name: '수시 전형',
    period: '9월',
    maxApplications: 6,
    types: {
      hakjong: {
        name: '학생부종합전형',
        description: '학생부의 모든 내용을 종합적으로 평가',
        evaluation: ['학업역량', '진로역량', '공동체역량'],
        process: ['1단계: 서류평가', '2단계: 면접'],
        weight: {
          documents: '70-80%',
          interview: '20-30%'
        },
        tips: [
          '내신과 비교과 활동의 균형',
          '전공 관련 깊이 있는 활동',
          '활동의 진정성과 성장 과정 중요'
        ]
      },
      gyogwa: {
        name: '학생부교과전형',
        description: '내신 성적을 중심으로 평가',
        evaluation: ['교과 성적', '출결', '봉사'],
        process: ['서류평가', '일부 학교 면접'],
        weight: {
          naesin: '90-100%',
          others: '0-10%'
        },
        tips: [
          '내신 관리가 가장 중요',
          '주요 과목 집중 관리',
          '꾸준한 성적 유지'
        ]
      },
      nonsul: {
        name: '논술전형',
        description: '논술 시험과 학생부를 평가',
        evaluation: ['논술', '학생부'],
        process: ['논술 시험', '학생부 반영'],
        weight: {
          nonsul: '60-80%',
          hakjungbu: '20-40%'
        },
        tips: [
          '기출문제 반복 연습',
          '시간 관리 훈련',
          '논리적 사고력 배양'
        ]
      }
    }
  },
  jeongsi: {
    name: '정시 전형',
    period: '12월 말 ~ 1월 초',
    maxApplications: 3,
    groups: {
      ga: {
        name: '가군',
        period: '12월 말',
        characteristics: ['주요 대학 다수', 'SKY 포함']
      },
      na: {
        name: '나군',
        period: '1월 초',
        characteristics: ['가군과 분산 배치', '다양한 선택지']
      },
      da: {
        name: '다군',
        period: '1월 초',
        characteristics: ['추가 기회', '안정 지원']
      }
    },
    scoreTypes: {
      standard: {
        name: '표준점수',
        description: '원점수의 상대적 위치를 나타내는 점수',
        usage: '주로 상위권 대학'
      },
      percentile: {
        name: '백분위',
        description: '하위 학생 비율을 나타내는 점수',
        usage: '중위권 대학'
      },
      grade: {
        name: '등급',
        description: '9등급제로 구분',
        usage: '일부 대학'
      }
    },
    strategy: [
      '가군: 소신 지원 (목표 대학)',
      '나군: 적정 지원 (안정적 합격 가능)',
      '다군: 안정 지원 (확실한 합격)'
    ]
  },
  calendar: {
    '3월': ['학생부 관리 시작', '진로 탐색'],
    '6월': ['6월 모의평가', '수시 전략 수립'],
    '9월': ['9월 모의평가', '수시 원서 접수', '수능 최종 준비'],
    '11월': ['수능 시험', '수시 논술/면접'],
    '12월': ['수능 성적 발표', '정시 전략 수립', '수시 최종 합격 발표'],
    '1월': ['정시 원서 접수', '추가 합격']
  }
};

function getAdmissionsData() {
  return admissionsData;
}

function getSusiInfo() {
  return admissionsData.susi;
}

function getJeongsiInfo() {
  return admissionsData.jeongsi;
}

function getAdmissionsCalendar() {
  return admissionsData.calendar;
}

module.exports = {
  getAdmissionsData,
  getSusiInfo,
  getJeongsiInfo,
  getAdmissionsCalendar
};
