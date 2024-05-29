import { useEffect, useRef, useState } from 'react';
import paragraphs from '../Paragraph.json';
import Error from './Error';

function Content() {
    const rows = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        [' ']
    ];

    const { array } = paragraphs;

    const getRandomParagraph = () => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const [currentParagraph, setCurrentParagraph] = useState(getRandomParagraph());
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(null);

    const keysRef = useRef([]);

    const handleKeyPress = (event) => {
        const { key } = event;
        if (key === 'Backspace') {
            setError('Backspace is not allowed');
            return;
        }

        let inputKey = '';
        if (key === ' ') {
            inputKey = ' ';
        } else {
            inputKey = key.trim() === '' ? ' ' : key.toLowerCase();
        }

        if (currentParagraph[userInput.length] === inputKey) {
            setUserInput((prevInput) => prevInput + inputKey);
        } else {
            setUserInput((prevInput) => prevInput + '!');
        }

        const keyElement = keysRef.current.find((keyRef) => keyRef.current.innerText.toLowerCase() === inputKey.toLowerCase());

        if (keyElement) {
            keyElement.current.focus();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [userInput]);

    useEffect(() => {
        // Check if the user has typed the entire paragraph
        if (userInput.length === currentParagraph.length) {
            // Generate a new random paragraph
            setCurrentParagraph(getRandomParagraph());
            // Clear user input
            setUserInput('');
        }
    }, [userInput, currentParagraph]);

    const getLetterClass = (letter, index) => {
        if (index < userInput.length) {
            return userInput[index] === letter ? 'text-green-500' : 'text-red-500';
        }
        return '';
    };

    return (
        <div className='flex justify-center items-center gap-11 flex-col'>
            {error && <Error error={error} />}
            <div className='keyboard-container w-3/4 h-[5rem] bg-opacity-50 bg-gray-900 rounded-xl flex items-center justify-center shadow-md'>
                <p className="text-white text-xl text-center font-bold">
                    {currentParagraph.split('').map((letter, index) => (
                        <span key={index} className={getLetterClass(letter, index)}>
                            {letter}
                        </span>
                    ))}
                </p>
            </div>
            <div className='keyboard-keys-container w-[800px] flex flex-col bg-gray-900 rounded-xl shadow-md p-4'>
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center w-full">
                        {row.map((key, keyIndex) => {
                            const keyRef = useRef(null);
                            keysRef.current.push(keyRef);

                            return (
                                <div
                                    ref={keyRef}
                                    className={`key bg-gray-800 text-white font-bold flex items-center justify-center rounded-md m-1 focus:scale-105 focus:bg-gray-600 transition-transform duration-150 ${
                                        key === ' ' ? 'w-3/4 h-16' : 'w-16 h-16'
                                    }`}
                                    key={keyIndex}
                                    tabIndex={0}
                                >
                                    {key === ' ' ? <>&nbsp;</> : key}
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