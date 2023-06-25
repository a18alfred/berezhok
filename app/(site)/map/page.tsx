import ClientOnly from '@/shared/components/ClientOnly/ClientOnly';
import MapClient from '@/app/(site)/map/MapClient';

const MapPage = () => {
    return (
        <ClientOnly>
            <MapClient />
        </ClientOnly>
    );
};

export default MapPage;
