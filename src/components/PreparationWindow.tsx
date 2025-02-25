'use client'
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function PreparationWindow() {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: false });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <>
      <div className="p-5 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Speech to Text</h1>
      <p className="mb-4">Microphone: {listening ? '🎙️ Listening...' : '🔇 Not Listening'}</p>

      <div className="space-x-2 mb-4">
        <button
          onClick={startListening}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Stop Listening
        </button>
        <button
          onClick={resetTranscript}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>

      <div className="p-4 border rounded-lg bg-gray-100">
        <h2 className="font-semibold">Transcribed Text:</h2>
        <p>{transcript}</p>
      </div>
    </div>
    </>
  )
}

export default PreparationWindow