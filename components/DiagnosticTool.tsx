
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosticToolProps {
  onBack: () => void;
}

const QUESTIONS = [
  { 
    id: 'q1', 
    text: 'Q1. 당신이 생각하는 이상적인 ‘얼굴 노출’ 범위는?', 
    options: [
      { text: '👤 (얼굴 O) 내 매력을 100% 보여주는 이목구비 전체 공개', val: 1 }, 
      { text: '🎭 (얼굴 X) 얼굴은 부담. 목소리나 화면, 캐릭터로 승부', val: 2 }, 
      { text: '🕶️ (전략적) 상황에 따라 마스크나 선글라스 등으로 일부 공개', val: 3 }
    ] 
  },
  { 
    id: 'q2', 
    text: 'Q2. 당신이 주력하고 싶은 영상의 호흡(길이)은?', 
    options: [
      { text: '⚡ (숏폼) 1분 미만! 짧고 굵게 임팩트를 남기는 승부사', val: 1 }, 
      { text: '🎬 (롱폼) 10분 내외. 깊이 있는 내용이나 서사를 담기', val: 2 }, 
      { text: '📻 (상관없음/라이브) 길이는 무관. 실시간 소통 중심', val: 3 }
    ] 
  },
  { 
    id: 'q3', 
    text: 'Q3. 콘텐츠를 만들 때 가장 중요하게 생각하는 ‘핵심 무기’는?', 
    options: [
      { text: '🍿 (재미/자극) 보는 순간 빵 터지는 압도적 몰입감', val: 1 }, 
      { text: '💡 (정보/지식) 남들에게 도움이 되는 꿀팁과 노하우', val: 2 }, 
      { text: '🌊 (감성/공감) 사람들의 마음을 움직이는 위로와 편안함', val: 3 },
      { text: '⚙️ (기술/제작) 화려한 편집과 깔끔하게 정리된 고퀄리티', val: 4 }
    ] 
  },
  { 
    id: 'q4', 
    text: 'Q4. 카메라 앞에서의(혹은 녹음할 때) 나의 텐션은?', 
    options: [
      { text: '🔥 평소보다 200% UP! 과장된 리액션과 하이 텐션', val: 1 }, 
      { text: '🎤 차분하고 신뢰감 있는 목소리. 전문가 모드', val: 2 }, 
      { text: '☕ 옆집 친구나 형/누나처럼 친근하고 편안한 톤', val: 3 },
      { text: '🎭 아예 다른 인격(부캐)에 빙의되어 연기함', val: 4 }
    ] 
  },
  { 
    id: 'q5', 
    text: 'Q5. 시청자를 사로잡는 나만의 ‘후킹(Hooking)’ 방식은?', 
    options: [
      { text: '📸 (비주얼) 충격적인 썸네일과 시각적인 자극', val: 1 }, 
      { text: '🎬 (상황극) "아, 맞다 저럴 때 있지!" 하는 공감대 형성', val: 2 }, 
      { text: '🥊 (팩폭/말빨) 뼈 때리는 사이다 발언이나 촌철살인 멘트', val: 3 },
      { text: '✂️ (편집/형식) 현란한 자막과 빠른 화면 전환 속도', val: 4 }
    ] 
  },
  { 
    id: 'q6', 
    text: 'Q6. 정보를 전달할 때 선호하는 방식은?', 
    options: [
      { text: '🖍️ 칠판에 써가며 일타강사처럼 강의하기', val: 1 }, 
      { text: '📝 핵심만 요약해서 3줄 요약, 리스트로 정리하기', val: 2 }, 
      { text: '🔍 논문, 기사, 근거 자료를 화면에 띄우고 분석하기', val: 3 },
      { text: '📊 PPT나 장표를 깔끔하게 띄워놓고 설명하기', val: 4 }
    ] 
  },
  { 
    id: 'q7', 
    text: 'Q7. 당신의 콘텐츠 소재는 주로 어디서 오나요?', 
    options: [
      { text: '🏠 내 일상, 내 경험, 내가 직접 느끼는 감정들', val: 1 }, 
      { text: '🌐 인터넷에 떠도는 밈(Meme), 유행하는 이슈거리', val: 2 }, 
      { text: '📚 내가 공부하고 연구한 전문 지식이나 기술', val: 3 },
      { text: '🎮 게임, 기기, 조립 키트 등 플레이하는 대상', val: 4 }
    ] 
  },
  { 
    id: 'q8', 
    text: 'Q8. (얼굴 공개 시) 표정 연기나 제스처는 어떤가요?', 
    options: [
      { text: '🤪 얼굴 근육을 다 쓴다. 확실하게 망가질 수 있다', val: 1 }, 
      { text: '✨ 예쁘고 잘생기게, 혹은 힙하게. 보정 필터 적극 활용', val: 2 }, 
      { text: '🗣️ 표정보다는 말의 내용이 중요해서 제스처는 거들 뿐', val: 3 },
      { text: '👀 눈빛으로 제압하거나, 카리스마 있는 무표정 유지', val: 4 }
    ] 
  },
  { 
    id: 'q9', 
    text: 'Q9. (얼굴 비공개 시) 화면을 무엇으로 채우고 싶나요?', 
    options: [
      { text: '🔠 현란한 자막 텍스트와 짤방 이미지가 쉴 새 없이 나옴', val: 1 }, 
      { text: '👐 내 손(Hand)이나 요리/조립하는 과정의 클로즈업', val: 2 }, 
      { text: '🖥️ 컴퓨터 화면 녹화(게임 플레이, 튜토리얼, 코딩 등)', val: 3 },
      { text: '🌅 감성적인 배경 영상이나 사진 슬라이드 쇼', val: 4 }
    ] 
  },
  { 
    id: 'q10', 
    text: 'Q10. 오디오(사운드) 전략은?', 
    options: [
      { text: '🎙️ 내 실제 목소리를 그대로 쓴다 (혹은 약간의 보정)', val: 1 }, 
      { text: '🤖 AI 보이스(TTS)를 활용해 썰을 푼다', val: 2 }, 
      { text: '🎧 말소리 없이 ASMR 사운드나 배경음악만 넣는다', val: 3 },
      { text: '🔊 효과음(뿅, 띠용)을 적극적으로 사용해 빈틈을 메운다', val: 4 }
    ] 
  },
  { 
    id: 'q11', 
    text: 'Q11. 시청자와 어떤 관계를 맺고 싶나요?', 
    options: [
      { text: '💎 나를 우러러보는 팬 (전문가/워너비 포지션)', val: 1 }, 
      { text: '🤝 티키타카 댓글 달며 노는 짱친 (동네 형/언니 포지션)', val: 2 }, 
      { text: '🤫 조용히 내 영상을 소비하고 가는 구독자 (제공자 포지션)', val: 3 },
      { text: '🌌 내 세계관에 푹 빠진 과몰입러들 (부캐 포지션)', val: 4 }
    ] 
  },
  { 
    id: 'q12', 
    text: 'Q12. 콘텐츠 제작 시 가장 공들이는 부분은?', 
    options: [
      { text: '📝 (대본/기획) 무슨 말을 할지, 어떻게 빌드업 할지 설계', val: 1 }, 
      { text: '🎬 (촬영/연기) 현장에서의 리얼함, 표정, 순간적인 애드리브', val: 2 }, 
      { text: '✂️ (편집/후보정) 컷 편집, 자막 배치, 시각 효과 때깔 내기', val: 3 },
      { text: '🔍 (자료조사) 팩트 체크, 정확한 데이터 수집', val: 4 }
    ] 
  },
  { 
    id: 'q13', 
    text: 'Q13. 누군가 내 영상에 반박 댓글을 달았다면?', 
    options: [
      { text: '🧐 "오호, 토론해봅시다." 팩트로 정정하거나 내 논리 전개', val: 1 }, 
      { text: '🤣 "너 말이 맞음 ㅋㅋ" 쿨하게 인정하거나 개그로 승화', val: 2 }, 
      { text: '❤️ 상처받지만 티 내지 않고 조용히 하트를 누른다', val: 3 },
      { text: '🎭 내 캐릭터 컨셉에 맞춰서 답글을 단다 (컨셉 유지)', val: 4 }
    ] 
  },
  { 
    id: 'q14', 
    text: 'Q14. ‘숏폼’을 만든다면 선호하는 스타일은?', 
    options: [
      { text: '🕺 유행하는 챌린지 댄스나 밈 따라하기', val: 1 }, 
      { text: '📽️ 1분 안에 영화나 정보 한 편 뚝딱 요약하기', val: 2 }, 
      { text: '🎞️ 긴 영상의 하이라이트만 잘라서 올리기', val: 3 },
      { text: '🙋 시청자 질문에 1분 안에 빠르게 답변해주기', val: 4 }
    ] 
  },
  { 
    id: 'q15', 
    text: 'Q15. 당신의 채널이 어떻게 기억되길 바라나요?', 
    options: [
      { text: '🍭 "이 사람 영상 보면 시간 순삭임" (도파민 중독)', val: 1 }, 
      { text: '🛡️ "이 사람 말은 믿고 본다" (신뢰/전문성)', val: 2 }, 
      { text: '🕯️ "오늘 하루 위로받고 간다" (힐링/감성)', val: 3 },
      { text: '🎨 "편집 센스 미쳤다 / 금손이다" (기술자)', val: 4 }
    ] 
  },
];

