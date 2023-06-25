import LoadingSkeletons from '@/app/components/LoadingSkeletons/LoadingSkeletons';

const Loading = () => {
    return (
        <div className='listings-list-wrapper listings-list-wrapper--secondary'>
            <LoadingSkeletons />
        </div>
    );
};

export default Loading;