# "AI 한 줄에 새 나간 진료기록"… 바이브코딩의 그림자

**부제**: 자연어 한 마디로 앱을 만드는 시대, 개인정보는 무방비
**작성일**: 2026-04-16
**작성**: 15년차 IT보안 기자

---

## [리드]

스위스의 IT 엔지니어 토비아스 브루너(Tobias Brunner) 씨는 최근 황당한 경험을 했다. 자신의 의료기록이 인터넷에 무방비로 노출된 사실을 발견한 것이다. 그는 자신의 블로그에서 "내가 직접 영향을 받은 첫 실제 AI 바이브코딩 공포담"이라고 적었다. 의료진이 'AI에게 시키면 앱이 만들어진다'는 영상을 보고 환자관리 앱을 직접 코딩해 띄운 결과였다.

## [현황] 1년 만에 표준어가 된 '바이브코딩'

바이브코딩(Vibe Coding)은 오픈AI 공동창업자 안드레이 카파시(Andrej Karpathy)가 2025년 2월 X(옛 트위터)에 처음 쓴 말이다. 그는 "분위기에 몸을 맡기고, 코드가 존재한다는 사실조차 잊는 새로운 코딩"이라고 정의했다. 자연어로 지시만 하면 거대언어모델(LLM)이 코드를 뱉어내는 방식이다.

이 용어는 2025년 콜린스 영어사전 '올해의 단어'로 선정됐다. 위키피디아에 따르면 메리엄-웹스터 사전도 같은 해 3월 신조어로 등재했다. 비전문가가 며칠 만에 서비스를 띄우는 일이 일상이 된 것이다.

문제는 보안이다. 2025년부터 2026년 사이 글로벌 빅테크와 스타트업 곳곳에서 바이브코딩이 만든 보안 사고가 잇따르고 있다.

## [사례 1] Tea 앱 — 신분증·셀카 7만 2천 건이 그대로

가장 충격적인 사건은 미국 여성 전용 데이팅 안전 앱 'Tea(티)'다. 2025년 7월 약 7만 2천 건의 사용자 사진이 외부에 노출됐다. 디크립트(Decrypt) 보도에 따르면, 유출된 자료에는 신분증 사진 약 1만 3천 장과 게시물·댓글·메시지 속 사진 약 5만 9천 장이 포함됐다.

원인은 클라우드 저장소의 인증 설정 누락이었다. 보안 분석 업체 센트라(Sentra)는 "Tea의 파이어베이스(Firebase) 저장소가 별도의 권한 정책 없이 공개 상태로 방치돼 있었다"고 분석했다. 추가 유출에서는 100만 건이 넘는 다이렉트 메시지까지 흘러나왔다. 일부 사진의 위치정보(EXIF)가 그대로 남아 있어 사용자 거주지를 지도화한 자료까지 다크웹에 떠돈 것으로 알려졌다.

버셀(Vercel) 최고경영자(CEO) 기예르모 라우치(Guillermo Rauch)는 X에서 "AI가 저지르는 실수의 해독제는 결국 더 많은 AI"라며 "어떤 클라이언트든 서버 데이터 전체에 접근할 수 있게 되는 유형의 사고가 바이브코딩으로 늘었지만, 이는 AI 코딩만의 문제는 아니다"라고 밝혔다.

## [사례 2] 러버블(Lovable) — 1만 8천 명 데이터 유출

AI 코딩 플랫폼 '러버블(Lovable)'은 더 구조적인 문제를 드러냈다. 더 레지스터(The Register)는 2026년 2월 보도에서 "한 러버블 기반 앱에서 6건의 치명 취약점을 포함해 16건의 결함이 발견됐고, 1만 8천 명 이상의 개인정보가 노출됐다"고 전했다.

세마포(Semafor)에 따르면, 리플릿(Replit) 직원 매트 파머(Matt Palmer)가 2025년 3월 러버블 기반 앱 1,645개를 점검한 결과 170개에서 동일한 취약점을 발견했다. 이름·이메일·금융정보·AI 서비스 API 키까지 누구나 조회할 수 있는 상태였다. 해당 결함은 CVE-2025-48757로 등재됐다. 데이터베이스 행단위 보안(RLS) 정책이 비어 있었던 것이 원인으로 지목됐다.

## [사례 3] 스위스 의료앱 — 환자가 직접 폭로

브루너 씨가 블로그 'tobru.ch'에 공개한 사례는 더 직접적이다. 한 의료진이 환자관리 앱을 AI로 만들어 띄웠는데, 모든 자바스크립트와 화면 구성이 단일 HTML 파일에 들어 있었다. 데이터베이스에는 접근제어가 전혀 걸려 있지 않았고, 권한 검사는 클라이언트 자바스크립트가 전부였다. 사실상 'curl 명령어 한 줄'이면 환자 데이터가 통째로 노출되는 구조였다.

