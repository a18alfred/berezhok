'use client';

import React from 'react';
import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import Heading from '@/shared/components/Heading/Heading';
import MapWithPlacemark from '@/shared/components/MapWithPlacemark/MapWithPlacemark';

interface MapStepProps {
    address: DaDataSuggestion<DaDataAddress> | undefined;
    setAddress: React.Dispatch<React.SetStateAction<DaDataSuggestion<DaDataAddress> | undefined>>;
}

const MapStep: React.FC<MapStepProps> = ({ address, setAddress }) => {
    const onDragged = (geo_lat: number, geo_lon: number) => {
        setAddress(prev => {
            if (!prev) return undefined;
            return {
                ...prev,
                data: {
                    ...prev.data,
                    geo_lat: geo_lat.toString(),
                    geo_lon: geo_lon.toString(),
                },
            };
        });
    };

    return (
        <>
            <Heading
                title='Укажите точное место на карте'
                subtitle='Переместите указатель'
                center
            />
            <MapWithPlacemark
                isDraggable={true}
                geo_lat={parseFloat(address?.data.geo_lat || '55.761231082721615')}
                geo_lon={parseFloat(address?.data.geo_lon || '37.608905931350705')}
                onDragged={onDragged}
            />
        </>
    );
};

export default MapStep;
