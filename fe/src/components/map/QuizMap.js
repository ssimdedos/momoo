import { useEffect, useState } from "react";

const QuizMap = ({examInfo, answerInfo}) => {
  const [ranIndex, setRanIndex] = useState([]);

  useEffect(()=> {
    const mapDiv = document.querySelector('#map');
    const mapOps = {
      center: new window.naver.maps.LatLng(answerInfo[0].latitude,answerInfo[0].longitude),
      zoom: 16,
      zoomControl: false,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
      minZoom: 16,
      maxZoom: 16
    }
    const map = new window.naver.maps.Map(mapDiv, mapOps);

    let marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(parseFloat(answerInfo[0].latitude), parseFloat(answerInfo[0].longitude)),
      map: map
    });
    let randomIndexArray = [];
    for (let i=0; i<4; i++) {
      const rannum = Math.floor(Math.random()* examInfo.length);
      if (randomIndexArray.indexOf(rannum) === -1) {
        randomIndexArray.push(rannum);
      } else {
        i--
      }
    }
    randomIndexArray.push(-1);
    console.log()
    setRanIndex(randomIndexArray);
  },[]);


  return (
    <div>
      <div id="maaap"></div>
      <h2>1. 다음 장소는 어디일까요?</h2>
      <div id="map" style={{ width: "700px", height: "450px" }} />
        {ranIndex? ranIndex.map(e => {
          if (e === -1) return <label><input type="radio" key={-1}/>{answerInfo[0].gallery_name}</label>
          else return <label><input type="radio" key={e}/>{examInfo[e]}</label>
        }) : <h5>load ...</h5>}
    </div>
  );
};

export default QuizMap