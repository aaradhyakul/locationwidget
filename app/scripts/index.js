const latEle = document.getElementById("latitude");
const longEle = document.getElementById("longitude");
const alt = document.getElementById("altitude");
const speed = document.getElementById("speed");
L.mapquest.key = "8AxABooymOTsfd0jaIAP2zjVQUoTFPhb";
const latlng = {
  lat: null,
  lng: null,
};

let map = L.mapquest.map("map", {
  center: [71, 19],
  layers: L.mapquest.tileLayer("map"),
  zoom: 12,
});
let popup = L.popup();

const initMap = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      latlng.lat = pos.coords.latitude;
      latlng.lng = pos.coords.longitude;
      latEle.textContent = pos.coords.latitude.toFixed(2);
      longEle.textContent = pos.coords.longitude.toFixed(2);
      alt.textContent =
        pos.coords.altitude === null
          ? "Not available"
          : pos.coords.altitude.toFixed(2);
      speed.textContent =
        pos.coords.speed === null
          ? "Not available"
          : pos.coords.speed.toFixed(2);
      map.setView(latlng);
      L.marker(latlng, {
        icon: L.mapquest.icons.marker(),
        draggable: false,
      }).addTo(map);
    });
  } else {
    console.log("use IP approximation");
  }
};

const mapClick = (e) => {
  popup.setLatLng(e.latlng);
  popup.setContent(`You have clicked the map at:${e.latlng}`);
  popup.openOn(map);
};

window.addEventListener("load", initMap);
map.on("click", mapClick);
