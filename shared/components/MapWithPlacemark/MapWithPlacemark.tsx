import { Placemark, YMaps, Map } from 'react-yandex-maps';
import styles from './MapWithPlacemark.module.scss';
import React, { useState } from 'react';
import { SpinnerLoaderXl } from '@/shared/components/Loader/SpinnerLoader';

interface MapWithPlacemarkProps {
    geo_lat: number;
    geo_lon: number;
    onDragged?: (geo_lat: number, geo_lon: number) => void;
    isDraggable: boolean;
}

const MapWithPlacemark: React.FC<MapWithPlacemarkProps> = ({ geo_lat, geo_lon, onDragged, isDraggable }) => {
    const [loaded, setLoaded] = useState(false);
    const [placeDot, setPlaceDot] = useState(geo_lat && geo_lon ? [geo_lat, geo_lon] : [55.761231082721615, 37.608905931350705]);
    const onLoad = () => {
        setLoaded(true);
    };

    const onDragend = (e: any) => {
        const newCoords = e.get('target').geometry.getCoordinates();
        setPlaceDot(newCoords);
        if (onDragged) onDragged(newCoords[0], newCoords[1]);
    };

    return (
        <>
            {!loaded &&
                <div className={styles.map}>
                    <SpinnerLoaderXl />
                </div>
            }
            <YMaps
                query={{
                    ns: 'use-load-option',
                    apikey: process.env.NEXT_PUBLIC_YANDEX_MAP,
                }}
            >
                <Map
                    onLoad={onLoad}
                    className={styles.map}
                    options={{ suppressMapOpenBlock: true }}
                    state={{
                        center: placeDot,
                        zoom: 15,
                        controls: ['zoomControl', 'fullscreenControl'],
                        copyrights: ['Бережок'],
                    }}
                    modules={[
                        'control.ZoomControl',
                        'control.FullscreenControl',
                        'geocode',
                    ]}
                >
                    <Placemark
                        onDragend={onDragend}
                        options={{
                            draggable: isDraggable,
                            hideIconOnBalloonOpen: true,
                            visible: true,
                        }}
                        modules={['geoObject.addon.balloon']}
                        geometry={placeDot}
                    />
                </Map>
            </YMaps>
        </>
    );
};

export default MapWithPlacemark;
