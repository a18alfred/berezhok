export const SHARED_META = {
    title: 'Бережок - Аренда домов и квартир',
    metadataBase: new URL('https://testtest.com'),
    description: 'Найдите лучшее жилье для отдыха или повседневной жизни на сайте Бережок.',
    icons: {
        icon: '/assets/images/favicon.ico',
        shortcut: '/assets/images/logo256.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/assets/images/logo192.png',
        },
        apple: [
            {url: '/assets/images/logo192.png', sizes: '192x192', type: 'image/png'},
            {url: '/assets/images/logo512.png', sizes: '512x512', type: 'image/png'},
        ],
    },
    openGraph: {
        title: 'Бережок',
        description: 'Найдите лучшее жилье для отдыха или повседневной жизни на сайте Бережок. Мы предлагаем широкий выбор объявлений об аренде жилья в разных регионах. С легкостью добавляйте свои объявления и сдавайте свое жилье в аренду. Планируйте свой следующий отпуск или командировку на Бережок!',
        type: 'website',
        images: [
            {
                url: '/assets/images/social_media_card.webp',
                width: 2000,
                height: 1000
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/assets/images/social_media_card.webp'],
        title: 'Бережок',
        description: 'Найдите лучшее жилье для отдыха или повседневной жизни на сайте Бережок. Мы предлагаем широкий выбор объявлений об аренде жилья в разных регионах. С легкостью добавляйте свои объявления и сдавайте свое жилье в аренду. Планируйте свой следующий отпуск или командировку на Бережок!',
    }
}