const universities = {
  sky: [
    {
      id: 1,
      name: '서울대학교',
      englishName: 'Seoul National University',
      location: '서울 관악구',
      type: '국립',
      established: 1946,
      characteristics: ['국내 최고 명문', '연구 중심', '우수한 교수진'],
      majors: ['인문계열', '사회계열', '자연계열', '공학계열', '의학계열'],
      admissions: {
        susi: ['지역균형선발전형', '일반전형'],
        jeongsi: ['가군', '나군']
      },
      cutline: {
        humanities: '1.5등급',
        natural: '1.5등급',
        engineering: '1.8등급'
      }
    },
    {
      id: 2,
      name: '연세대학교',
      englishName: 'Yonsei University',
      location: '서울 서대문구',
      type: '사립',
      established: 1885,
      characteristics: ['국제화', '리버럴아츠', '활발한 대외활동'],
      majors: ['인문계열', '사회계열', '자연계열', '공학계열', '의학계열', '생활과학'],
      admissions: {
        susi: ['학생부종합(활동우수형)', '학생부종합(국제형)', '논술전형'],
        jeongsi: ['가군']
      },
      cutline: {
        humanities: '1.8등급',
        natural: '1.8등급',
        engineering: '2.0등급'
      }
    },
    {
      id: 3,
      name: '고려대학교',
      englishName: 'Korea University',
      location: '서울 성북구',
      type: '사립',
      established: 1905,
      characteristics: ['실용 교육', '높은 취업률', '활발한 동문 네트워크'],
      majors: ['인문계열', '사회계열', '자연계열', '공학계열', '의학계열', '사범계열'],
      admissions: {
        susi: ['학생부종합(계열적합형)', '학교추천', '논술전형'],
        jeongsi: ['가군']
      },
      cutline: {
        humanities: '1.8등급',
        natural: '2.0등급',
        engineering: '2.2등급'
      }
    }
  ],
  major: [
    {
      id: 4,
      name: '성균관대학교',
      type: '사립',
      location: '서울 종로구 / 수원',
      characteristics: ['삼성 지원', '우수한 장학금', '취업률']
    },
    {
      id: 5,
      name: '한양대학교',
      type: '사립',
      location: '서울 성동구',
      characteristics: ['공학 특성화', '실용 교육', '산학협력']
    },
    {
      id: 6,
      name: '서강대학교',
      type: '사립',
      location: '서울 마포구',
      characteristics: ['소수정예', '경제/경영 강세', '높은 학생 만족도']
    },
    {
      id: 7,
      name: '중앙대학교',
      type: '사립',
      location: '서울 동작구',
      characteristics: ['종합대학', '예체능 강세', '다양한 전공']
    },
    {
      id: 8,
      name: '경희대학교',
      type: '사립',
      location: '서울 동대문구',
      characteristics: ['국제화', '평화 복지', '의학계열 우수']
    }
  ],
  special: [
    {
      id: 9,
      name: 'KAIST',
      fullName: '한국과학기술원',
      type: '국립',
      location: '대전',
      characteristics: ['이공계 최고', '전액 장학금', '연구 중심', '영어 강의']
    },
    {
      id: 10,
      name: 'POSTECH',
      fullName: '포항공과대학교',
      type: '사립',
      location: '경북 포항',
      characteristics: ['소수정예', '연구 중심', '우수한 시설']
    },
    {
      id: 11,
      name: 'GIST',
      fullName: '광주과학기술원',
      type: '국립',
      location: '광주',
      characteristics: ['과학기술 특성화', '전액 장학금']
    }
  ]
};

function getUniversityData() {
  return universities;
}

function getUniversityById(id) {
  const allUniversities = [...universities.sky, ...universities.major, ...universities.special];
  return allUniversities.find(univ => univ.id === id);
}

function getUniversityByName(name) {
  const allUniversities = [...universities.sky, ...universities.major, ...universities.special];
  return allUniversities.find(univ => univ.name.includes(name) || name.includes(univ.name));
}

module.exports = {
  getUniversityData,
  getUniversityById,
  getUniversityByName
};
