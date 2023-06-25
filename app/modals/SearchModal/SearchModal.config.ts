import { z } from 'zod';

export enum STEPS {
    CATEGORY = 0,
    ADDRESS = 1,
    DATE = 2,
    INFO = 3,
    PRICE = 4,
}

export const searchSchema = z
    .object({
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
        price_min: z.number({
            required_error: 'Введите число от 0',
            invalid_type_error: 'Введите число от 0',
        }).nonnegative('Число должно быть больше или равно 0'),
        price_max: z.number({
            required_error: 'Введите число от 0',
            invalid_type_error: 'Введите цену',
        }).nonnegative('Число должно быть больше или равно 0'),
        wifi: z.boolean(),
        airConditioner: z.boolean(),
    });

export type SearchType = z.infer<typeof searchSchema>;
