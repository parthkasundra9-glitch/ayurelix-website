import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiArrowRight, FiRotateCcw, FiAward } from "react-icons/fi";
import { products } from "../data/products";

const quizQuestions = [
  {
    id: 1,
    question: "How would you describe your skin's natural state?",
    options: [
      { text: "Dry, rough, thin, or easily cool", value: "vata" },
      { text: "Warm, sensitive, acne-prone, or easily flushed", value: "pitta" },
      { text: "Thick, oily, soft, cool, or pale", value: "kapha" }
    ]
  },
  {
    id: 2,
    question: "Which pattern best describes your digestive system & appetite?",
    options: [
      { text: "Irregular, variable appetite, easily bloated or gassy", value: "vata" },
      { text: "Strong, intense hunger, cannot skip meals without getting 'hangry'", value: "pitta" },
      { text: "Slow, steady appetite, easily gains weight, feels heavy after meals", value: "kapha" }
    ]
  },
  {
    id: 3,
    question: "How do your mind and emotions react under stressful conditions?",
    options: [
      { text: "Anxious, fearful, hyperactive, mind racing", value: "vata" },
      { text: "Irritable, angry, impatient, argumentative", value: "pitta" },
      { text: "Calm, resistant to change, quiet, withdraws or sleeps more", value: "kapha" }
    ]
  },
  {
    id: 4,
    question: "What is your energy style and reaction to physical exertion?",
    options: [
      { text: "Quick bursts of energy, fatigues easily, restless", value: "vata" },
      { text: "Goal-oriented, moderate stamina, sweats easily, hates hot weather", value: "pitta" },
      { text: "Steady, high stamina, slow to start, loves warm climates", value: "kapha" }
    ]
  }
];

