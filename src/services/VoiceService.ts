interface ISpeechRecognition {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognition;
    webkitSpeechRecognition: ISpeechRecognition;
  }
}

export class VoiceService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

  constructor(
    private onResultCallback: (text: string) => void,
    private onErrorCallback: (error: string) => void,
  ) {
    // Check if browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // Create a speech recognition instance
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();

      if (this.recognition) {
        // Configure the recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        // Set up event handlers
        this.recognition.onresult = this.handleResult.bind(this);
        this.recognition.onerror = this.handleError.bind(this);
        this.recognition.onend = () => {
          this.isListening = false;
        };
        this.recognition.onend = this.handleEnd.bind(this);
      }
    }
  }

  public startListening() {
    if (!this.recognition) {
      this.onErrorCallback(
        'Speech recognition is not supported in this browser.',
      );
      return;
    }

    if (!this.isListening) {
      this.isListening = true;
      this.recognition.start();
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
    }
  }

  private handleResult(event: SpeechRecognitionEvent) {
    const result = event.results[0][0].transcript;
    this.onResultCallback(result);
  }

  private handleError(event: SpeechRecognitionErrorEvent) {
    this.isListening = false;
    this.onErrorCallback(`Error occurred in recognition: ${event.error}`);
  }

  private handleEnd() {
    this.isListening = false;
  }
}
