import type mapboxgl from "mapbox-gl";

export function addEnergyLayer(map: mapboxgl.Map) {
        if(!map.getSource("energy")){

            map.addSource("energy", {
                type:"raster",
                tiles:["https://example.com/geoserver/wms?service=WMS&request=GetMap&layers=energy&styles=&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image/png"],
                tileSize: 256  
            });

            map.addLayer({
                id: "energy-layer",
                type: "raster",
                source: "energy",
            });
        }
    }

export function removeEnergyLayer(map :mapboxgl.Map){
    if(map.getLayer("energy-layer")) map.removeLayer("energy-layer")
    if(map.getSource("energy")) map.removeSource("energy")
}
