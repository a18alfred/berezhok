import { z } from 'zod';

export enum STEPS {
    CATEGORY = 0,
    ADDRESS = 1,
    MAP = 2,
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    PRICE = 6,
    RESULT = 7,
}

export const listingSchema = z
    .object({
        category: z.string({
            required_error: 'Вы должны выбрать категорию',
        }).min(1),
        title: z.string().min(1, 'Введите название').max(100),
        description: z.string().min(1, 'Введите описание').max(1000),
        guestCount: z.number({
            required_error: 'Введите вместимость',
            invalid_type_error: 'Параметр должен быть числом',
        }).nonnegative('Число должно быть больше или равно 0'),
        roomCount: z.number({
            required_error: 'Введите количество комнат',
            invalid_type_error: 'Параметр должен быть числом',
        }).nonnegative('Число должно быть больше или равно 0'),
        bathroomCount: z.number({
            required_error: 'Введите количество ванных комнат',
            invalid_type_error: 'Параметр должен быть числом',
        }).nonnegative('Число должно быть больше или равно 0'),
        price: z.number({
            required_error: 'Введите цену',
            invalid_type_error: 'Введите цену',
        }).positive('Число должно быть больше 0'),
        wifi: z.boolean(),
        airConditioner: z.boolean(),
    });

export type ListingType = z.infer<typeof listingSchema>;