import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const profileschema = yup.object({
    name: yup.string()
        .matches(/^([^0-9]*)$/, 'Введите буквы!')
        .min(2, 'Минимум 2 символа для заполнения')
        .required('Обязательное поле!'),
    age: yup
        .number()
        .typeError('Введите цифры!')
        .integer('Введите целые числа!')
        .min(12, 'Слишком молод!')
        .max(99, 'Слишком стар!')
        // .positive('Введите положительные числа!')
});

export const ProfileFormValidation = {
    defaultValues: {
        name: '',
        age: '',
    },
    resolver: yupResolver(profileschema),
    mode: 'onBlur'
}