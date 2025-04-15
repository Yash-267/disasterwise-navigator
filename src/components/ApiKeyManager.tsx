
import React from 'react';

export const useApiKeys = () => {
  const apiKeys = {
    openai: 'sk-your-openai-key-here', // Replace with your actual OpenAI API key
    googlemaps: 'your-google-maps-key-here' // Replace with your actual Google Maps API key
  };

  return { apiKeys };
};

// Empty component since we don't need the UI anymore
const ApiKeyManager = () => null;

export default ApiKeyManager;
