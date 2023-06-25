import { useAppDispatch, useAppSelector } from '@/shared/state/hooks';
import { useRef, useState } from 'react';
import { getListingsMapPoints } from '@/app/requests/listing';
import { toast } from 'react-hot-toast';

export type IListingMapPoint = {
    id: string
    type: string
    geometry: {
        type: string
        coordinates: number[]
    }
}

export type MapPointsByRegion = {
    [key in string]: IListingMapPoint[]
}
const useMapPoints = () => {
    const [isLoading, setIsLoading] = useState(false);
    const mapCacheRef = useRef<MapPointsByRegion>({});

    const getPointsBeRegion = async (region: string): Promise<IListingMapPoint[]> => {
        if (mapCacheRef.current[region]) {
            const message = mapCacheRef.current[region].length === 1
                ? `Найдено 1 объявление`
                : `Найдено ${mapCacheRef.current[region].length} объявлений`;
            toast.success(message);
            return mapCacheRef.current[region];
        }

        setIsLoading(true);
        try {
            const resp = await getListingsMapPoints(region);
            const message = resp.data.mapPoints.length === 1
                ? `Найдено 1 объявление`
                : `Найдено ${resp.data.mapPoints.length} объявлений`;

            const mapPoints = resp.data.mapPoints.map((listing) => {
                return {
                    id: listing.id,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [listing.geo_lat, listing.geo_lon],
                    },
                };
            });
            mapCacheRef.current[region] = mapPoints;
            setIsLoading(false);
            toast.success(message);
            return mapPoints;
        } catch (e) {
            console.error(e);
        }
        return [];
    };

    return {
        getPointsBeRegion,
        isLoading,
    };
};

export default useMapPoints;