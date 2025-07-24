import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(_request, { params }) {
  const { datasetId, movieId } = await params;
  
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
    
    // Find the movie with the matching movieId in the specified dataset
    const movie = movieData[datasetId].find(movie => movie.movieId === movieId);
    
    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Error loading movie data:', error);
    return NextResponse.json(
      { error: 'Failed to load movie data' },
      { status: 500 }
    );
  }
}
