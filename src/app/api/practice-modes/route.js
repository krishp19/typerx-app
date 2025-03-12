import { NextResponse } from 'next/server';

// Mock data - In a real app, this would come from a database
const practiceModes = [
  {
    id: '1',
    name: 'Basic',
    description: 'Perfect for beginners to build typing fundamentals',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    name: 'Advanced',
    description: 'Challenge yourself with complex texts and higher speed requirements',
    difficulty: 'Advanced'
  },
  {
    id: '3',
    name: 'Custom',
    description: 'Practice with your own text or specific requirements',
    difficulty: 'Custom'
  },
  {
    id: '4',
    name: 'Numbers',
    description: 'Master numeric typing with various number formats and calculations',
    difficulty: 'Intermediate'
  },
  {
    id: '5',
    name: 'Symbols',
    description: 'Practice with special characters, operators, and punctuation marks',
    difficulty: 'Advanced'
  },
  {
    id: '6',
    name: 'Code',
    description: 'Improve your coding speed with programming syntax and patterns',
    difficulty: 'Expert'
  },
  {
    id: '7',
    name: 'Quotes',
    description: 'Type famous quotes and passages from literature and history',
    difficulty: 'Intermediate'
  }
];

export async function GET(request) {
  try {
    // Get the URL from the request
    const { searchParams } = new URL(request.url);
    const includeSpecialized = searchParams.get('includeSpecialized') === 'true';

    // Filter out specialized modes (ids 4-7) unless specifically requested
    const filteredModes = includeSpecialized 
      ? practiceModes 
      : practiceModes.filter(mode => parseInt(mode.id) <= 3);

    return NextResponse.json({
      success: true,
      data: filteredModes
    });
  } catch (error) {
    console.error('Error fetching practice modes:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch practice modes'
        }
      },
      { status: 500 }
    );
  }
} 