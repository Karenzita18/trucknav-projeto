"use client";

import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: -23.5505,
  lng: -46.6333,
};

const App: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função para falar a mensagem usando a Web Speech API
  const speakMessage = (message: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
  };

  const calculateRoute = () => {
    if (!origin || !destination) {
      const message = 'Por favor, insira o local de origem e destino.';
      setErrorMessage(message);
      speakMessage(message);
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          setErrorMessage(''); // Limpa qualquer mensagem de erro anterior
        } else {
          const message = 'Não foi possível calcular a rota. Verifique os endereços e tente novamente.';
          console.error(`Erro ao buscar direções: ${status}`);
          setErrorMessage(message);
          speakMessage(message); // Fala a mensagem de erro
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAvpVLR0JkPrVlCBnrJB8D8HH_bOfCMsX0">
      <div style={{ padding: '10px' }}>
        <input
          type="text"
          placeholder="Digite o local de origem"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Digite o destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={calculateRoute}>Calcular Rota</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default App;