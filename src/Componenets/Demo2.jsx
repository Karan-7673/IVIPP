import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const VoiceAssistant = () => {
    const { speak, voices, cancel } = useSpeechSynthesis();
    const [history, setHistory] = useState([]);
    const [voiceIndex, setVoiceIndex] = useState(0);
    const historyEndRef = useRef(null);

    useEffect(() => {
        if (voices.length > 0) {
            setVoiceIndex(6); // Set default voice index
        }
    }, [voices]);

    const handleSpeakCommand = (text) => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();  // Stop any ongoing speech
        }
        if (voices.length > 0) {
            speak({ text, voice: voices[voiceIndex] });
        }
    };

    const handleCommand = (command) => {
        let responseText = '';
        switch (command.toLowerCase()) {
            case 'hello':
                responseText = 'How can I help you?';
                break;
            case 'how are you':
                responseText = 'I am fine, I hope you are too!';
                break;
            case 'what is ivipp':
                responseText = 'iVipp is the Ultimate Lifestyle Management resource, providing bespoke concierge services globally.';
                break;
            // Add more cases as needed
            default:
                responseText = 'I did not understand that command.';
                break;
        }

        const newEntry = {
            transcript: command,
            responseText: responseText,
            timestamp: new Date().toLocaleString(),
        };

        setHistory(prevHistory => [...prevHistory, newEntry]);
    };

    // Automatically speak new commands when added to history
    useEffect(() => {
        if (history.length > 0) {   
            const lastCommand = history[history.length - 1];
            handleSpeakCommand(lastCommand.responseText);
        }
    }, [history]);


    const scrollToBottom = () => {
        historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    return (
        <div>
            <h1>Voice Assistant</h1>
            <div>
                <h3>Command History</h3>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>
                            <span>{entry.transcript} - {entry.responseText}</span>
                            <button onClick={() => handleSpeakCommand(entry.responseText)}>🔊 Speak</button>
                        </li>
                    ))}
                </ul>
                <div ref={historyEndRef} />
            </div>
            {/* Add a way to input or trigger commands for testing purposes */}
            <input type="text" placeholder="Enter command" onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleCommand(e.target.value);
                    e.target.value = ''; // Clear the input after processing
                }
            }} />
        </div>
    );
};

export default VoiceAssistant;
