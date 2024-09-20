"use client";

import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoMenuOutline } from 'react-icons/io5';
import { LuArrowDownUp } from "react-icons/lu";

const containerStyle = {
  width: '100vw',
  height: '72vh',
};

const center = {
  lat: -23.5505,
  lng: -46.6333,
};

const FeedMaps: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [routeInfo, setRouteInfo] = useState<{ duration?: string; distance?: string }>({});
  const router = useRouter();  // Hook para navegação

  const calculateRoute = () => {

    // Nessa função para o usuário digitar o local de origem e destino
    if (!origin || !destination) {
      const message = 'Por favor, insira o local de origem e destino.';
      setErrorMessage(message);
      return;
    }

    // Função para se o usuário digitar alguns dos locais errados aparecer mensagens de erro.
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result && result.routes.length > 0) {
          const route = result.routes[0];
          const leg = route.legs[0];
          setDirections(result);
          setRouteInfo({
            duration: leg.duration ? leg.duration.text : 'Desconhecido',
            distance: leg.distance ? leg.distance.text : 'Desconhecido',
          });
          setErrorMessage(''); // Limpa qualquer mensagem de erro anterior
        } else {
          const message = 'Não foi possível calcular a rota. Verifique os endereços e tente novamente.';
          setErrorMessage(message);
        }
      }
    );
  };

  // Função para inverter origem e destino
  const invertRoute = () => {
    const newOrigin = destination;
    const newDestination = origin;
    setOrigin(newOrigin);
    setDestination(newDestination);
  };

  const handleConfigClick = () => {
    router.push("/atualizar-perfil");  // Navegar para a página de configurações
  };

  return (
    // Chama API - GOOGLE MAPS
    <LoadScript 
      googleMapsApiKey="AIzaSyAvpVLR0JkPrVlCBnrJB8D8HH_bOfCMsX0"
    >
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={10}
      >
        {directions && <DirectionsRenderer directions={directions} />}

        {/* Aqui será as informações de duração e distância  */}
        {routeInfo.duration && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '10px',
              borderRadius: '8px',
              zIndex: 1000,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <p>
              <strong>Duração: </strong>{routeInfo.duration}
            </p>
            <p>
              <strong>Distância: </strong>{routeInfo.distance}
            </p>
          </div>
        )}
      </GoogleMap>

      {/* Aqui será a parte de escreve o ponto de origem e destino */}
      <div className='bg-brand-300/20'>
        <div className="flex flex-row items-center justify-center space-x-2">
          {/* Primeira coluna: origem e Destino */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Escolher ponto de partida"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="border p-2 rounded mb-3 mt-3"
            />
            <input
              type="text"
              placeholder="Digite o destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border p-2 rounded mb-3"
            />
          </div>
          {/* Aqui teremos um botão de inversão, onde chama a função invertRoute */}
          <div className="flex items-center justify-center">
            <button 
              onClick={invertRoute} 
              className="bg-white border border-gray-400 text-black px-2 py-2 mx-2 rounded-full"
              title="Inverter origem e destino"
            >
              <LuArrowDownUp className="w-6 h-6"/>
            </button>
          </div>
        </div>
        {/* Aqui temos o calculateRoute onde vai calcular a rota para o usuário */}
        <div className="flex justify-center">
          <button 
            onClick={calculateRoute} 
            className="bg-brand-200 text-white px-4 py-2 rounded mb-4 flex items-center"
          >
            <span>Calcular Rota</span>
            <FiSearch className="w-5 h-5 ml-2"/>
          </button>
        </div>
        {/* Já aqui será a mensagem de erro, se acaso o usuário inserir o destino ou a partida errado */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      {/* Botão de configurações sobre o mapa */}
      <button
        onClick={handleConfigClick}
        style={{
          position: 'absolute',
          top: '92px',
          left: '10px',
          backgroundColor: '#FFC107',
          border: 'none',
          borderRadius: '50%',
          padding: '10px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        <IoMenuOutline className='w-8 h-8'/>
      </button>
        
    </LoadScript>
  );
};

export default FeedMaps;
