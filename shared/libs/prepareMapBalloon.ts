import { GetListingsMapInfoResult } from '@/app/requests/listing';
import categories from '@/shared/constants/categories';

const prepareMapBalloon = async (data: GetListingsMapInfoResult) => {
    const imagePromise = new Promise<string>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(data.imageSrc);
        image.src = data.imageSrc;
    });

    const imageSrc = await imagePromise;

    return `<div class='mapBalloonWrapper'>
                    <div class='mapBalloonImageWrapper'>
                        <img class='mapBalloonImage' src='${imageSrc}' alt='Фото'>
                    </div>
                    <p class='mapBalloonPrice'>${data.price} ₽ ночь</p>
                    <p class='mapBalloonCategory'>${categories[data.category].label}</p>
                    <a class='mapBalloonLink' href='/listing/${data.id}' target='_blank'>Подробнее</a>
                </div>`;
};

export default prepareMapBalloon;