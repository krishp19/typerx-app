import { NextResponse } from 'next/server';

// Text collections for different modes
const textCollections = {
  basic: [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.",
    "She sells seashells by the seashore. The shells she sells are surely seashells.",
    "How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
    "Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf."
  ],
  advanced: [
    "In computer programming, a function is a block of organized, reusable code that performs a specific task. Functions provide better modularity and a high degree of code reuse.",
    "The principles of object-oriented programming include encapsulation, inheritance, polymorphism, and abstraction. These concepts help create maintainable and scalable software.",
    "Artificial intelligence and machine learning are transforming the technology landscape. Neural networks can recognize patterns and make decisions with remarkable accuracy.",
    "Version control systems like Git help developers track changes, collaborate effectively, and maintain different versions of their codebase simultaneously."
  ],
  numbers: [
    "Please dial 1-800-555-0123 to reach customer service. Our office hours are 9:00 AM to 5:00 PM, Monday through Friday.",
    "In 2023, approximately 84.5% of companies reported a 12.3% increase in digital transformation investments.",
    "The distance between Earth and Mars varies from 34.8 million to 250 million miles, depending on their orbital positions.",
    "The human body contains 206 bones and over 600 muscles. The average adult has 100,000 miles of blood vessels."
  ],
  symbols: [
    "Common programming operators include: +, -, *, /, %, ==, !=, &&, ||, and !. Use {} for code blocks and [] for arrays.",
    "Email format: user@domain.com; Website: https://www.example.com; Phone: (555) 123-4567; #hashtag @mention",
    "Mathematical expressions: 5 + 3 * 2 = 11; (5 + 3) * 2 = 16; x² + y² = z²; π ≈ 3.14159",
    "Special characters: &amp; &lt; &gt; &quot; &apos; &#169; &#174; &#8364; &#163; &#165;"
  ],
  code: [
    "function calculateFactorial(n) {\n  if (n === 0 || n === 1) return 1;\n  return n * calculateFactorial(n - 1);\n}",
    "const fetchData = async () => {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
    "class Rectangle {\n  constructor(width, height) {\n    this.width = width;\n    this.height = height;\n  }\n  \n  getArea() {\n    return this.width * this.height;\n  }\n}",
    "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);"
  ],
  quotes: [
    "Be the change you wish to see in the world. - Mahatma Gandhi",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. - Albert Einstein",
    "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
  ]
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'basic';
    const customText = searchParams.get('customText');

    // If custom text is provided and mode is custom, return it
    if (mode === 'custom' && customText) {
      return NextResponse.json({
        success: true,
        data: {
          text: customText,
          mode: 'custom'
        }
      });
    }

    // Get the text collection for the requested mode
    const collection = textCollections[mode] || textCollections.basic;
    
    // Select a random text from the collection
    const randomIndex = Math.floor(Math.random() * collection.length);
    const selectedText = collection[randomIndex];

    return NextResponse.json({
      success: true,
      data: {
        text: selectedText,
        mode
      }
    });
  } catch (error) {
    console.error('Error fetching practice text:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch practice text'
        }
      },
      { status: 500 }
    );
  }
} 