import type mapboxgl from "mapbox-gl";


export function addCropsLayer(map: mapboxgl.Map) {
    if(!map.getSource("crops")){

        map.addSource("crops", {
            type:"raster",
            tiles:[
                "https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?" +
                "SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=Agricultural_Lands_Croplands_2000" +
                "&STYLES=&FORMAT=image/png&TRANSPARENT=true" +
                "&CRS=EPSG:3857&WIDTH=256&HEIGHT=256" +
                "&BBOX={bbox-epsg-3857}"
        ],
            tileSize: 256  
         
        });

        map.addLayer({
            id: "crops-layer",
            type: "raster",
            source: "crops",
        });
    }

}

export function removeCropsLayer(map :mapboxgl.Map){
    if(map.getLayer("crops-layer")) map.removeLayer("crops-layer")
    if(map.getSource("crops")) map.removeSource("crops")
}