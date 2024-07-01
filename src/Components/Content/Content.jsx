import { useContext, useEffect, useRef, useState } from 'react';
import paragraphs from '../../Paragraph.json';
import Error from '../Error/Error';
import './Content.css';
import Message from '../Message/Message';
import { MyContext } from '../../Context/Context';

function Content() {
    const rows = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        ['space']
    ];

    const { array } = paragraphs;

    const getRandomParagraph = () => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const [currentParagraph, setCurrentParagraph] = useState(getRandomParagraph());
    const [userInput, setUserInput] = useState('');
    const [currentWord, setCurrentWord] = useState('');
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(15);
    const { isTyping, setIsTyping } = useContext(MyContext);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [message, setMessage] = useState('');
    const [cursorIndex, setCursorIndex] = useState(0);

    const keysRef = useRef([]);
 
    const handleKeyPress = (event) => {
        const { key } = event;
        const isAlphabetic = /^[a-zA-Z]$/.test(key);

        if (!isTyping && isAlphabetic) {
            setIsPaused(false);
            setMessage('');  // Reset message when typing starts
        }

        if (!isAlphabetic && key !== 'Backspace' && key !== ' ') {
            return;
        }

        let inputKey = '';
        if (key === ' ') {
            inputKey = ' ';
            if (currentWord.length > 0) {
                setUserInput((prevInput) => {
                    const newInput = prevInput + inputKey;
                    setCursorIndex(newInput.length);
                    return newInput;
                });
                setCurrentWord('');
            }
            return;
        } else if (key === 'Backspace') {
            if (currentWord.length > 0) {
                setUserInput((prevInput) => {
                    const newInput = prevInput.slice(0, -1);
                    setCursorIndex(newInput.length); // Update cursor position
                    return newInput;
                });
                setCurrentWord((prevWord) => prevWord.slice(0, -1));
            }
            return;
        } else {
            inputKey = key.trim() === '' ? ' ' : key.toLowerCase();
        }

        if (currentParagraph[userInput.length] === inputKey) {
            setUserInput((prevInput) => {
                const newInput = prevInput + inputKey;
                setCursorIndex(newInput.length); // Update cursor position
                return newInput;
            });
            setCurrentWord((prevWord) => prevWord + inputKey);
        } else {
            setUserInput((prevInput) => {
                const newInput = prevInput + '!';
                setCursorIndex(newInput.length); // Update cursor position
                return newInput;
            });
            setCurrentWord((prevWord) => prevWord + '!');
        }

        const keyElement = keysRef.current.find((keyRef) => keyRef.current.innerText.toLowerCase() === inputKey.toLowerCase() || (key === ' ' && keyRef.current.innerText === 'Space'));

        if (keyElement) {
            keyElement.current.focus();
        }

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => {
            setIsPaused(true); // Set pause state
            // setMessage('Concentrate!'); // Display message
        }, 3000));
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [userInput, isTyping]);

    useEffect(() => {
        if (userInput.length === currentParagraph.length) {
            setCurrentParagraph(getRandomParagraph());
            setUserInput('');
            setTimer(15); 
            setIsPaused(false); // Reset pause state
            setMessage(''); // Clear message when new paragraph starts
            setCursorIndex(0); // Reset cursor position
        }
    }, [userInput, currentParagraph]);

    useEffect(() => {
        let countdown;
        if (isTyping && !isPaused) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(countdown);
                        setCurrentParagraph(getRandomParagraph());
                        setUserInput('');
                        setIsPaused(false); // Reset pause state
                        setMessage(''); // Clear message when time runs out
                        setCursorIndex(0); // Reset cursor position
                        return 15;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [isTyping, isPaused]);

    useEffect(() => {
        if (!isTyping && userInput) {
            setIsTyping(true);
        }
    }, [isTyping, userInput, setIsTyping]);

    const getLetterClass = (letter, index) => {
        if (index < userInput.length) {
            return userInput[index] === letter ? 'text-green-500' : 'text-red-500';
        }
        return '';
    };

    return (
        <div className={`flex justify-center items-center gap-11 flex-col`}>
            {error && <Error error={error} />}
            {message && <Message message={message} />}
            <div className='keyboard-container w-11/12 sm:w-3/4 h-[5rem] bg-opacity-50 sm:overflow-hidden overflow-y-scroll p-0 sm:p-8 bg-gray-900 rounded-xl flex  items-center justify-center shadow-md'>
                <p className="text-white text-center text-sm sm:text-base md:text-base lg:text-xl font-bold">
                    {currentParagraph.split('').map((letter, index) => (
                        <span key={index} className={index === cursorIndex ? 'cursor-indicator ' : getLetterClass(letter, index)}>
                            {letter}
                        </span>
                    ))}
                </p>
            </div>
            <div className='w-3/4 flex justify-center   md:justify-end'>
                <p className=' bg-gray-500 rounded-full p-2 text-center shadow-lg shadow-slate-400 text-white  w-12 h-12 text-2xl sm:w-14 sm:h-14 font-bold sm:text-4xl absolute -mt-4 lg:mt-44'>{timer}</p>
            </div>
            <div className='keyboard-keys-container w-full sm:w-[600px] md:w-[700px] flex flex-col sm:-mt-8 sm:bg-gray-900 sm:rounded-xl sm:shadow-md p-4'>
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center w-full">
                        {row.map((key, keyIndex) => {   
                            const keyRef = useRef(null); // Create a ref for each key
                            keysRef.current.push(keyRef); // Add the ref to the array

                            return (
                                <div
                                    ref={keyRef}
                                    className={`key bg-gray-800 text-white font-bold flex items-center justify-center rounded-md m-1 focus:scale-110 focus:bg-gray-600 outline-none transition-transform duration-200 ${
                                        key === 'space' ? 'w-3/4 h-12 sm:h-16' : 'w-16 sm:h-16'
                                    }`}
                                    key={keyIndex}
                                    tabIndex={0}
                                >
                                    {key === 'space' ? 'Space' : key}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Content;
