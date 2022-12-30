/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */

import { translate } from '~app/core/i18n/i18n';
import { ErrorTranscription, ErrorType, ValidatorFactory, ValidatorFn } from '../types';

export const defaultMessages: ErrorTranscription = {
  // required: i18n.t('Field is required'),
  // minLength: i18n.t('The input is less than {requiredLength} characters long'),
  // matchWith: i18n.t('The value must match with "{name}" field value'),
  // email: i18n.t('The value is not a valid email address'),
  // min: i18n.t('The value must be greater than or equal {min}'),
  // max: i18n.t('The value must be less than or equal {max}'),
  // ipAddress: i18n.t('The value is not a valid IP address'),
  // bsDate: i18n.t('Invalid date'),
  // NOT_UNIQUE: i18n.t('Value must be unique'),

  required: () => ({
    fieldMessage: translate('fieldValidators.required'),
    toastMessage: translate('toastValidators.required')
  }),
  minLength: (requiredLength?: string) => ({
    fieldMessage: translate('fieldValidators.minLength', { requiredLength }),
    toastMessage: translate('toastValidators.minLength', { requiredLength })
  }),
  minLengthOfSentence: (requiredLength?: string) => ({
    fieldMessage: translate('fieldValidators.minLengthOfSentence', { requiredLength }),
    toastMessage: translate('toastValidators.minLengthOfSentence', { requiredLength })
  }),
  minLengthOfSentenceExample: (requiredLength?: string) => ({
    fieldMessage: ``,
    toastMessage: `Fill up minimum ${requiredLength} sentences example per sentence`
  }),
  matchWith: (name?: string) => ({
    fieldMessage: translate('fieldValidators.matchWith', { name }),
    toastMessage: translate('toastValidators.matchWith', { name })
  }),
  minNumberOfSentences: (min?: string) => ({
    fieldMessage: '',
    toastMessage: translate('toastValidators.minNumberOfSentences', { min })
  }),
  minNumberOfCategories: (min?: string) => ({
    fieldMessage: '',
    toastMessage: translate('toastValidators.minNumberOfCategories', { min })
  }),
  maxNumberOfCategories: (max?: string) => ({
    fieldMessage: '',
    toastMessage: translate('toastValidators.maxNumberOfCategories', { max })
  }),
  minNumberOfLessons: (min?: string) => ({
    fieldMessage: '',
    toastMessage: translate('toastValidators.maxNumberOfCategories', { min })
  }),
  maxNumberOfLessons: (max?: string) => ({
    fieldMessage: '',
    toastMessage: translate('toastValidators.maxNumberOfCategories', { max })
  }),
  email: () => ({
    fieldMessage: translate('fieldValidators.email'),
    toastMessage: translate('toastValidators.email')
  }),
  // min: 'The value must be greater than or equal {min}',
  // max: 'The value must be less than or equal {max}',
  // minElementsInArray: 'Number of example of each sentence must be grater than {minimum}',
  // maxElementsInArray: 'Number of example of each sentence must be less than or equal {max}',
  // ipAddress: 'The value is not a valid IP address',
  // bsDate: 'Invalid date',
  // NOT_UNIQUE: 'Value must be unique',
  includeCourseWord: () => ({
    fieldMessage: '`The input must include "course" word',
    toastMessage: 'Fill up fields with some special words'
  }),
  includeCategoryWord: () => ({
    fieldMessage: 'Value must include "category" word',
    toastMessage: 'Fill up fields with some special words'
  })
};

const isEmpty = (value: any): boolean => value == null || value.length === 0;

export const required: ValidatorFn = (value: any) => (isEmpty(value) ? { type: 'required', arg: '' } : null);

export const includeCourseWord: ValidatorFn = (value: string) => {
  const pattern = /course/i;
  return value.match(pattern) ? null : { type: 'includeCategoryWord', arg: '' };
};

export const includeCategoryWord: ValidatorFn = (value: string) => {
  const pattern = /category/i;
  return value.match(pattern) ? null : { type: 'includeCategoryWord', arg: '' };
};

// export const requiredIf: ValidatorFactory = (condition: (data: any) => boolean) => (value: any, data: any) =>
//   condition(data) ? required(value) : null;

export const matchWith: ValidatorFactory<string> =
  (name: string, type = 'matchWith') =>
  (value: any, data: any) => {
    if (isEmpty(value)) {
      return null;
    }

    return data[name] === value ? null : { type, arg: name };
  };

// https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEXP =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const email: ValidatorFn = (value: string) => {
  if (isEmpty(value)) {
    return null;
  }
  return EMAIL_REGEXP.test(value) ? null : { type: 'email', arg: '' };
};

export const min: ValidatorFactory<number> = (minNumber: number, type: ErrorType) => (value: any) => {
  if (isEmpty(value)) {
    return null;
  }
  const number = parseFloat(value);
  return !Number.isNaN(Number(number)) && number < minNumber ? { type, arg: min.toString() } : null;
};

export const max: ValidatorFactory<number> = (maxNumber: number, type: ErrorType) => (value: any) => {
  if (isEmpty(value)) {
    return null;
  }

  const number = parseFloat(value);
  return !Number.isNaN(Number(number)) && value > maxNumber ? { type, arg: max.toString() } : null;
};

export const minLength: ValidatorFactory<number> = (minNumber: number, type: ErrorType) => (value: string) => {
  const number = value.length;
  return !Number.isNaN(Number(number)) && number < minNumber ? { type, arg: min.toString() } : null;
};

// TODO equal
// TODO minLength
// TODO maxLength
// TODO pattern
