import { AmenityList } from '@/shared/types/types';
import { TbWifi } from 'react-icons/tb';
import { TbAirConditioning } from 'react-icons/tb';

const amenities: AmenityList = {
    'wifi': {
        label: 'Wi-Fi',
        name: 'wifi',
        icon: TbWifi,
    },
    'airConditioner': {
        label: 'Кондиционер',
        name: 'airConditioner',
        icon: TbAirConditioning,
    },
};

export default amenities;