const SUBTYPE_DATA: Record<number, any> = {
  1: { title: "먹방 어그로 후킹형", emoji: "🍗", identity: "도파민 셰프", killer: { q7: 1 }, basics: { q1: 1, q2: 1, q3: 1, q5: 1 } },
  2: { title: "표정 오바 과몰입형", emoji: "🤪", identity: "살아있는 이모티콘", killer: { q8: 1 }, basics: { q1: 1, q2: 1, q3: 1, q4: 1 } },
  3: { title: "상황극 공감 찔러형", emoji: "🎭", identity: "일상의 인류학자", killer: { q5: 2 }, basics: { q1: 1, q2: 1, q3: 1, q7: 1 } },
  4: { title: "얼굴 필터 개그폭주형", emoji: "✨", identity: "반전의 마법사", killer: { q8: 2 }, basics: { q1: 1, q2: 1, q3: 1, q13: 2 } },
  5: { title: "한 방 팩폭 꽂기형", emoji: "🥊", identity: "언어의 스나이퍼", killer: { q5: 3 }, basics: { q1: 1, q2: 1, q3: 1, q15: 2 } },
  6: { title: "한 문장 똑똑이형", emoji: "🤓", identity: "지식 압축기", killer: { q6: 2 }, basics: { q1: 1, q2: 1, q3: 2, q14: 4 } },
  7: { title: "화이트보드 급처방형", emoji: "👨‍🏫", identity: "모바일 일타강사", killer: { q6: 1 }, basics: { q1: 1, q2: 1, q3: 2, q11: 1 } },
  8: { title: "숫자 좋아 리스트덕후형", emoji: "📝", identity: "큐레이션의 제왕", killer: { q12: 1 }, basics: { q1: 1, q2: 1, q3: 2, q6: 2 } },
  9: { title: "진중함 가득 지식정보형", emoji: "📚", identity: "지식 소믈리에", killer: { q4: 2 }, basics: { q1: 1, q2: 2, q3: 2, q15: 2 } },
  10: { title: "전문가 포스 철철형", emoji: "👔", identity: "업계의 현자", killer: { q11: 1 }, basics: { q1: 1, q2: 2, q3: 2, q8: 4 } },
  11: { title: "논문 뜯어먹기형", emoji: "🧐", identity: "데이터 탐정", killer: { q6: 3 }, basics: { q1: 1, q2: 2, q3: 2, q12: 4 } },
  12: { title: "팩트 정정 집요형", emoji: "🔎", identity: "디지털 검사", killer: { q13: 1 }, basics: { q1: 1, q2: 2, q3: 2, q5: 3 } },
  13: { title: "인생 썰 조곤조곤형", emoji: "☕", identity: "랜선 베프", killer: { q7: 1 }, basics: { q3: 3, q4: 3 } },
  14: { title: "경험담 진심 조언형", emoji: "🤝", identity: "인생 선배", killer: { q14: 4 }, basics: { q3: 3, q11: 1 } },
  15: { title: "멘탈 토닥 위로형", emoji: "🕯️", identity: "새벽 감성 지킴이", killer: { q15: 3 }, basics: { q3: 3, q4: 2 } },
  16: { title: "부캐 세계관 몰입형", emoji: "👺", identity: "세계관 설계자", killer: { q13: 4 }, basics: { q4: 4, q11: 4 } },
  17: { title: "텐션 미친 광기형", emoji: "🔥", identity: "인간 에너자이저", killer: { q4: 1 }, basics: { q3: 1, q15: 1 } },
  18: { title: "차분한 냉철 분석형", emoji: "❄️", identity: "AI 분석가", killer: { q5: 3 }, basics: { q4: 2 } },
  19: { title: "자막만 봐도 중독형", emoji: "🎞️", identity: "타이포그래피 아티스트", killer: { q9: 1 }, basics: { q1: 2, q3: 1, q5: 4 } },
  20: { title: "TTS 썰공장형", emoji: "🤖", identity: "이야기 큐레이터", killer: { q10: 2 }, basics: { q1: 2, q3: 1, q7: 2 } },
  21: { title: "캡처 강조 빨간펜형", emoji: "🖍️", identity: "정보의 내비게이터", killer: { q9: 1 }, basics: { q1: 2, q3: 2, q6: 2 } },
  22: { title: "목소리 다큐 장인형", emoji: "🎙️", identity: "오디오 시네마 감독", killer: { q4: 2 }, basics: { q1: 2, q3: 3, q12: 1 } },
  23: { title: "심야 라디오 감성형", emoji: "📻", identity: "디지털 동반자", killer: { q4: 3 }, basics: { q1: 2, q3: 3, q11: 2 } },
  24: { title: "ASMR 지식 속삭임형", emoji: "👂", identity: "뇌 마사지사", killer: { q10: 3 }, basics: { q1: 2, q3: 3 } },
  25: { title: "PPT 설명 깔끔형", emoji: "📊", identity: "논리 설계자", killer: { q6: 4 }, basics: { q1: 2, q3: 2, q4: 2 } },
  26: { title: "손만 나오는 설명요정형", emoji: "👐", identity: "핸드 아티스트", killer: { q9: 2 }, basics: { q1: 2, q3: 2, q12: 3 } },
  27: { title: "화면 녹화 튜토리얼형", emoji: "💻", identity: "디지털 길라잡이", killer: { q9: 3 }, basics: { q1: 2, q3: 2, q7: 3 } },
  28: { title: "무얼드 게임 집중형", emoji: "🎮", identity: "피지컬 괴물", killer: { q7: 4 }, basics: { q1: 2, q9: 3 } },
  29: { title: "타임랩스 뚝딱제작형", emoji: "🏗️", identity: "시간의 마법사", killer: { q14: 3 }, basics: { q1: 2, q7: 4, q3: 4 } },
  30: { title: "자동화 실험 덕후형", emoji: "🧪", identity: "디지털 매드 사이언티스트", killer: { q7: 3 }, basics: { q1: 2, q12: 4 } },
  31: { title: "밈 수집 번역요정형", emoji: "🌍", identity: "문화의 가교", killer: { q2: 1 }, basics: { q1: 2, q7: 2 } },
  32: { title: "데이터 깔끔 요약형", emoji: "📉", identity: "인포그래픽 디자이너", killer: { q6: 2 }, basics: { q1: 2, q3: 2 } },
  33: { title: "AI 스토리 생성형", emoji: "👾", identity: "미래의 창작자", killer: { q10: 2 }, basics: { q1: 2, q9: 4 } },
  34: { title: "초반 얼굴 인사형", emoji: "👋", identity: "신뢰의 협상가", killer: { q14: 4 }, basics: { q1: 3, q14: 4 } },
  35: { title: "숏폼 얼굴 / 롱폼 무얼형", emoji: "🎭", identity: "이중 전략가", killer: { q2: 3 }, basics: { q1: 3 } },
  36: { title: "라이브 한정 얼굴 공개형", emoji: "🔓", identity: "희소성 마케터", killer: { q2: 3 }, basics: { q1: 3 } },
  37: { title: "이벤트성 얼굴 깜짝형", emoji: "🎉", identity: "드라마 메이커", killer: { q15: 1 }, basics: { q1: 3 } }
};

