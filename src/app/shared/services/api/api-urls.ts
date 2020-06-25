import { environment } from 'src/environments/environment';

/** Base Urls for Api Backend */
export const API_BASE_URL = `${environment.API_ORIGIN}/api`;
export const GET_PRODUCTS_URL = `${API_BASE_URL}/products`;
export const GET_CONFIG_URL = `${API_BASE_URL}/config`;
export const GET_IMAGE_UPLOAD_CONFIG = `${GET_CONFIG_URL}/image-upload`;
export const CATEGORY_BASE_URL = `${API_BASE_URL}/categories`;
export const PAYMENT_BASE_URL = `${API_BASE_URL}/payment/create-payment-intent`;

/** Base Urls for external requests */
export const UPLOAD_IMAGE_BASE_URL = `https://api.cloudinary.com/v1_1`;
