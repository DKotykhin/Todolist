import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const registerschema = yup.object({
    name: yup.string()
        .matches(/^([^0-9]*)$/, 'Введите буквы!')
        .min(2, 'Минимум 2 символа для заполнения')
        .required('Обязательное поле!'),
    email: yup
        .string()
        .email('Неправильный email адрес')
        .required('Обязательное поле!'),
    password: yup
        .string()
        .required('Обязательное поле!')
        .min(8, 'Минимум 8 символов для заполнения')
});

const loginschema = yup.object({
    email: yup
        .string()
        .email('Неправильный email адрес')
        .required('Обязательное поле!'),
    password: yup
        .string()
        .required('Обязательное поле!')
        .min(8, 'Минимум 8 символов для заполнения')
});

const passwordschema = yup.object({
    password: yup
        .string()
        .required('Обязательное поле!')
        .min(8, 'Минимум 8 символов для заполнения'),
    confirmpassword: yup
        .string()
        .required('Обязательное поле!')
        .min(8, 'Минимум 8 символов для заполнения')
});

const addtaskschema = yup.object({
    title: yup.string()
        .min(2, 'Минимум 2 символа для заполнения')
        .required('Обязательное поле!'),
});

export const RegisterFormValidation = {
    defaultValues: {
        name: '',
        password: '',
        email: '',
    },
    resolver: yupResolver(registerschema),
    mode: 'onBlur'
}

export const LoginFormValidation = {
    defaultValues: {
        password: '',
        email: '',
    },
    resolver: yupResolver(loginschema),
    mode: 'onBlur'
}

export const PasswordFormValidation = {
    defaultValues: {
        password: '',
        confirmpassword: ''
    },
    resolver: yupResolver(passwordschema),
    mode: 'onBlur'
}

export const AddTaskFormValidation = {
    defaultValues: {
        title: ''
    },
    resolver: yupResolver(addtaskschema),
    mode: 'onBlur'
}