const DiagnosticTool: React.FC<DiagnosticToolProps> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loadingText, setLoadingText] = useState("성공 DNA 추출 중...");

  const currentQ = QUESTIONS[currentIdx];

  useEffect(() => {
    if (isAnalyzing) {
      const texts = ["데이터 매핑 중...", "알고리즘 적합성 시뮬레이션 중...", "떡상 포지션 확정 중...", "PD의 시크릿 리포트 생성 중..."];
      let i = 0;
      const interval = setInterval(() => { setLoadingText(texts[i % texts.length]); i++; }, 800);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const handleStart = () => setCurrentIdx(0);

  const calculateResult = (userAnswers: Record<string, number>) => {
    let bestType = 1;
    let maxScore = -1;

    Object.entries(SUBTYPE_DATA).forEach(([id, data]) => {
      let score = 0;
      Object.entries(data.killer).forEach(([qId, targetVal]) => {
        if (userAnswers[qId] === targetVal) score += 5;
      });
      Object.entries(data.basics).forEach(([qId, targetVal]) => {
        if (userAnswers[qId] === targetVal) score += 2;
      });

      if (score > maxScore) {
        maxScore = score;
        bestType = parseInt(id);
      }
    });

    return bestType;
  };

  const getFullReport = (idx: number) => {
    const data = SUBTYPE_DATA[idx];
    return {
      title: data.title,
      emoji: data.emoji,
      identity: data.identity,
      whoDesc: `AI PD가 당신의 답변 데이터를 기반으로 최적의 채널 포지셔닝을 도출했습니다. 당신은 "${data.title}" 유형으로, ${data.identity}로서의 강력한 잠재력을 가지고 있습니다. 시청자들의 니즈를 정확히 파고드는 기획과 일관된 브랜딩을 통해 독보적인 채널을 구축할 수 있습니다.`,
      advice: [
        { title: "0.1초의 미학 (The First Frame)", desc: "영상이 시작되자마자 인사는 생략하십시오. 가장 자극적이고 당신의 유형을 잘 보여주는 장면을 썸네일과 오프닝 1초에 배치해야 합니다." },
        { title: "데이터 기반의 실행", desc: "단순히 수치만 보지 마십시오. 시청자가 당신의 콘텐츠에서 무엇을 기대하는지 '욕망'의 관점에서 해석하고 즉각 영상에 반영하십시오." },
        { title: "꾸준한 알고리즘 피딩", desc: "유튜브 성장의 핵심은 일관성입니다. 매일 PD가 주는 3가지 퀘스트를 수행하며 알고리즘이 당신을 학습할 시간을 주십시오." }
      ],
      prodNote: [
        { title: "[장비 추천]", desc: "고가의 장비보다는 유형에 최적화된 마이크와 조명 세팅에 우선 투자하십시오. 당신의 매력이 가장 돋보이는 환경을 구축해야 합니다." },
        { title: "[편집 가이드]", desc: "이 유형은 리텐션 방어용 필수 컷 리스트를 따르는 것이 중요합니다. 시청자가 이탈하는 구간을 데이터로 분석하여 보완하십시오." }
      ]
    };
  };

  const handleAnswer = (val: number) => {
    const nextAnswers = { ...answers, [QUESTIONS[currentIdx].id]: val };
    setAnswers(nextAnswers);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        const resultIdx = calculateResult(nextAnswers);
        setResult(getFullReport(resultIdx));
        setIsAnalyzing(false);
        setCurrentIdx(QUESTIONS.length);
      }, 3500);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {currentIdx === -1 && (
            <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
              <div className="w-24 h-24 bg-highlight rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <span className="text-5xl text-white">🎬</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-gray-900">유튜버 유형 테스트 🧬</h1>
              <p className="text-xl md:text-2xl text-gray-500 font-bold mb-12">AI 유튜브 PD가 당신의 성공 DNA를 정밀 분석하여<br/>37가지 유형 중 가장 확률 높은 '떡상 포지션'을 제안합니다.</p>
              <button onClick={handleStart} className="px-16 py-8 bg-black text-white rounded-[2.5rem] text-2xl font-black shadow-2xl hover:bg-highlight transition-all">테스트 시작하기 (총 15문항) 🚀</button>
            </motion.div>
          )}

          {currentIdx >= 0 && currentIdx < QUESTIONS.length && !isAnalyzing && (
            <motion.div key={currentIdx} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="pt-24">
              <div className="text-center mb-16 px-4">
                <div className="text-sm font-black text-gray-400 mb-6 uppercase tracking-widest text-[10px]">Question {currentIdx + 1} / {QUESTIONS.length}</div>
                <h2 className="text-2xl md:text-4xl font-black leading-tight text-gray-900">
                  {currentQ.text}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {currentQ.options.map((opt, idx) => (
                  <button key={idx} onClick={() => handleAnswer(opt.val)} className="p-8 text-left border-2 border-gray-100 rounded-[2rem] hover:border-highlight hover:bg-highlight/5 transition-all text-xl md:text-2xl font-bold flex items-center group">
                    <span className="flex-1">{opt.text}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 text-highlight">→</span>
                  </button>
                ))}
              </div>
              <div className="mt-16 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-highlight" initial={{ width: 0 }} animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }} />
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-48">
              <div className="relative w-40 h-40 mx-auto mb-16">
                <motion.div className="absolute inset-0 border-8 border-highlight border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                <div className="absolute inset-0 flex items-center justify-center text-5xl">🧬</div>
              </div>
              <h2 className="text-4xl font-black mb-6">{loadingText}</h2>
              <p className="text-gray-400 text-xl font-bold italic">"AI 유튜브 PD가 당신의 떡상 포지션을 계산 중입니다."</p>
            </motion.div>
          )}

          {result && !isAnalyzing && (
            <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="pt-10">
              <div className="bg-black text-white p-8 md:p-20 rounded-[4rem] shadow-3xl relative mb-12 min-h-screen overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-4 bg-highlight z-10" />
                
                <div className="text-center mb-16 pt-12">
                  <div className="text-8xl mb-8">{result.emoji}</div>
                  <h3 className="text-4xl md:text-7xl font-black mb-4 leading-tight text-center px-4">
                    "{result.title}"
                  </h3>
                </div>

                <div className="max-w-3xl mx-auto px-4 relative z-0">
                  <div className="mb-20">
                    <h4 className="text-2xl md:text-3xl font-black mb-8 text-highlight flex items-center">
                      🩺 Core Identity: {result.identity}
                    </h4>
                    <p className="text-xl md:text-2xl leading-[1.8] text-gray-300 font-medium whitespace-pre-line">
                      {result.whoDesc}
                    </p>
                  </div>
                  
                  <div className="mb-20">
                    <h4 className="text-2xl md:text-3xl font-black mb-10 italic text-white flex items-center">
                      ⚡ PD's Strategic Imperative (성공 전략)
                    </h4>
                    <div className="space-y-12">
                      {result.advice.map((item: any, i: number) => (
                        <div key={i} className="group">
                          <div className="text-xl md:text-2xl font-black text-highlight mb-4 flex items-start">
                            <span className="mr-4">●</span>
                            <span>{item.title}</span>
                          </div>
                          <p className="text-lg md:text-xl leading-relaxed text-gray-400 ml-8 font-medium">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-24">
                    <h4 className="text-2xl md:text-3xl font-black mb-10 italic text-white flex items-center">
                      🎬 Production Note (제작 디테일)
                    </h4>
                    <div className="grid grid-cols-1 gap-8">
                      {result.prodNote.map((item: any, i: number) => (
                        <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                          <div className="text-xl font-black text-highlight mb-3">{item.title}</div>
                          <p className="text-lg text-gray-300 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full bg-white/5 backdrop-blur-3xl p-10 md:p-16 rounded-[4.5rem] border border-white/10 shadow-3xl text-center mb-10">
                    {!submitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-10">
                        <div className="space-y-6">
                          <div className="inline-block px-5 py-1.5 bg-highlight text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-2 shadow-xl">Secret Premium Access</div>
                          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight italic">시크릿 정밀 분석 리포트 열기 🔑</h4>
                          <div className="text-lg md:text-xl text-gray-300 font-bold leading-relaxed">
                            <p>지금 문의를 남겨주시는 분들께는 리포트 전문,</p>
                            <p>유피디의 초밀착 조언, 내 유형에 딱 맞는</p>
                            <p>맞춤형 첫 영상 시나리오를 보내드립니다.</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                          <input type="text" required placeholder="성함 (필수)" className="bg-white/10 border border-white/20 p-6 rounded-[2.5rem] text-white text-lg outline-none focus:border-highlight transition-all placeholder:text-gray-600 text-center font-bold" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                          <input type="email" required placeholder="이메일 주소 (필수)" className="bg-white/10 border border-white/20 p-6 rounded-[2.5rem] text-white text-lg outline-none focus:border-highlight transition-all placeholder:text-gray-600 text-center font-bold" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        </div>
                        
                        <button className="w-full md:w-auto px-10 md:px-16 py-6 md:py-8 bg-highlight text-white rounded-[3rem] text-lg md:text-2xl font-black shadow-2xl hover:scale-105 transition-all whitespace-nowrap">정밀 리포트 & 맞춤 시나리오 즉시 수령하기</button>
                      </form>
                    ) : (
                      <div className="py-20 space-y-10">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">📩</motion.div>
                        <h4 className="text-4xl md:text-6xl font-black text-white">신청 완료!</h4>
                        <p className="text-xl md:text-2xl text-gray-300 font-bold leading-relaxed">당신의 떡상 로드맵이 담긴 비밀 문서를 <br/><span className="text-highlight font-black underline decoration-white/30">{form.email}</span>로 <br/>24시간 내에 발송하겠습니다!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center mt-20 px-6">
                <button onClick={() => { setCurrentIdx(-1); setResult(null); setSubmitted(false); }} className="px-12 py-7 bg-white border-4 border-black rounded-[2.5rem] font-black text-2xl hover:bg-gray-100 transition-all shadow-xl">테스트 다시 하기 🔄</button>
                <button onClick={onBack} className="px-12 py-7 bg-black text-white rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-highlight transition-all">홈으로 돌아가기 🏠</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiagnosticTool;
