import { environment } from 'src/environments/environment';

/** Base Urls for Api Backend */
export const API_BASE_URL = `${environment.API_ORIGIN}/api`;
export const GET_PRODUCTS_URL = `${API_BASE_URL}/products`;

/** Base Urls for external requests */
export const UPLOAD_IMAGE_URL = `https://api.cloudinary.com/v1_1/${environment.CLOUDINARY_CONFIG.USER}/image/upload`;
