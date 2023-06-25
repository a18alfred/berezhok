import { IoFish } from 'react-icons/io5';
import { MdOutlineApartment } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineForest } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';
import { MdHolidayVillage } from 'react-icons/md';
import { MdOutlineHotel } from 'react-icons/md';
import { CategoryList } from '@/shared/types/types';
import { FiTarget } from 'react-icons/fi';
import { HiHomeModern } from 'react-icons/hi2';
import { MdOutlineGarage } from 'react-icons/md';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { TbShovel } from 'react-icons/tb';

const categories: CategoryList = {
    'apartment': {
        label: 'Квартира',
        name: 'apartment',
        icon: MdOutlineApartment,
        description: 'Жилье в многоэтажном доме.',
    },
    'house': {
        label: 'Дом',
        name: 'house',
        icon: HiHomeModern,
        description: 'Отдельно стоящее жилье с собственной территорией.',
    },
    'recreation-center': {
        label: 'База отдыха',
        name: 'recreation-center',
        icon: MdHolidayVillage,
        description: 'Территория с развлечениями и услугами для отдыха.',
    },
    'beach': {
        label: 'Рядом с пляжем',
        name: 'beach',
        icon: FaUmbrellaBeach,
        description: 'Жилье на берегу водоёма.',
    },
    'skiing': {
        label: 'Горные лыжи',
        name: 'skiing',
        icon: FaSkiing,
        description: 'Жилье рядом с горнолыжной трассой.',
    },
    'guest-house': {
        label: 'Гостевой дом',
        name: 'guest-house',
        icon: BiBuildingHouse,
        description: 'Отдельно стоящее жилье с несколькими номерами для гостей.',
    },
    'hostel': {
        label: 'Хостел',
        name: 'hostel',
        icon: MdOutlineHotel,
        description: 'Бюджетное жилье с общими номерами и удобствами.',
    },
    'fishing': {
        label: 'Рыбалка',
        name: 'fishing',
        icon: IoFish,
        description: 'Жилье на берегу водоема, где можно заняться рыбной ловлей.',
    },
    'hunting': {
        label: 'Охота',
        name: 'hunting',
        icon: FiTarget,
        description: 'Жилье для охоты в лесах и горах.',
    },
    'nature': {
        label: 'Природа',
        name: 'nature',
        icon: MdOutlineForest,
        description: 'Жилье в окружении природы.',
    },
    'garage': {
        label: 'Гараж',
        name: 'garage',
        icon: MdOutlineGarage,
        description: 'Отдельное помещение для хранения автомобиля.',
    },
    'garden': {
        label: 'Огород',
        name: 'garden',
        icon: TbShovel,
        description: 'Участок земли для выращивания овощей и фруктов.',
    },
};

export default categories;