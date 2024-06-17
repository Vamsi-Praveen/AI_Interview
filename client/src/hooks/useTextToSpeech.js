import { useState, useEffect } from 'react';

const useTextToSpeech = () => {
    const [speaking, setSpeaking] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const newUtterance = new SpeechSynthesisUtterance();
        setUtterance(newUtterance);
        return () => {
            synth.cancel();
        };
    }, []);

    const speak = (text) => {
        if (utterance) {
            utterance.text = text;
            window.speechSynthesis.speak(utterance);
            setSpeaking(true);

            utterance.onend = () => {
                setSpeaking(false);
            };
        }
    };

    const cancel = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    };

    return { speak, cancel, speaking };
};

export default useTextToSpeech;
