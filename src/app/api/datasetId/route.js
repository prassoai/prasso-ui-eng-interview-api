import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(_request) {
  try {
    // Read the movie data from the JSON file
    const filePath = path.join(process.cwd(), 'public', 'data', 'movies.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const movieData = JSON.parse(fileContents);
    
    // Get all available datasetIds
    const datasetIds = Object.keys(movieData);
    
    // Select a random datasetId
    const randomIndex = Math.floor(Math.random() * datasetIds.length);
    const randomDatasetId = datasetIds[randomIndex];
    
    return NextResponse.json({ datasetId: randomDatasetId });
  } catch (error) {
    console.error('Error loading movie data:', error);
    return NextResponse.json(
      { error: 'Failed to load movie data' },
      { status: 500 }
    );
  }
}