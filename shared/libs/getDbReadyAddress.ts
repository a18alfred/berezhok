import { DaDataAddress } from 'react-dadata';

interface DbReadyAddress {
    address_county: string | undefined,
    address_region: string | undefined,
    address_area: string | undefined,
    address_city: string | undefined,
    address_city_district: string | undefined,
    address_settlement: string | undefined,
    address_street: string | undefined,
    address_house: string | undefined,
    address_block: string | undefined,
    address_flat: string | undefined,
}

const getDbReadyAddress = (address: DaDataAddress): DbReadyAddress => {
    return {
        address_county: address.country || undefined,
        address_region: address.region_with_type || undefined,
        address_area: address.area_with_type || undefined,
        address_city: address.city_with_type || undefined,
        address_city_district: address.city_district_with_type || undefined,
        address_settlement: address.settlement_with_type || undefined,
        address_street: address.street_with_type || undefined,
        address_house: address.house || undefined,
        address_block: address.block || undefined,
        address_flat: address.flat || undefined,
    };
};

export default getDbReadyAddress;