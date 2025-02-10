"use client";
import React, { useState, useEffect } from "react";

const sampleTexts = [
  "In the quiet town of Willowbrook, nestled between rolling hills and dense forests, a young writer named Clara found inspiration in the rustling leaves and the distant chirping of birds. Every morning, she would sit by the window of her small cottage, sipping coffee while watching the golden sunrise. Words flowed effortlessly onto the pages of her worn-out journal, each sentence painting a picture of the world as she saw it. Writing was not just a passion for Clara; it was an escape, a way to immortalize fleeting moments in time.",
  
  "Technology has revolutionized the way we interact with the world. From smartphones to artificial intelligence, the advancements in the digital age have shaped our daily lives in ways unimaginable a few decades ago. The internet, in particular, has transformed communication, allowing people from different corners of the globe to connect instantly. While these innovations bring convenience and efficiency, they also raise ethical questions about privacy, security, and human dependency on machines. As we move forward, finding a balance between progress and responsibility remains a crucial challenge.",
  
  "The vast ocean stretched endlessly before the travelers, its deep blue waters shimmering under the golden rays of the sun. A cool breeze carried the scent of salt, and the rhythmic crashing of waves against the sturdy wooden ship created a soothing melody. The sailors moved with precision, adjusting sails and ropes, their faces weathered by years of experience. Their journey was long and uncertain, yet their hearts remained filled with hope, knowing that beyond the horizon lay the promise of new lands and endless possibilities.",
  
  "As the rain poured down in steady streams, the streets of the bustling city gleamed under the flickering streetlights. Pedestrians hurried along the sidewalks, their umbrellas forming a sea of colors against the gray sky. Cars honked impatiently, their headlights cutting through the misty evening air. In the middle of it all, a lone musician played his violin beneath a bridge, his soulful melody rising above the noise. For a moment, amidst the chaos, passersby paused to listen, finding an unexpected sense of calm in the music's embrace.",
  
  "The library was a sanctuary of knowledge, its towering shelves lined with books of every genre and era. The scent of aged paper filled the air, mingling with the quiet whispers of readers lost in stories from distant lands. Sunlight filtered through the stained-glass windows, casting colorful patterns onto the wooden floors. At the far end of the room, an elderly librarian, with spectacles perched on the tip of his nose, carefully turned the pages of an ancient manuscript. In that sacred space, time seemed to slow, allowing the past and present to exist in perfect harmony."
];

function Arena() {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [time, setTime] = useState(60);
  const [inputText, setInputText] = useState("");
  const [textToType, setTextToType] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const generateRandomText = () => {
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setTextToType(newText);
    setInputText(""); 
  };

  useEffect(() => {
    generateRandomText();
  }, []);

  useEffect(() => {
    if (!gameStarted || time === 0) return;

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, time]);

  useEffect(() => {
    if (!gameStarted || textToType.length === 0) return;

    // Calculate WPM based on words typed in the given time
    const wordsTyped = inputText.trim().split(/\s+/).length;
    const timeElapsed = 60 - time || 1;
    setWpm(Math.floor((wordsTyped / timeElapsed) * 60)); // More accurate WPM

    // Calculate Accuracy based on correct character matches
    const correctChars = inputText.split("").filter((char, index) => char === textToType[index]).length;
    const totalTyped = inputText.length || 1; // Avoid division by zero
    setAccuracy(Math.floor((correctChars / totalTyped) * 100));
  }, [inputText, time, gameStarted, textToType]);

  const handleInputChange = (e) => {
    if (!gameStarted) setGameStarted(true);
    setInputText(e.target.value);
  };

  const handleReset = () => {
    setTime(60);
    setWpm(0);
    setAccuracy(100);
    setGameStarted(false);
    generateRandomText();
  };

  useEffect(() => {
    if (time === 0) {
      setTimeout(handleReset, 3000);
    }
  }, [time]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Typing Realm</h2>
        <p className="text-neutral-400">Test your typing speed and accuracy in real-time</p>
      </div>

      <div className="bg-neutral-800 rounded-xl p-8 max-w-4xl mx-auto shadow-lg border border-neutral-700">
        <div className="flex justify-between items-center mb-6">
          <div className="text-green-400">
            <span className="text-sm">WPM</span>
            <div className="text-2xl font-mono">{wpm}</div>
          </div>
          <div className="text-green-400">
            <span className="text-sm">Accuracy</span>
            <div className="text-2xl font-mono">{accuracy}%</div>
          </div>
          <div className="text-green-400">
            <span className="text-sm">Time</span>
            <div className="text-2xl font-mono">{time}</div>
          </div>
        </div>

        <div className="bg-neutral-900 p-6 rounded-lg mb-6">
          <p className="text-lg font-mono leading-relaxed text-neutral-400">{textToType}</p>
        </div>

        <textarea
          value={inputText}
          onChange={handleInputChange}
          disabled={time === 0}
          className="w-full bg-neutral-900 text-green-400 rounded-lg p-4 font-mono focus:outline-none focus:ring-2 focus:ring-green-400 border border-neutral-700"
          rows="5"
          placeholder="Click here and start typing..."
        ></textarea>

        <div className="flex justify-between items-center mt-6">
          <button onClick={handleReset} className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition-colors duration-200">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Arena;
