'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const availableOptions = [
    {
      name: 'Rock',
      slug: 'rock',
      beats: ['scissors'],
      loses: ['paper'],
    },
    {
      name: 'Paper',
      slug: 'paper',
      beats: ['rock'],
      loses: ['scissors'],
    },
    {
      name: 'Scissors',
      slug: 'scissors',
      beats: ['paper'],
      loses: ['rock'],
    },
  ];

  const [computerScore, setComputerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);

  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState('');

  const btnPress = (value) => {
    setMessageVisible(false);
    let randomNumber = Math.floor(Math.random() * availableOptions.length);
    const computerChoice = availableOptions[randomNumber];
    const playerWinner = winnerCheck(value, computerChoice);
  };

  const winnerCheck = (playerValue, computerValue) => {
    if (playerValue.slug === computerValue.slug) {
      const text = renderGameplayText(
        `You chose: ${playerValue.name}\n\n The computer chose: ${computerValue.name}\n\nIt's a Tie!`
      );
      return `You chose: ${playerValue.name} \n\n The computer chose ${computerValue.name}\n\nIt's a Tie!`;
    }
    if (computerValue.loses.includes(playerValue.slug)) {
      setPlayerScore(playerScore + 1);
      renderGameplayText(
        `You chose: ${playerValue.name}\n\n The computer chose: ${computerValue.name}\n\nYou win, ${playerValue.name} beats ${computerValue.name}`
      );
      return `You win, ${playerValue.name} beats ${computerValue.name}`;
    }
    if (playerValue.loses.includes(computerValue.slug)) {
      setComputerScore(computerScore + 1);
      renderGameplayText(
        `You chose: ${playerValue.name} \n\n The computer chose ${computerValue.name}\n\nYou lose, ${computerValue.name} beats ${playerValue.name}`
      );
      return `You lose, ${computerValue.name} beats ${playerValue.name}`;
    }
  };

  const renderGameplayText = (text) => {
    setMessage(text);
    setMessageVisible(true);
  };

  const restartGame = () => {
    setMessageVisible(false);
    setMessage('');
    setComputerScore(0);
    setPlayerScore(0);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Rock, Paper, Scissors Game</h1>
      <div className='flex-1'>
        <div className='my-5 justify-between'>
          <h2 className='my-5'>Choose from the options below!</h2>
          {availableOptions.map((choice) => (
            <button
              className='mx-5'
              key={choice.slug}
              onClick={() => btnPress(choice)}
            >
              {choice.name}
            </button>
          ))}
        </div>
      </div>
      {messageVisible && (
        <div className='flex-grow'>
          <h3 style={{ whiteSpace: 'pre-wrap' }} className='text-xl'>{message}</h3>
        </div>
      )}
      <div>
        <h3>Computer Score: {computerScore}</h3>
        <h3>Player Score: {playerScore}</h3>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </main>
  );
}