export default function DoshaQuiz({ onSelectProduct }) {
  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-4: Questions, 5: Result
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const startQuiz = () => {
    setCurrentStep(1);
    setAnswers([]);
    setResult(null);
  };

  const handleSelectOption = (value) => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (currentStep < quizQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(nextAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    finalAnswers.forEach((ans) => {
      counts[ans] = (counts[ans] || 0) + 1;
    });

    const total = finalAnswers.length;
    const vataPct = Math.round((counts.vata / total) * 100);
    const pittaPct = Math.round((counts.pitta / total) * 100);
    const kaphaPct = Math.round((counts.kapha / total) * 100);

    let primaryDosha = "Vata";
    let recommendedProduct = products[0]; // Immunity

    if (pittaPct > vataPct && pittaPct >= kaphaPct) {
      primaryDosha = "Pitta";
      recommendedProduct = products[1]; // Hair Care
    } else if (kaphaPct > vataPct && kaphaPct > pittaPct) {
      primaryDosha = "Kapha";
      recommendedProduct = products[2]; // Detox
    }

    setResult({
      primaryDosha,
      vataPct,
      pittaPct,
      kaphaPct,
      recommendedProduct,
      description: {
        Vata: "Your dominant energy is Vata (governed by Air and Ether). You are creative, thin-built, and quick-thinking, but prone to anxiety, dry skin, and cold extremities. Balancing Vata requires warming, grounding routines and immunity support.",
        Pitta: "Your dominant energy is Pitta (governed by Fire and Water). You are highly focused, sharp-witted, and active, but prone to irritability, inflammation, and heat. Balancing Pitta requires cooling, soothing regimens and follicle-cooling hair care.",
        Kapha: "Your dominant energy is Kapha (governed by Earth and Water). You are stable, strong-willed, loyal, and possess excellent stamina, but are prone to sluggishness, weight gain, and congestion. Balancing Kapha requires light, stimulating detox and digestive cleanses."
      }[primaryDosha]
    });
    setCurrentStep(quizQuestions.length + 1);
  };

  return (
    <section className="py-24 px-8 bg-[#fbf9f4] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#c5a059]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto bg-white border border-[#0e1a30]/5 rounded-3xl p-8 md:p-12 shadow-xl relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center mx-auto text-[#c5a059]">
                <FiAward size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-[#0e1a30]" style={{ fontFamily: "'Cinzel', serif" }}>
                Find Your Ayurvedic Body Type
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                In Ayurveda, wellness starts with understanding your unique mind-body constitution, or **Dosha**. Take our 1-minute diagnostic to discover your primary balance of Vata, Pitta, and Kapha.
              </p>
              <button
                onClick={startQuiz}
                className="mt-6 px-8 py-4 bg-[#0e1a30] text-white font-black rounded-full hover:bg-[#c5a059] flex items-center gap-2 mx-auto active:scale-[0.98] transition shadow-md"
              >
                <span>Start Dosha Diagnostic</span>
                <FiArrowRight />
              </button>
            </motion.div>
          )}

          {currentStep >= 1 && currentStep <= quizQuestions.length && (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              {/* Progress Header */}
              <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                <span>Question {currentStep} of {quizQuestions.length}</span>
                <span className="text-[#c5a059]">Dosha Diagnostic</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-[#c5a059] to-[#dfc593] transition-all duration-300"
                  style={{ width: `${(currentStep / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-2xl font-serif text-[#0e1a30] font-semibold">
                {quizQuestions[currentStep - 1].question}
              </h3>

              {/* Options */}
              <div className="space-y-4">
                {quizQuestions[currentStep - 1].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.value)}
                    className="w-full text-left p-5 rounded-2xl bg-[#fbf9f4]/60 border border-[#0e1a30]/5 hover:border-[#c5a059]/40 hover:bg-white text-[#0e1a30] hover:shadow-sm transition duration-300 flex items-center justify-between group"
                  >
                    <span className="text-sm md:text-base leading-relaxed">{opt.text}</span>
                    <span className="w-6 h-6 rounded-full border border-gray-300 group-hover:border-[#c5a059] flex items-center justify-center shrink-0 ml-4 group-hover:bg-[#c5a059]/5 transition">
                      <FiCheck className="text-transparent group-hover:text-[#c5a059] text-sm" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === quizQuestions.length + 1 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              <div className="text-center space-y-3">
                <span className="text-[#c5a059] uppercase tracking-[0.2em] text-xs font-bold block">
                  Your Primary Constitution
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-[#0e1a30]" style={{ fontFamily: "'Cinzel', serif" }}>
                  {result.primaryDosha} Dominant
                </h2>
              </div>

              {/* Percentage breakdown bars */}
              <div className="grid md:grid-cols-3 gap-6 bg-[#fbf9f4] border border-[#0e1a30]/5 rounded-2xl p-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-2">
                    <span>Vata (Air & Space)</span>
                    <span className="text-sky-600">{result.vataPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: `${result.vataPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-2">
                    <span>Pitta (Fire & Water)</span>
                    <span className="text-orange-500">{result.pittaPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: `${result.pittaPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-2">
                    <span>Kapha (Earth & Water)</span>
                    <span className="text-[#c5a059]">{result.kaphaPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c5a059]" style={{ width: `${result.kaphaPct}%` }} />
                  </div>
                </div>
              </div>

              {/* Dosha Analysis */}
              <p className="text-gray-600 text-base leading-relaxed text-center max-w-2xl mx-auto">
                {result.description}
              </p>

              {/* Recommendation Box */}
              <div className="bg-gradient-to-br from-[#fbf9f4] to-[#f4efe2] border border-[#c5a059]/25 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <span className="text-[10px] text-[#c5a059] uppercase font-bold tracking-[0.2em] bg-white/70 px-3 py-1 rounded-full border border-[#c5a059]/10">
                    Recommended Formulation
                  </span>
                  <h4 className="text-xl font-bold text-[#0e1a30] pt-1">
                    {result.recommendedProduct.name}
                  </h4>
                  <p className="text-xs text-gray-600 max-w-md">
                    Specially formulated to nourish your body and address standard imbalances associated with {result.primaryDosha} excess.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                  <span className="text-2xl font-bold text-[#0e1a30]">₹{result.recommendedProduct.price}</span>
                  <button
                    onClick={() => onSelectProduct(result.recommendedProduct)}
                    className="px-6 py-3 bg-[#0e1a30] hover:bg-[#c5a059] text-white font-black rounded-xl active:scale-[0.98] transition flex items-center gap-2 whitespace-nowrap text-sm"
                  >
                    <span>View Product</span>
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              {/* Retake button */}
              <button
                onClick={startQuiz}
                className="text-gray-600 hover:text-[#c5a059] transition flex items-center gap-2 mx-auto text-sm font-semibold pt-4"
              >
                <FiRotateCcw />
                <span>Retake Diagnostic</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
