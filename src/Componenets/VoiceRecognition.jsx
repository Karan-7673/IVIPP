import React, { useEffect, useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MdKeyboardVoice } from "react-icons/md";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const VoiceRecognition = () => {

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const timeoutRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const navigate = useNavigate();


  const checkMicrophonePermissions = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
      if (permissionStatus.state === 'denied') {
        setPermissionDenied(true);
      } else {
        setPermissionDenied(false);
      }
      permissionStatus.onchange = () => {
        if (permissionStatus.state === 'denied') {
          setPermissionDenied(true);
        } else {
          setPermissionDenied(false);
        }
      };
    } catch (error) {
      console.error('Error checking microphone permissions:', error);
    }
  };

  useEffect(() => {
    checkMicrophonePermissions();
  }, []);
  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  const handleSpeechResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      resetTranscript();
    }
  };
  const handleCommand = (command, navigate) => {

    switch (command.toLowerCase()) {
      case 'go to trips and event page':
        handleSpeechResponse('Here is a trips and event page');
        navigate('/trips-and-events');
        break;
      case 'go to perks page':
        handleSpeechResponse('Here is a trips and event page');
        navigate('/perks');
        break;
      case 'who is karan':
        handleSpeechResponse('Karan is  a good boy');
        break;
      case 'go to contact section':
        section1Ref.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        handleSpeechResponse(`Not recognized ${command}`);
        break;
    }
  };

  useEffect(() => {
    if (!listening && transcript) {
      timeoutRef.current = setTimeout(() => {
        handleCommand(transcript, navigate);
        resetTranscript();
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
    // handleCommand(transcript);

  }, [listening, transcript, navigate]);

  if (!browserSupportsSpeechRecognition) {
    return toast.error("Browser doesn't support speech recognition");
  }


  return (
    <>
      <ToastContainer />
      <div>
        {/* <h1>Speech Recognition and Response</h1> */}
        <button onClick={handleListening} className="border text-danger fs-3"><MdKeyboardVoice /></button>
        {permissionDenied && (
          <p>Please allow microphone access in your browser settings for speech recognition to work.</p>
        )}
        {/* <button onClick={handleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button> */}
        {/* <button onClick={resetTranscript}>Reset</button> */}
        <p>{isListening ? 'Listening...' : 'Not listening'}</p>
        <p  >Transcript: {transcript} </p>
      </div>
      <div ref={section1Ref} style={{ height: '500px', background: 'lightgray', margin: '20px 0' }}>
        <h2>Section One</h2>
        <p>This is section one. Say "go to section two" to navigate to the next section.</p>
      </div>

      <div ref={section2Ref} style={{ height: '500px', background: 'lightblue', margin: '20px 0' }}>
        <h2>Section Two</h2>
        <p>This is section two. Say "go to section one" to navigate back to the previous section.</p>
      </div>
    </>

  );
};

export default VoiceRecognition;
