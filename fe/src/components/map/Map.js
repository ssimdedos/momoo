import React, { useState } from "react";
import { useEffect } from "react";
// import piknic from "assets/imgs/piknic.jpg";
import { getGalleryInfo } from "services/MapService";
import './map.css'
const Map = () => {
  const [galleryInfo, setGalleryInfo] = useState({});
  useEffect(()=> {
    const mapDiv = document.querySelector('#map');
    const mapOps = {
      center: new window.naver.maps.LatLng(37.551216799999885,126.97986827903746),
      zoom: 12,
      zoomControl: true,
      scaleControl: true,
      logoControl: false,
      mapDataControl: false,
      minZoom: 6
    }
    const map = new window.naver.maps.Map(mapDiv, mapOps);

    const getMarkers = async () => {
      const g_infos = await getGalleryInfo();
      g_infos.forEach(e => {
        // console.log(e.gallery_name,e.latitude, e.longitude);
        let marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(parseFloat(e.latitude), parseFloat(e.longitude)),
          map: map
        });
        e.marker = marker;

        const contentString = [
          `<div>`,
          `  <div>`,
          `    <h3>${e.gallery_name}</h3><br />`,
          `    <p>`,
          `      <a href="${e.url}" target='_blank' rel="noopener noreferrer">${e.url}</a>`,
          `    </p>`,
          `  </div>`,
          `</div>`,
        ].join(``);

        const infowindow = new window.naver.maps.InfoWindow({
          content: contentString
        });
        window.naver.maps.Event.addListener(marker, "click", (e)=> {
          if (infowindow.getMap()) infowindow.close();
          else infowindow.open(map, marker);
          // console.log(e);
          map.panTo(e.coord);
        });
      });
      setGalleryInfo(g_infos);
    };
    getMarkers();
  },[]);
  
  const moveMarker = (e)=> {
    galleryInfo.find((i)=> i.num === Number(e.target.id)).marker.trigger('click');
  }
  
  return (
    <div>
      <div id="map-container">
        <ul className="map-list gallery-list">
          {Object.keys(galleryInfo).length > 1? (
            galleryInfo.map((g) => {
              return <li><button key={g.num} id={g.num} onClick={(e)=> {moveMarker(e)}} >{g.gallery_name}</button></li>
            })
          ): <span>loading ...</span>}

        </ul>
        <div id="map" style={{ width: "700px", height: "450px" }} />
        <ul className="map-list sub-list"></ul>
      </div>
    </div>
  );
};

export default Map