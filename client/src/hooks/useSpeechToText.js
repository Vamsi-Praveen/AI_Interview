import { useState, useEffect, useRef } from 'react';

export const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error('Speech recognition not supported in this browser.');
            return;
        }

        const mic = new SpeechRecognition();
        mic.continuous = true;
        mic.lang = 'en-IN';
        mic.interimResults = true;

        mic.onstart = () => {
            setIsListening(true);
        };

        mic.onend = () => {
            setIsListening(false);
        };

        mic.onresult = (event) => {
            let interim = '';
            let final = '';
            for (let i = 0; i < event.results.length; i++) {
                const transcriptChunk = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += transcriptChunk;
                } else {
                    interim += transcriptChunk;
                }
            }
            setInterimTranscript(interim);
            setFinalTranscript(prevFinal => prevFinal + final);
            setTranscript(final + interim);
        };

        recognitionRef.current = mic;
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    return {
        transcript,
        interimTranscript,
        finalTranscript,
        isListening,
        startListening,
        stopListening,
    };
};
