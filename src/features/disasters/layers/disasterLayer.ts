import axios from "axios";
import type mapboxgl from "mapbox-gl";
let disasterType = "EQ;FL;DR;VO;WF;TS" 


function flattenSeverity(data: GeoJSON.FeatureCollection): GeoJSON.FeatureCollection {
    return {
      type: "FeatureCollection",
      features: data.features.map(f => {
        const sev = f.properties?.severitydata?.severity;
        return {
          ...f,
          properties: {
            ...f.properties,
            severity: sev
          }
        };
      })
    } as GeoJSON.FeatureCollection;
  }
  

export async function addDisastersLayer(map: mapboxgl.Map) {  

    const response = await axios.get(
        `https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?fromDate=2023-10-06&toDate=2025-03-14&alertlevel=Green;Orange;Red&eventlist=${disasterType}&country=`,
      )

      const disasters = response.data.features
      console.log(disasters)

      const filteredData = flattenSeverity(response.data);
    
    if(!map.getSource("disasters")){

        map.addSource("disasters", {
            type:"geojson",
            data: filteredData
        });

        map.addLayer({
            id: "disasters-layer",
            type: "circle",
            source: "disasters",
            paint: {
                "circle-radius": 8,
                "circle-color": [
                  "step",
                  ["get", "severity"],
                  "#2a9d8f",             // default
                  4, "blue",          // >=4 moderate
                  6, "orange",
                  7, "red"
                ]
              }
        });
    }

}

export function removeDisastersLayer(map :mapboxgl.Map){    
    if(map.getLayer("disasters-layer")) map.removeLayer("disasters-layer")
    if(map.getSource("disasters")) map.removeSource("disasters")
}