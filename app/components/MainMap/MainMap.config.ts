// Изначальные настройки опций карты
import { MapOptions, MapState } from 'react-yandex-maps';
import { GetListingsMapInfoResult } from '@/app/requests/listing';

// Изначальные настройки состояния карты
export const initialMapState: MapState = {
    bounds: [
        [31, 18],
        [82, -167],
    ],
    type: 'yandex#map',
};
export const initialMapOptions: MapOptions = {
    maxZoom: 23,
    minZoom: 1,
    avoidFractionalZoom: false,
    suppressMapOpenBlock: true,
    restrictMapArea: true,
};
// Зум при котором у кластера появляется балун со списком проблем в нём
export const zoomClusterBalloonSettings = {
    openBalloonZoom: 13,
};
// Изначальные настройки objectManager
export const initialObjectManagerOptions = {
    clusterize: true,
    gridSize: 256,
    geoObjectOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonAccordion',
    clusterDisableClickZoom: true,
    clusterHasBalloon: false,
};
// Настройки закраски карты регионов для карты России
export const regionsDrawingOptions = {
    fill: true,
    visible: true,
    fillColor: '#d8d8dc',
    strokeColor: '#ffffff',
    strokeOpacity: 1,
    strokeWidth: 1,
    fillOpacity: 1,
    hintCloseTimeout: 0,
    hintOpenTimeout: 0,
    openHintOnHover: true,
    hintOffset: [0, -45],
};
// Настройки выделения границ региона после его выбора
export const selectedRegionDrawingOptions = {
    fill: false,
    visible: true,
    strokeColor: '#000000',
    strokeOpacity: 1,
    strokeWidth: 1,
    hintCloseTimeout: 0,
    hintOpenTimeout: 0,
    openHintOnHover: false,
};
// Цвет региона при наводке мышки
export const mouseenterRegion = {
    fillColor: '#FE375D',
};
// Цвет региона когда мышь покидает границы региона
export const mouseleaveRegion = {
    fillColor: '#d8d8dc',
};
// Настройка для скрывания регионов после выбора одного
export const hideRegionsOptions = {
    visible: false,
};

export type BalloonInfoCache = {
    [key in string]: GetListingsMapInfoResult
}
