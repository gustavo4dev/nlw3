import React from 'react';
import { Link } from 'react-router-dom'
import { Map, TileLayer } from 'react-leaflet'

import { FiPlus } from 'react-icons/fi';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';


import '../styles/pages/orphanages-map.css';

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Lagoa Vermelha</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>


      <Map
        center={[-28.2212779, -51.5255223]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/*TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
        <TileLayer url={`https://api.mapbox.com/styles/v1/gpassos/ckg8h6wcm0ltg19qtwuz6kddv/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;