의료진은 진료 중 대화를 녹음해 두 곳의 외부 AI 서비스로 전송하는 기능까지 추가했다. 환자 동의 절차도 없었다. 브루너 씨는 "스위스 연방 데이터보호법(nDSG) 위반 가능성이 크다"고 지적했다.

## [구조적 원인] "기본값이 위험하다"

보안업계는 사고가 우연이 아니라고 본다. API 보안 기업 이스케이프(Escape.tech)는 자사 보고서에서 "공개된 바이브코딩 앱 1,400여 개를 점검한 결과 65%에서 보안 결함이, 58%에서는 1건 이상의 치명 취약점이 발견됐다"고 밝혔다. 노출된 비밀키는 400건이 넘었고, 은행 계좌 같은 민감 개인정보 노출은 175건에 달했다.

깃가디언(GitGuardian) 'State of Secrets Sprawl 2026' 보고서는 "2025년 한 해 깃허브 공개 커밋에서 새로 발견된 하드코딩 비밀이 2,865만 건으로 전년 대비 34% 늘었다"며 "클로드 코드(Claude Code) 보조 커밋의 비밀 누출률(3.2%)이 깃허브 전체 평균(1.5%)의 두 배가 넘는다"고 분석했다.

## [국내 진단] "주니어 개발자 코드처럼 다뤄야"

국내에서도 같은 우려가 제기된다. SK쉴더스는 최근 보안 블로그에서 "AI 코딩 과정에서 API 키와 고객 데이터가 프롬프트와 함께 외부 서버로 전송될 수 있고, 실제 기밀이 무심코 입력된 사례가 보고됐다"고 밝혔다.

CIO 코리아는 2025년 12월 클로드 코드, 오픈AI 코덱스, 커서, 리플릿, 데빈 등 5개 도구로 만든 15개 앱을 평가한 결과 총 69개의 취약점이 발견됐다고 전했다. 다수가 '높음' 등급이었다.

전문가들은 대체로 두 가지 처방을 제시한다. 첫째, AI 생성 코드를 '주니어 개발자가 짠 코드'로 간주해 반드시 보안 코드 리뷰를 거치는 것. 둘째, OWASP Top 10 같은 공인 보안 기준을 프롬프트 단계에서 명시적으로 요구하는 것이다.

## [마무리]

AI는 코드를 짤 수 있다. 그러나 책임은 못 진다. 전문가들은 한목소리로 "코딩의 민주화는 곧 보안 책임의 분산을 뜻한다"고 말한다. 자연어 한 마디로 앱을 띄울 수 있는 시대, 개인정보의 마지막 방어선은 결국 사람이 들여다본 코드라는 점은 변하지 않았다.

---

## 출처

1. Tobias Brunner, "An AI Vibe Coding Horror Story", tobru.ch — https://www.tobru.ch/an-ai-vibe-coding-horror-story/
2. Decrypt, "Tea App That Claimed to Protect Women Exposes 72,000 IDs in Epic Security Fail" — https://decrypt.co/331961/tea-app-claimed-protect-women-exposes-72000-ids-epic-security-fail
3. Sentra, "How the Tea App Got Blindsided on Data Security" — https://www.sentra.io/blog/how-the-tea-app-got-blindsided-on-data-security
4. Simon Willison, "Official statement from Tea on their data leak" — https://simonwillison.net/2025/Jul/26/official-statement-from-tea/
5. Guillermo Rauch X post — https://x.com/rauchg/status/1949197451900158444
6. The Register, "AI-built app on Lovable exposed 18K users, researcher claims" — https://www.theregister.com/2026/02/27/lovable_app_vulnerabilities/
7. Semafor, "The hottest new vibe coding startup Lovable is a sitting duck for hackers" — https://www.semafor.com/article/05/29/2025/the-hottest-new-vibe-coding-startup-lovable-is-a-sitting-duck-for-hackers
8. Escape.tech, "The State of Security of Vibe Coded Apps" — https://escape.tech/state-of-security-of-vibe-coded-apps
9. CSA Lab, "Vibe Coding Security Crisis: Credential Sprawl and SDLC Debt" — https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-security-vibe-coding-202/
10. Wikipedia, "Vibe coding" — https://en.wikipedia.org/wiki/Vibe_coding
11. Andrej Karpathy X post (2025-02-02) — https://x.com/karpathy/status/1886192184808149383
12. SK쉴더스 보안 블로그, "하루 만에 AI로 만든 앱, 보안은 안전할까?" — https://www.skshieldus.com/blog-security/security-trend-idx-69
13. CIO Korea, "바이브 코딩 확산, 보안에는 주의 필요" — https://www.cio.com/article/4117131/
14. Kaspersky, "Security risks of vibe coding and LLM assistants for developers" — https://www.kaspersky.com/blog/vibe-coding-2025-risks/54584/
