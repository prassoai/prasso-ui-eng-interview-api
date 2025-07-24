import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { datasetId } = await params;
  
  try {
    // Read the movie data from the JSON file
    const filePath = path.join(process.cwd(), 'public', 'data', 'movies.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const movieData = JSON.parse(fileContents);
    
    // Check if the datasetId exists
    if (!movieData[datasetId]) {
      return NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
    }
    
    // Extract movieIds from the movies array for this dataset
    const movieIds = movieData[datasetId].map(movie => movie.movieId);
    
    return NextResponse.json({ movieIds });
  } catch (error) {
    console.error('Error loading movie data:', error);
    return NextResponse.json(
      { error: 'Failed to load movie data' },
      { status: 500 }
    );
  }
}