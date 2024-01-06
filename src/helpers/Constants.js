export const STORAGE_URL = 'https://we-care-base.sgp1.cdn.digitaloceanspaces.com';
export const ACCESS_KEY = 'ba8dd74c-5844-4d83-8523b4a5f50d-a128-4190';
export const logoColor_1 = '#F68F1E';
export const logoColor_2 = '#003B95';
export const BackgroundColor_1 = '#FFFFFF';
export const grocery_sliderTypeSubtypeImagesFolderName = 'grocery-slider-type-subtype-images';
export const grocery_itemsImages = 'grocery-items-images';
export const medicine_sliderTypeSubtypeImagesFolderName = 'medicine-slider-type-subtype-images';
export const medicine_itemsImages = 'medicine-items-images';

export const GET_DASHBOARD_INFO = '/public-api/v1/admin/all-appdashboard-data';
export const GET_DISTRICT_INFO = '/public-api/v1/admin/all-district';
export const GET_DISTRICT_AREA_INFO = '/public-api/v1/admin/all-districtarea/:id';
export const GET_DISTRICT_SUB_AREA_INFO = '/public-api/v1/admin/all-districtsubarea/:id';

export const NEAREST_GROCERY_STORE = '/client-app-api/v1/grocery/get-nearest-store';
export const EXPLORE_GROCERY_STORE = '/client-app-api/v1/grocery/explore-store';
export const SEARCH_GROCERY_ITEMS = '/client-app-api/v1/grocery/search-items';
export const GROCERY_ITEMS_BY_SUBTYPE = '/client-app-api/v1/grocery/items-by-subtype';
export const GROCERY_ITEMS_BY_CUSTOMTYPE = '/client-app-api/v1/grocery/items-by-customType';
export const GROCERY_ITEM_DETAILS = '/client-app-api/v1/grocery/item-details';

export const POST_NEAREST_MEDICINE_STORE = '/api/v1/medicine/public/nearest-store';
export const NEAREST_MEDICINE_STORE = '/client-app-api/v1/medicine/get-nearest-store';
export const EXPLORE_MEDICINE_STORE = '/client-app-api/v1/medicine/explore-store';
export const SEARCH_MEDICINE_ITEMS = '/client-app-api/v1/medicine/search-items';
export const MEDICINE_ITEMS_BY_SUBTYPE = '/client-app-api/v1/medicine/items-by-subtype';
export const MEDICINE_ITEMS_BY_CUSTOMTYPE = '/client-app-api/v1/medicine/items-by-customType';
export const MEDICINE_ITEM_DETAILS = '/client-app-api/v1/medicine/item-details';

export const MyFavouriteData = [
    { id: '1', image: require('../assets/gallery/favorite-1.jpg') },
    { id: '2', image: require('../assets/gallery/favorite-2.jpg') },
    { id: '3', image: require('../assets/gallery/favorite-3.jpg') },
    { id: '4', image: require('../assets/gallery/favorite-4.jpg') },
];

export const AddSliderData = [
    { id: '1', image: require('../assets/gallery/add-slide/Add-Slide_1.jpg') },
    { id: '2', image: require('../assets/gallery/add-slide/Add-Slide_2.jpg') },
    { id: '3', image: require('../assets/gallery/add-slide/Add-Slide_3.jpg') },
    { id: '4', image: require('../assets/gallery/add-slide/Add-Slide_4.jpg') },
    { id: '5', image: require('../assets/gallery/add-slide/Add-Slide_5.jpg') },
    { id: '6', image: require('../assets/gallery/add-slide/Add-Slide_6.jpg') },
];

export const MedicalServicesData = [
    { id: '1', image: require('../assets/gallery/services/doctor.jpg') },
    { id: '2', image: require('../assets/gallery/services/nurse.jpg') },
    { id: '3', image: require('../assets/gallery/services/diagnostic-center.jpg') },
    { id: '4', image: require('../assets/gallery/services/hospital.jpg') },
];

export const FreeServicesData = [
    { id: '1', image: require('../assets/gallery/free-services/Banner_cooking.jpg') },
    { id: '2', image: require('../assets/gallery/free-services/Banner_Healthcare.jpg') },
    { id: '3', image: require('../assets/gallery/free-services/Banner_learning.jpg') },
    { id: '4', image: require('../assets/gallery/free-services/Banner_learning.jpg') },
];