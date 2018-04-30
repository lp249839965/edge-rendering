
import WebScene = require("esri/WebScene");

import SceneLayer = require("esri/layers/SceneLayer");
import VectorTileLayer = require("esri/layers/VectorTileLayer");

import Basemap = require("esri/Basemap");

import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import MeshSymbol3D = require("esri/symbols/MeshSymbol3D");
import FillSymbol3DLayer = require("esri/symbols/FillSymbol3DLayer");
import SolidEdges3D = require("esri/symbols/edges/SolidEdges3D");

import novaStyle =require('../../basemap-styles/nova.json');

const novaBaseLayer = new VectorTileLayer({
  url: "https://basemaps.arcgis.com/b2/arcgis/rest/services/World_Basemap/VectorTileServer"
});
novaBaseLayer.loadStyle(novaStyle);

const webscene = new WebScene({
  basemap: new Basemap({
    baseLayers: [novaBaseLayer]
  }),
  ground: "world-elevation"
});

const buildingsLayer = new SceneLayer({
  url: "https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Manhattan/SceneServer",
  definitionExpression: "TOP20 = 1",
  renderer: new SimpleRenderer({
    symbol: new MeshSymbol3D({
      symbolLayers: [new FillSymbol3DLayer({
        material: {
          color: "#001d2d"
        },
        edges: new SolidEdges3D({
          size: 2,
          color: "#69dde5"
        })
      })]
    })
  }),
  opacity: 1
});

webscene.add(buildingsLayer);

export default webscene;