
import React, {useState, useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, useMapEvents } from 'react-leaflet'
import './App.css';
import gtavdata from './assets/gtalocations.json';

// icons
import {Icon} from 'leaflet';
import garageicon from './assets/gtaicons/garage.png'
import gymicon from './assets/gtaicons/gym.png'
import storeicon from './assets/gtaicons/store.png'
import houseicon from './assets/gtaicons/house.png'
import jailicon from './assets/gtaicons/jail.png'

function App() {

  // create new leaflet icon object
  let houseIcon = new Icon({
    iconUrl: houseicon,
    iconSize: [30,40]
  });

  let storeIcon = new Icon({
    iconUrl: storeicon,
    iconSize: [30,40]
  })

  let gymIcon = new Icon({
    iconUrl: gymicon,
    iconSize: [30,40]
  })

  let jailIcon = new Icon({
    iconUrl: jailicon,
    iconSize: [30,40]
  })

  let garageIcon = new Icon({
    iconUrl: garageicon,
    iconSize: [30,40]
  })


  const filteredHouses = gtavdata.filter(item => item.type === "House")
  const filteredGyms = gtavdata.filter(item => item.type === "Gym")
  const filteredGarages = gtavdata.filter(item => item.type === "Garage")
  const filteredStores = gtavdata.filter(item => item.type === "Store")
  const filteredJails = gtavdata.filter(item => item.type === "Jail")

  const DraggableMarker = () => {
    const [position, setPosition] = useState([0,0]);

    // start at null then find markerRef and change to include markers content
    const markerRef = useRef(null);

    return (
      <Marker
      draggable={true}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
            if(marker!== null) {
              setPosition(marker.getLatLng())
            }
        }
      }}
      position={position}
      ref={markerRef}
      >
      <Popup>{position.lat}, {position.lng}</Popup>

      </Marker>

    )
  }

  const [checkedValue, setCheckedValue] = useState("Houses");

  // toggle icons boolean
  const CheckedListener = () => {
    useMapEvents({
      overlayadd(e) {
        setCheckedValue(e.name)
      }
    })
  }

  return (
    <div className="App">

    <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} maxBounds={[[-90,180],[90,-180]]}>
        <TileLayer

          // illustrated references tile folder here
          url="../tiles/{z}/{x}/{y}.png"
          minZoom={0}
          maxZoom={4}
          noWrap={true}
        />
        <DraggableMarker/>
        
        {/* map all data */ /* {
          gtavdata.map((item)=>(
            <Marker
            position={[item.latitude, item.longitude]}
            key={item.id}
            >
              <Popup>{item.name}</Popup>
            </Marker>
          ))
        } */}

        <CheckedListener/>

      <LayersControl position='topright'>
        <LayersControl.Overlay name="Houses" checked={checkedValue === "Houses" ? true: false}>
          <LayerGroup>
        {
          filteredHouses.map((item)=>(
            <Marker
            position={[item.latitude, item.longitude]}
            key={item.id}
            icon={houseIcon}
            >
              <Popup>{item.name}</Popup>
            </Marker>
          ))
        }
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Stores" checked={checkedValue === "Stores" ? true: false}>
      <LayerGroup>
        {
          filteredStores.map((item)=>(
            <Marker
            position={[item.latitude, item.longitude]}
            key={item.id}
            icon={storeIcon}
            >
              <Popup>{item.name}</Popup>
            </Marker>
          ))
        }
      </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Jails" checked={checkedValue === "Jails" ? true: false}>
      <LayerGroup>
        {
          filteredJails.map((item)=>(
            <Marker
            position={[item.latitude, item.longitude]}
            key={item.id}
            icon={jailIcon}
            >
              <Popup>{item.name}</Popup>
            </Marker>
          ))
        }
       </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Gyms" checked={checkedValue === "Gyms" ? true: false}>
      <LayerGroup>
        {
          filteredGyms.map((item)=>(
            <Marker
            position={[item.latitude, item.longitude]}
            key={item.id}
            icon={gymIcon}
            >
              <Popup>{item.name}</Popup>
            </Marker>
          ))
        }
        </LayerGroup>
      </LayersControl.Overlay>
      {/* put checked to show something by default*/}
      <LayersControl.Overlay name="Garages" checked={checkedValue === "Garages" ? true: false}>
      <LayerGroup>
        {
          filteredGarages.map((item)=>(
            <Marker
            position={[item.latitude, item.longitude]}
            key={item.id}
            icon={garageIcon}
            >
              <Popup>{item.name}</Popup>
            </Marker>
          ))
        }
        </LayerGroup>
        </LayersControl.Overlay>
        </LayersControl>
    </MapContainer>
    
    </div>
  );
}

export default App;
