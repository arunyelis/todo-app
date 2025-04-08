import { useState, useCallback, useEffect, useRef } from 'react';
import { VoiceService } from '../services/VoiceService';

export function useVoiceInput(onVoiceResult: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const serviceRef = useRef<VoiceService | null>(null);
  const onVoiceResultRef = useRef(onVoiceResult);

  // Update ref when callback changes
  useEffect(() => {
    onVoiceResultRef.current = onVoiceResult;
  }, [onVoiceResult]);

  // Initialize voice service only once
  useEffect(() => {
    if (!serviceRef.current) {
      serviceRef.current = new VoiceService(
        // On result callback
        (text: string) => {
          onVoiceResultRef.current(text);
          setIsListening(false);
        },
        // On error callback
        (error: string) => {
          console.error('Voice recognition error:', error);
          setIsListening(false);
        },
      );
    }

    return () => {
      if (serviceRef.current) {
        serviceRef.current.stopListening();
        serviceRef.current = null;
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.startListening();
      setIsListening(true);
    }
  }, []);

  return {
    isListening,
    startListening,
  };
}
