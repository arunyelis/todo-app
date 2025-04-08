// src/services/VoiceService.test.ts
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { VoiceService } from './VoiceService';

describe('VoiceService', () => {
  let mockOnResult: (text: string) => void;
  let mockOnError: (error: string) => void;
  let voiceService: VoiceService;

  // Mock SpeechRecognition
  const mockStart = vi.fn();
  const mockStop = vi.fn();
  let mockRecognition: SpeechRecognition;

  beforeEach(() => {
    mockOnResult = vi.fn();
    mockOnError = vi.fn();

    mockRecognition = {
      start: mockStart,
      stop: mockStop,
      continuous: false,
      interimResults: false,
      lang: '',
      onresult: null,
      onerror: null,
      onend: null,
      onstart: null,
      grammars: {} as SpeechGrammarList,
      maxAlternatives: 1,
      onaudioend: null,
      onaudiostart: null,
      onnomatch: null,
      onsoundend: null,
      onsoundstart: null,
      onspeechend: null,
      onspeechstart: null,
      abort: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as SpeechRecognition;

    // Mock the SpeechRecognition constructor
    global.SpeechRecognition = vi.fn(
      () => mockRecognition,
    ) as unknown as typeof SpeechRecognition;

    voiceService = new VoiceService(mockOnResult, mockOnError);
  });

  test('starts listening when startListening is called', () => {
    voiceService.startListening();
    expect(mockStart).toHaveBeenCalled();
  });

  test('stops listening when stopListening is called', () => {
    voiceService.startListening();
    voiceService.stopListening();
    expect(mockStop).toHaveBeenCalled();
  });

  test('calls onResult callback when speech is recognized', () => {
    voiceService.startListening();

    // Simulate a speech recognition result
    const mockEvent = new Event('result') as SpeechRecognitionEvent;
    Object.defineProperties(mockEvent, {
      results: {
        get: () => [[{ transcript: 'add buy milk' }]],
      },
      resultIndex: { value: 0 },
      type: { value: 'result' },
    });

    if (mockRecognition.onresult) {
      mockRecognition.onresult(mockEvent);
    }

    expect(mockOnResult).toHaveBeenCalledWith('add buy milk');
  });
});
