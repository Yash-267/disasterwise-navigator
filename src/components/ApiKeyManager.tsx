
import React from 'react';

export const useApiKeys = () => {
  const apiKeys = {
    openai: 'YOUR_OPENAI_API_KEY', // Replace with your actual OpenAI API key
    googlemaps: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with your actual Google Maps API key
  };

  return { apiKeys };
};

// Empty component since we don't need the UI anymore
const ApiKeyManager = () => null;

export default ApiKeyManager;
