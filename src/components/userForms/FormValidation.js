import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const registerschema = yup.object({
    name: yup.string()
        .matches(/^([^0-9]*)$/, 'Enter letters!')
        .min(2, 'Minimum 2 characters to fill')
        .required('Required field!'),
    email: yup
        .string()
        .email('Wrong email address')
        .required('Required field!'),
    password: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill')
});

const loginschema = yup.object({
    email: yup
        .string()
        .email('Wrong email address')
        .required('Required field!'),
    password: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill')
});

const passwordschema = yup.object({
    password: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill'),
    confirmpassword: yup
        .string()
        .required('Required field!')
        .min(8, 'Minimum 8 characters to fill')
});

const addtaskschema = yup.object({
    title: yup.string()
        .min(2, 'Minimum 2 characters to fill')
        .required('Required field!'),
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