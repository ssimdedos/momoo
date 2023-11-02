import React from "react";
import { useEffect } from "react";
// import piknic from "assets/imgs/piknic.jpg";
import { getGalleryInfo } from "services/MapService";
import './map.css'
const Map = () => {
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
    };
    getMarkers();

  },[]);
  
  
  return (
    <div>
      <div id="map-container">
        <ul className="map-list gallery-list">
          <li><a href="1">metadata content</a></li>
          <li><a href="2">flow content</a></li>
          <li><a href="3">sectioning content</a></li>
          <li><a href="4">heading content</a></li>
          <li><a href="5">phrasing content</a></li>
          <li><a href="6">embedded content</a></li>
          <li><a href="7">interactive content</a></li>
          <li><a href="8">palpable content</a></li>
        </ul>
        <div id="map" style={{ width: "700px", height: "450px" }} />
        <ul className="map-list sub-list"></ul>
      </div>
    </div>
  );
};

export default Map