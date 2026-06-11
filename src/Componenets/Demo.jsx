// import "./App.css";
// import animationData from "./animation/animated-mic.json";
// import siloFavicon from "./assets/favicon.png";
import "regenerator-runtime/runtime";
import React, { useEffect, useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import voiceimage from "../assets/mic-image.png";
import { FaVolumeUp } from "react-icons/fa";
import { FaRegCircleStop } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import { IoMdClose } from "react-icons/io";
import headerimage from "../assets/cloud_logo_squre.png"
import { FcIdea } from "react-icons/fc";

function App() {
    const [isListening, setIsListening] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    // const [isListening, setIsListening] = useState(false);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const timeoutRef = useRef(null);
    // const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const [text, setText] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [voices, setVoices] = useState([]);
    const [isCopyDisabled, setIsCopyDisabled] = useState(false);
    const { speak, cancel, speaking, supported, voices: availableVoices } = useSpeechSynthesis();

    useEffect(() => {
        checkMicrophonePermissions();
    }, []);
    useEffect(() => {
        if (transcript.toLowerCase().includes("hello") && !isListening) {
            setIsListening(true);
            setIsActive(!isActive);
            resetTranscript();
        }
    }, [transcript]);

    const checkMicrophonePermissions = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({
                name: "microphone",
            });
            if (permissionStatus.state === "denied") {
                console.log("Microphone permission denied");
            } else {
                SpeechRecognition.startListening({ continuous: true }); // Start listening if permission is granted
            }
            permissionStatus.onchange = () => {
                if (permissionStatus.state === "denied") {
                    console.log("Microphone permission denied");
                } else {
                    SpeechRecognition.startListening({ continuous: true }); // Start listening if permission is granted
                }
            };
        } catch (error) {
            console.error("Error checking microphone permissions:", error);
        }
    };
    // const toggleListening = () => {
    //     if (listening) {
    //         // SpeechRecognition.stopListening();
    //     } else {
    //         SpeechRecognition.startListening({ continuous: true });
    //         resetTranscript();
    //     }
    //     setIsListening(!listening);
    // };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    // const text = "Hello SiloCloud Here. How can I help you?".split(" ");
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice",
    //     },
    // };


    // karannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    useEffect(() => {
        if (availableVoices.length > 0) {
            setVoices(availableVoices);
            setVoiceIndex(0); // Set default voice index to the first available voice
        }
    }, [availableVoices]);

    const handleClick = () => {
        setIsActive(!isActive);
        setIsListening(!isListening);
        resetTranscript();
        console.log("handleclick")
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsActive(true);
        setIsListening(true);
        console.log("handleopenmodel")

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsListening(false);
        resetTranscript();
        setIsActive(false);
        cancel();
        console.log("handleclosemodel")
    };


    // useEffect(() => {
    //     if (transcript.toLowerCase().includes("hello") && !isListening) {
    //         setIsListening(true);
    //     }
    // }, [transcript]);
    // useEffect(() => {
    //     if (!listening) {
    //         SpeechRecognition.startListening({ continuous: true });
    //     }
    // }, [listening]);
    // useEffect(() => {
    //   if (isListening) {
    //     SpeechRecognition.startListening();
    //   } else {
    //     SpeechRecognition.stopListening();
    //   }
    // }, [isListening]);

    const handleSpeechResponse = (text) => {
        const voice = voices[voiceIndex];
        speak({ text, voice });
        setCurrentIndex(0);
        setIsSpeaking(true);
        setDisplayText(text);
        let index = 0;
        const interval = setInterval(() => {
            setCurrentIndex(index); // Update currentIndex to apply bold effect
            index += 1;
            if (index >= text.length) {
                clearInterval(interval);
                setIsSpeaking(false);
                SpeechRecognition.startListening({ continuous: true });
                setIsActive(true);
                setIsListening(true);
            }
        }, 70);
    };

    const handleCommand = (command) => {
        console.log("Handling command: ", command);
        let responseText = '';
        switch (command.toLowerCase()) {
            case 'go to homepage':
                responseText = 'Here is Homepage';
                // navigate('/');
                break;
            case 'hello':
                handleOpenModal();
                responseText = 'How can I help you?';
                // setIsActive(true);
                // setIsListening(true);
                break;
            case 'what is ivipp':
                responseText = 'iVipp Is the Ultimate Lifestyle Management resource, providing you with the best global bespoke concierge services';
                break;
            case 'i want to book a car':
                responseText = 'here you can book a car';
                // navigate('/');
                // section1Ref.current.scrollIntoView({ behavior: 'smooth' })
                break;
            case 'what is the membership benifits':
            case 'what is that ':
                responseText = 'here is membership benifits 1)IVIPP PERKS 2)TRIPS AND EVENTS 3)TABLE RESERVATIONS MADE EASY ';
                break;
            case 'which services do you provide':
                responseText = 'Here is our services 1)Never Wait In Line With Our Skip The Line Service 2)24/7 Concierge Request Line 3)Birthday Perks 4)Exclusive access to iVipp Members Only Concerts & Live Streams.';
                // navigate('/perks');
                break;
            case 'go to trips and event page':
                responseText = 'Here is the trips and events page';
                // navigate('/trips-and-events');
                break;
            // case 'open contact section':
            //     responseText = 'Here is the contact section';
            //     section1Ref.current.scrollIntoView({ behavior: 'smooth' });
            //     break;
            default:
                responseText = 'Command not recognized';
                break;
        }
        handleSpeechResponse(responseText);
        setText(responseText);
        setIsActive(!false);
        setIsListening(false);
        // resetTranscript();
        console.log("out of handlecommand ")
    };
    useEffect(() => {

        if (listening && transcript) {
            timeoutRef.current = setTimeout(() => {
                handleCommand(transcript);
                console.log("Goes to handle command");
                resetTranscript();
            }, 1000);
        }
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [listening, transcript]);
    if (!browserSupportsSpeechRecognition) {
        return <div>Browser doesn't support speech recognition.</div>;
    }

    const handleChange = (e) => {
        setText(e.target.innerText);
    };
    const handleCardClick = (command, event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up
        handleCommand(command);
    };
    

    const toggleSpeech = () => {
        if (isSpeaking) {
            cancel();
            setIsSpeaking(false);
        } else {
            if (text.trim() !== '') {
                handleSpeechResponse(text);
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard!');
                setIsCopyDisabled(true);
                setTimeout(() => {
                    setIsCopyDisabled(false);
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    const formatText = (text, currentIndex) => {
        if (typeof text !== 'string') return null;
        return text.split('').map((char, index) => (
            <span key={index} style={{ fontWeight: index <= currentIndex ? 'bold' : 'normal' }}>
                {char}
            </span>
        ));
    };

    return (
        <>
            <div>
                <h1>
                    Voice assistant
                </h1>
            </div>
            <div className="position-voice-search py-1" onClick={() => { handleOpenModal(); handleClick(); }}>
                <div className="py-1 bg-white px-2 border-radius-50">
                    <img src={voiceimage} alt="" className="img-fluid" width={"50px"} />
                </div>
            </div>



            <Modal show={isListening} onHide={handleCloseModal} fullscreen>
                <Modal.Header className="border-0 p-1 d-flex bg-light ">
                    <div className="d-flex w-50">
                        <img src={headerimage} alt="header-image" width={"50px"} />
                    </div>
                    <div className="fs-4 d-flex w-50 justify-content-end">
                        <IoMdClose onClick={handleCloseModal} className="cursor-pointer" />
                    </div>
                </Modal.Header>
                {permissionDenied ? (
                    <p className="text-center d-flex justify-content-center">Please allow microphone access in your browser settings.</p>
                ) : (
                    <Modal.Body>
                        <div className='container-fluid'>
                            <div className='row justify-content-center '>
                                <div className='h-100px justify-content-center d-flex col-md-12'>
                                    <div id="bars" className={isActive ? 'active' : ''}
                                        onClick={handleClick}
                                    >
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className="bar"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="position-relative">
                                    <div className="position-voice">
                                        <label htmlFor="voice">Voice:</label>
                                        <select
                                            id="voice"
                                            onChange={(e) => setVoiceIndex(e.target.value)}
                                            className='p-1 mx-2 w-75'
                                        >
                                            <option value="">Default</option>
                                            {voices.map((voice, index) => (
                                                <option key={voice.voiceURI} value={index}>
                                                    {voice.name} ({voice.lang})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center py-2'>
                                <p className="text-center pt-2">{isListening ? 'Listening...' : 'Click To Listen'}</p>
                                <p className='h-20px'>{transcript}</p>
                                <div className="row justify-content-center">
                                    <div className=" col-md-6 justify-content-centerus"
                                        contentEditable={false}
                                        onInput={handleChange}
                                        style={{
                                            whiteSpace: 'pre-wrap', outline: 'none', border: '1px solid #ddd', padding: '10px', minHeight: '200px',
                                        }}
                                    >
                                        {formatText(displayText, currentIndex)}
                                    </div>
                                    <div className="py-1">
                                        <button onClick={toggleSpeech} className='bg-white border-0 fs-5 '>
                                            {isSpeaking ? <FaRegCircleStop /> : <FaVolumeUp />}
                                        </button>
                                        <button data-toggle="tooltip" data-placement="bottom" title="Copy" onClick={copyToClipboard} className='border-0 fs-5 bg-white' disabled={isCopyDisabled}>
                                            <IoCopy />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className='row py-4  justify-content-center'>
                                <div className='col-md-2 align-content-center'>
                                    <h5 className='text-center'>Try Saying :</h5>
                                </div>
                                <div className="col-md-9 row row-cols-3">
                                    <div className="col py-2 " onClick={(event) => handleCardClick('What is iVIPP', event)}>
                                        <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                            <div className="px-1 fs-5 d-flex">
                                                <FcIdea />
                                            </div>
                                            <div className="text-center align-content-center align-items-center">
                                                <p className="m-0 ">Silo Marketplace</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col py-2">
                                        <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                            <div className="px-1 fs-5 d-flex">
                                                <FcIdea />
                                            </div>
                                            <div className="text-center align-content-center align-items-center">
                                                <p className="m-0 ">Silo Serach</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col py-2">
                                        <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                            <div className="px-1 fs-5 d-flex">
                                                <FcIdea />
                                            </div>
                                            <div className="text-center align-content-center align-items-center">
                                                <p className="m-0 ">Silo Music</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col py-2">
                                        <div className='border shadow d-flex align-content-center justify-content-center py-2 '>
                                            <div className="px-1 fs-5 d-flex">
                                                <FcIdea />
                                            </div>
                                            <div className="text-center align-content-center align-items-center">
                                                <p className="m-0">Silo Marketplace</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col py-2">
                                        <div className='border  shadow d-flex align-content-center justify-content-center py-2 '>
                                            <div className="px-1 fs-5 d-flex">
                                                <FcIdea />
                                            </div>
                                            <div className="text-center align-content-center align-items-center">
                                                <p className="m-0 ">Silo Marketplace</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col py-2">
                                        <div className='border  shadow d-flex align-content-center justify-content-center py-2 '>
                                            <div className="px-1 fs-5 d-flex">
                                                <FcIdea />
                                            </div>
                                            <div className="text-center align-content-center align-items-center">
                                                <p className="m-0 ">Silo Marketplace</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </Modal.Body>
                )}
            </Modal >
        </>
    );
}

export default App;
