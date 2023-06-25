'use client';

import React, { useRef, useState } from 'react';
import regionByISO from '@/shared/constants/regionByISO';
import { Map, YMaps, YMapsApi } from 'react-yandex-maps';
import styles from './MainMap.module.scss';
import BarLoader from '@/shared/components/Loader/BarLoader';
import { SpinnerLoaderXl } from '@/shared/components/Loader/SpinnerLoader';
import useMapPoints from '@/app/hooks/useMapPoints';
import {
    BalloonInfoCache,
    hideRegionsOptions,
    initialMapOptions,
    initialMapState,
    initialObjectManagerOptions,
    mouseenterRegion,
    mouseleaveRegion,
    regionsDrawingOptions,
    selectedRegionDrawingOptions,
    zoomClusterBalloonSettings,
} from '@/app/components/MainMap/MainMap.config';
import { getListingsMapInfo } from '@/app/requests/listing';
import prepareMapBalloon from '@/shared/libs/prepareMapBalloon';
import regionBorders from '@/shared/constants/regionBorders';

const MainMap = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const { getPointsBeRegion, isLoading } = useMapPoints();
    const mapRef = useRef<any>(null); // Ссылка на объект карты
    const ymapsRef = useRef<YMapsApi | null>(null); // Ссылка на ymaps
    const objectManagerRef = useRef<any>(null); // Ссылка на объект менеджера объектов карты
    const paneRef = useRef<any>(null); // Ссылка на объект белой панели/слоя для карты
    const regionCollectionsRef = useRef<any>(null); // Ссылка на коллекцию регионов
    const geoQueryRef = useRef<any>(null); // Ссылка на объект geoQuery
    const backButtonRef = useRef<any>(null); // Ссылка на объект кнопки 'Россия'
    const selectedRegionIso = useRef(''); // Для сохранения ISO выбранного региона.
    const balloonInfoCacheRef = useRef<BalloonInfoCache>({});

    // Обработчик изменений зума
    const onBoundsChanged = (e: any) => {
        if (e?.originalEvent?.newZoom != e?.originalEvent?.oldZoom) {
            if (
                e.originalEvent.newZoom >=
                zoomClusterBalloonSettings.openBalloonZoom
            ) {
                if (
                    !objectManagerRef?.current?.options.get(
                        'clusterHasBalloon',
                    )
                )
                    objectManagerRef?.current?.options.set(
                        'clusterHasBalloon',
                        true,
                    );
            } else {
                if (
                    objectManagerRef?.current?.options.get(
                        'clusterHasBalloon',
                    )
                )
                    objectManagerRef?.current?.options.set(
                        'clusterHasBalloon',
                        false,
                    );
            }
        }
    };

    // Функция для загрузки данных выделенного региона и добавления точек в objectManager
    const fetchRegionData = (iso: string) => {
        const regionName = regionByISO[iso].name;
        if (!regionName) return;

        getPointsBeRegion(regionName).then((mapPoints) => {
            objectManagerRef.current.add(mapPoints);
        });
    };

    // Функция проверки есть ли данные балуна у конкретного объявления
    const hasBalloonData = (objectId: string) => {
        return objectManagerRef.current.objects.getById(objectId).properties
            .balloonContent;
    };

    // Функция загрузки данных балуна объекта
    const loadBalloonData = async (objectId: string, clusterId = 0, isCluster = false) => {
        let obj = objectManagerRef.current.objects.getById(objectId);
        if (hasBalloonData(objectId)) {
            if (!isCluster)
                objectManagerRef.current.objects.balloon.open(objectId);
            return;
        }
        // Если данных нет, то пишем Идёт загрузка данных
        obj.properties.balloonContent = 'Загрузка...';
        if (!isCluster)
            objectManagerRef.current.objects.balloon.open(objectId);


        try {
            if (!balloonInfoCacheRef.current[objectId]) {
                const resp = await getListingsMapInfo(objectId);
                balloonInfoCacheRef.current[objectId] = resp.data;
            }
            const info = balloonInfoCacheRef.current[objectId];

            // Данные получены. Обновляем объект и кластер
            obj.properties.balloonContent = await prepareMapBalloon(info);
            objectManagerRef.current.objects.balloon.setData(obj);
            if (
                isCluster &&
                objectManagerRef.current.clusters.balloon.isOpen(
                    clusterId,
                )
            ) {
                objectManagerRef.current.clusters.balloon.setData(
                    objectManagerRef.current.clusters.balloon.getData(),
                );
            }
        } catch (e) {
            obj.properties.balloonContent =
                'Не удалось загрузить данные';
            objectManagerRef.current.objects.balloon.setData(obj);
            if (
                isCluster &&
                objectManagerRef.current.clusters.balloon.isOpen(
                    clusterId,
                )
            ) {
                objectManagerRef.current.clusters.balloon.setData(
                    objectManagerRef.current.clusters.balloon.getData(),
                );
            }
        }
    };

    // Первоначальная инициализация карты
    const init = (ymaps: YMapsApi) => {
        if (mapRef.current) {
            ymapsRef.current = ymaps;
            // Создаем панель с белой заливкой для карты регионов
            paneRef.current = new ymapsRef.current.pane.StaticPane(
                mapRef.current,
                {
                    zIndex: 100,
                    css: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ffffff',
                    },
                },
            );
            // Создаем кнопку для возврата на карту регионов
            backButtonRef.current = new ymapsRef.current.control.Button({
                data: {
                    // Текст кнопки.
                    content: '<b>Россия</b>',
                    // Текст всплывающей подсказки, которая появляется
                    // при наведении на кнопку курсора мыши.
                    title: 'Вернуться на карту России',
                },
                options: {
                    maxWidth: [28, 150, 178],
                },
            });

            // При нажатии кнопки возврата на карту регионов настраиваем карту и вызываем функцию добавления регионов
            backButtonRef?.current?.events.add('press', () => {
                mapRef.current.controls.remove(backButtonRef.current);
                mapRef.current.controls
                    .get('typeSelector')
                    .options.set('visible', false);
                mapRef.current.panes.append('white', paneRef.current);
                mapRef.current.options.set('minZoom', 0);
                mapRef.current.setBounds(initialMapState.bounds, {
                    preciseZoom: true,
                });
                mapRef.current.options.set('minZoom', mapRef.current.getZoom());
                objectManagerRef.current.removeAll();
                addRegionsToMap();
            });
            // Добавляем белую панель на карту регионов
            mapRef.current.panes.append('white', paneRef.current);

            // Настраиваем стандартные кнопки управления картой и удаляем ненужные
            mapRef.current.controls
                .get('typeSelector')
                .options.set({ size: 'small', visible: false });
            mapRef.current.controls.remove('trafficControl');
            mapRef.current.controls
                .get('rulerControl')
                .options.set('position', { bottom: -1000 });

            mapRef.current.controls.get('zoomControl').options.set({
                size: 'small',
                position: {
                    top: '47px',
                    left: '10px',
                },
            });

            const geolocationControl = mapRef.current.controls.get(
                'geolocationControl',
            );
            geolocationControl.options.set({
                size: 'small',
                noPlacemark: true,
            });
            // Добавляем обработчик для "Определить ваше местоположение"
            geolocationControl.events.add('locationchange', (e: any) => {
                onGeoLocationFound(e);
            });

            let searchControl = mapRef.current.controls.get('searchControl');
            searchControl.options.set({
                size: 'small',
            });
            searchControl.options.set('noPlacemark', true);
            // Добавляем обработчик для поиска по адресу
            searchControl.events.add('resultselect', (e: any) => {
                onSearchFound(e, searchControl);
            });

            // Создаем и настраиваем менеджер объектов
            objectManagerRef.current = new ymaps.ObjectManager(
                initialObjectManagerOptions,
            );

            // Настраиваем стандартный вид точек на карте
            objectManagerRef.current.objects.options.set(
                'preset',
                'islands#redDotIcon',
            );
            // Настраиваем стандартный вид кластера на карте
            objectManagerRef.current.clusters.options.set(
                'preset',
                'islands#invertedRedClusterIcons',
            );

            // Обрабатываем клик по точке на карте и открываем балун
            objectManagerRef.current.objects.events.add('click', (e: any) => {
                let objectId = e.get('objectId');
                loadBalloonData(objectId);
            });

            // Обрабатываем клик по кластеру на карте и открываем балун
            objectManagerRef.current.clusters.events.add('click', (e: any) => {
                let objectId = e.get('objectId');
                let cluster = objectManagerRef.current.clusters.getById(
                    e.get('objectId'),
                );
                // Проверяем зум и если находимся близко, то делаем запрос по данным точек в кластере чтобы заполнить балун
                if (
                    mapRef.current.getZoom() >=
                    zoomClusterBalloonSettings.openBalloonZoom
                ) {
                    for (let obj in cluster.features) {
                        loadBalloonData(
                            cluster.features[obj].id,
                            objectId,
                            true,
                        );
                    }
                }
            });

            mapRef.current.options.set('minZoom', mapRef.current.getZoom());

            // Добавляем обработчики изменения области видимости и размера карты
            mapRef.current.events.add('boundschange', onBoundsChanged);
            mapRef.current.events.add('sizechange', () => {
                if (selectedRegionIso.current === '') {
                    mapRef.current.options.set('minZoom', 0);
                    mapRef.current.setBounds(initialMapState.bounds, {
                        preciseZoom: true,
                    });
                    mapRef.current.options.set(
                        'minZoom',
                        mapRef.current.getZoom(),
                    );
                    mapRef.current.container.fitToViewport();
                }
            });

            // Добавляем менеджер объектов на карту
            mapRef.current.geoObjects.add(objectManagerRef.current);

            // Вызываем инициализацию регионов
            initRegionsMap();
        }
    };

    // Функция инициализации регионов
    const initRegionsMap = () => {
        if (!ymapsRef.current) return;

        if (!ymapsRef.current) return;
        // Создадим объект, в котором будут храниться коллекции с нашими регионами.
        regionCollectionsRef.current = {};
        // Для каждого региона создадим коллекцию.
        for (const region in regionByISO) {
            // Создадим и скроем регион и добавим в коллекцию
            regionCollectionsRef.current[
                region
                ] = new ymapsRef.current.GeoObjectCollection(
                null,
                hideRegionsOptions,
            );
            // Создадим свойство в коллекции, которое позже наполним названиями регионов.
            regionCollectionsRef.current[region].properties.name = [];
            // Создадим свойство в коллекции, которое позже наполним iso регионов.
            regionCollectionsRef.current[region].properties.iso = [];
        }

        regionBorders.features.forEach((feature) => {
            if (!ymapsRef.current) return;

            let iso = feature.properties.iso3166;

            let name = feature.properties.name;

            // Для каждого региона зададим подсказку с названием региона
            feature.properties.hintContent =
                '<div class="mapHoverHint">' + name + '</div>';
            // Добавим регион РФ в соответствующую коллекцию.
            regionCollectionsRef.current[iso].add(
                new ymapsRef.current.GeoObject(feature),
            );
            // Добавим имя и iso региона РФ в массив.
            regionCollectionsRef.current[iso].properties.name.push(
                name,
            );
            regionCollectionsRef.current[iso].properties.iso.push(iso);
        });

        for (let region in regionCollectionsRef.current) {
            // Добавим регион на карту
            mapRef.current.geoObjects.add(
                regionCollectionsRef.current[region],
            );

            // При клике на регион выберем и обработаем
            regionCollectionsRef.current[region].events.once(
                'click',
                (event: any) => {
                    let target = event.get('target');
                    selectRegion(target.getParent().properties.iso);
                },
            );

            // При входе курсора в пределы региона поменяем опции
            regionCollectionsRef.current[region].events.add(
                'mouseenter',
                (event: any) => {
                    let currentRegion = event.get('target').getParent();
                    currentRegion.options.set(mouseenterRegion);
                },
            );
            // При выводе курсора за пределы региона вернем опции по умолчанию.
            regionCollectionsRef.current[region].events.add(
                'mouseleave',
                (event: any) => {
                    let currentRegion = event.get('target').getParent();
                    currentRegion.options.set(mouseleaveRegion);
                },
            );
        }
        // Создадим объект geoQuery для дальнейшего использовани
        geoQueryRef.current = ymapsRef.current.geoQuery(
            mapRef.current.geoObjects,
        );
        // Отобразим регионы на карте
        addRegionsToMap();
    };

    // Функция добавления регионов на карту
    const addRegionsToMap = () => {
        // Если был выбран регион до возрата на карту регионов, то подпишемся на событие клика по нему
        if (selectedRegionIso.current != '') {
            regionCollectionsRef.current[
                selectedRegionIso.current
                ].events.once('click', (event: any) => {
                let target = event.get('target');
                selectRegion(target.getParent().properties.iso);
            });
        }

        selectedRegionIso.current = '';
        // Отобразим регионы на карте.
        mapRef.current.geoObjects.each((region: any) => {
            region.options.set(regionsDrawingOptions);
        });
    };

    // Функция выбора конкретного региона и отображения его на карте
    const selectRegion = (iso: string, toSetBounds = true) => {
        // Запоминаем iso выбранного региона
        selectedRegionIso.current = iso;
        // Удаляем белую панель с карты
        mapRef.current.panes.remove(paneRef.current);

        if (toSetBounds)
            mapRef.current.setBounds(regionByISO[iso].boundedBy, {
                preciseZoom: true,
            });

        // Скрываем все регионы кроме выбранного. У выбранного меняем опции
        mapRef.current.geoObjects.each((region: any) => {
            let regionIso = region.properties.iso;
            if (regionIso != iso) region.options.set(hideRegionsOptions);
            else region.options.set(selectedRegionDrawingOptions);
        });
        // Добавляем кнопки управленя для карты региона
        mapRef.current.controls
            .get('typeSelector')
            .options.set('visible', true);
        mapRef.current.controls.add(backButtonRef.current, {
            float: 'left',
            size: 'medium',
        });

        // Вызываем функцию загрузки данных региона
        fetchRegionData(iso);
    };

    // Функция для обработки кнопки нахождения вашего местоположения
    const onGeoLocationFound = (e: any) => {
        if (!geoQueryRef.current) return;
        let position = e.get('position');
        let coords = e.get('geoObjects').get(0);
        let result = geoQueryRef.current.searchContaining(coords).get(0);
        if (result != undefined) {
            let resultIso = result.properties._data.iso3166;
            // Если до выполнения данной функции был выбран другой регион, то подпишемся на клик по нему
            if (
                selectedRegionIso.current != '' &&
                selectedRegionIso.current != resultIso
            ) {
                regionCollectionsRef.current[
                    selectedRegionIso.current
                    ].events.once('click', (event: any) => {
                    let target = event.get('target');
                    selectRegion(target.getParent().properties.iso);
                });
            }
            // Выбираем регион и отображаем его
            selectRegion(resultIso, true);
            // Устанавливаем центр и зум в соответвии с местоположением пользователя
            mapRef.current.setZoom(15);
            mapRef.current.setCenter(position);
        }
    };

    // Функция для обработки кнопки нахождения адреса
    const onSearchFound = (e: any, searchControl: any) => {
        let index = e.get('index');
        searchControl.getResult(index).then((geometry: any) => {
            let result = geoQueryRef.current.searchContaining(geometry).get(0);
            if (result != undefined) {
                let resultIso = result.properties._data.iso3166;
                // Если до выполнения данной функции был выбран другой регион, то подпишемся на клик по нему
                if (
                    selectedRegionIso.current != '' &&
                    selectedRegionIso.current != resultIso
                ) {
                    regionCollectionsRef.current[
                        selectedRegionIso.current
                        ].events.once('click', (event: any) => {
                        let target = event.get('target');
                        selectRegion(target.getParent().properties.iso);
                    });
                }
                // Выбираем регион и отображаем его
                selectRegion(resultIso, false);
            }
        });
    };

    return (
        <>
            {!mapLoaded &&
                <div className={styles.loader}>
                    <SpinnerLoaderXl />
                </div>
            }
            <YMaps
                query={{
                    load: 'package.full',
                    apikey: process.env.NEXT_PUBLIC_YANDEX_MAP,
                }}
            >
                <Map
                    className={styles.map}
                    options={initialMapOptions}
                    instanceRef={(instance) => mapRef.current = instance}
                    state={initialMapState}
                    onLoad={(ymaps) => {
                        init(ymaps);
                        setMapLoaded(true);
                    }}
                />
                <BarLoader isLoading={isLoading} />
            </YMaps>
        </>
    );
};

export default MainMap;
