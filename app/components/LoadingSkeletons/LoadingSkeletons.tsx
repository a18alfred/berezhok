import ListingSkeleton from '@/app/components/Listing/ListingCard/ListingSkeleton';
import { LOADING_SKELETONS_COUNT } from '@/shared/constants/settings';

const LoadingSkeletons = () => {
    return (
        <>
            {Array.from({ length: LOADING_SKELETONS_COUNT }, (_, index) => (
                <ListingSkeleton key={index} />
            ))}
        </>
    );
};

export default LoadingSkeletons;
