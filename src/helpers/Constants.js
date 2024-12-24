import { Dimensions, Platform } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

export const PRIVACY_URL = 'https://www.notension.com.bd/privacy'
export const STORAGE_URL = 'https://we-care-base.sgp1.cdn.digitaloceanspaces.com';
export const ACCESS_KEY = 'ba8dd74c-5844-4d83-8523b4a5f50d-a128-4190';
export const GOOGLE_PLACES_API_KEY = 'AIzaSyAdznG_wpszIuufRum1dmkkucPAZtiL2V8';
export const logoColor_1 = '#F68F1E';
export const logoColor_2 = '#003B95';
export const BackgroundColor_1 = '#FFFFFF';
export const grocery_sliderTypeSubtypeImagesFolderName = 'grocery-slider-type-subtype-images';
export const grocery_itemsImages = 'grocery-items-images';
export const medicine_sliderTypeSubtypeImagesFolderName = 'medicine-slider-type-subtype-images';
export const medicine_itemsImages = 'medicine-items-images';
export const food_sliderTypeSubtypeImagesFolderName = 'food-slider-type-subtype-images';
export const food_itemsImages = 'food-items-images';
export const health_careImages = 'medical-service-provider-images';
export const service_bannerImages = 'service_banner';
export const service_providerImages = 'service_provider';
export const service_profileImages = 'service_profile';

export const GET_DASHBOARD_INFO = '/public-api/v1/admin/all-appdashboard-data';
export const GET_DISTRICT_INFO = '/public-api/v1/admin/all-district';
export const GET_DISTRICT_AREA_INFO = '/public-api/v1/admin/all-districtarea/:id';
export const GET_DISTRICT_SUB_AREA_INFO = '/public-api/v1/admin/all-districtsubarea';
export const GET_TUTORIAL_INFO = '/public-api/v1/admin/tutorial-info';
export const REQUEST_TO_ADD = '/public-api/v1/admin/requested-store/create';
export const GET_BANKING_OUTLET = '/public-api/v1/admin/nearest-banking-outlet';

export const OTP_FOR_REGISTARTION = '/api/v1/customer/send-otp';
export const USER_REGISTARTION = '/api/v1/customer/register';
export const FAVORITE_STORE_ADD = '/api/v1/customer/add-favourite-store';
export const FAVORITE_STORE_PUSH = '/api/v1/customer/push-store';
export const FAVORITE_STORE_REMOVE = '/api/v1/customer/remove-store';
export const FAVORITE_STORE_INFO = '/api/v1/customer/get-favourite-store-info';
export const FAVORITE_PRODUCT_ADD = '/api/v1/customer/add-favourite-item';
export const FAVORITE_PRODUCT_PUSH = '/api/v1/customer/push-item';
export const FAVORITE_PRODUCT_REMOVE = '/api/v1/customer/remove-item';
export const FAVORITE_PRODUCT_INFO = '/api/v1/customer/get-favourite-item-info';

export const ADD_TO_FAVOURITE = '/api/v1/customer/add-to-favourite-list';
export const PUSH_TO_FAVOURITE = '/api/v1/customer/push-to-favourite-list';
export const REMOVE_FROM_FAVOURITE = '/api/v1/customer/remove-from-favourite-list';
export const FAVORITE_INFO = '/api/v1/customer/get-favourite-list';

export const NEAREST_GROCERY_STORE = '/client-app-api/v1/grocery/get-nearest-store';
export const SEARCH_GROCERY_STORE = '/client-app-api/v1/grocery/find-store';
export const EXPLORE_GROCERY_STORE = '/client-app-api/v1/grocery/explore-store';
export const SEARCH_GROCERY_ITEMS = '/client-app-api/v1/grocery/search-items';
export const GROCERY_ITEMS_BY_SUBTYPE = '/client-app-api/v1/grocery/items-by-subtype';
export const GROCERY_ITEMS_BY_CUSTOMTYPE = '/client-app-api/v1/grocery/items-by-customType';
export const GROCERY_ITEM_DETAILS = '/client-app-api/v1/grocery/item-details';
export const GROCERY_PLACE_ORDER = '/client-app-api/v1/grocery/order';
export const GROCERY_ORDER_INFO = '/client-app-api/v1/grocery/order-info';

export const POST_NEAREST_MEDICINE_STORE = '/api/v1/medicine/public/nearest-store';
export const NEAREST_MEDICINE_STORE = '/client-app-api/v1/medicine/get-nearest-store';
export const SEARCH_MEDICINE_STORE = '/client-app-api/v1/medicine/find-store';
export const EXPLORE_MEDICINE_STORE = '/client-app-api/v1/medicine/explore-store';
export const SEARCH_MEDICINE_ITEMS = '/client-app-api/v1/medicine/search-items';
export const MEDICINE_ITEMS_BY_SUBTYPE = '/client-app-api/v1/medicine/items-by-subtype';
export const MEDICINE_ITEMS_BY_CUSTOMTYPE = '/client-app-api/v1/medicine/items-by-customType';
export const MEDICINE_ITEM_DETAILS = '/client-app-api/v1/medicine/item-details';
export const MEDICINE_PLACE_ORDER = '/client-app-api/v1/medicine/order';
export const MEDICINE_ORDER_INFO = '/client-app-api/v1/medicine/order-info';

export const EXPLORE_FOOD_MODULE = '/client-app-api/v1/food/explore-module';
export const NEAREST_FOOD_STORE = '/client-app-api/v1/food/get-nearest-store';
export const SEARCH_FOOD_STORE = '/client-app-api/v1/food/find-store';
export const EXPLORE_FOOD_STORE = '/client-app-api/v1/food/explore-store';
export const FOOD_PLACE_ORDER = '/client-app-api/v1/food/order';
export const FOOD_ORDER_INFO = '/client-app-api/v1/food/order-info';

export const EXPLORE_FIND_DOCTOR = '/client-app-api/v1/health-care/explore-find-doctors';
export const FIND_NEAREST_DOCTOR = '/client-app-api/v1/health-care/get-nearest-doctors';
export const FIND_DOCTOR_BY_DEPT = '/client-app-api/v1/health-care/get-doctors-by-dept';
export const NEAREST_CONSULTATION_CENTER = '/client-app-api/v1/health-care/get-nearest-consultation-certer';
export const SEARCH_CONSULTATION_CENTER = '/client-app-api/v1/health-care/search-consultation-certer';
export const CONSULTATION_CENTER_BY_DISTRICT = '/client-app-api/v1/health-care/get-consultation-certer';
export const EXPLORE_CONSULTATION_CENTER = '/client-app-api/v1/health-care/explore-consultation-certer';
export const FIND_DOCTOR_BY_CONSULTATION_CENTER = '/client-app-api/v1/health-care/get-doctors-by-center';
export const GET_DOCTOR_PROFILE = '/client-app-api/v1/health-care/get-doctor-profile';

export const GET_PATIENTS = '/client-app-api/v1/health-care/get-patients-info';
export const REGISTER_PATIENT = '/client-app-api/v1/health-care/register-patient';
export const MANAGE_PATIENT = '/client-app-api/v1/health-care/manage-patient';
export const BOOK_APPOINTMENT = '/client-app-api/v1/health-care/book-appointment';

export const EXPLORE_MEDICAL_SERVICE_PROVIDER = '/client-app-api/v1/health-care/explore-medical-service-provider';
export const FIND_MEDICAL_SERVICE_PROVIDER = '/client-app-api/v1/health-care/get-medical-service-provider';
export const FIND_AMBULANCE_SERVICE_PROVIDER = '/client-app-api/v1/health-care/get-ambulance-service-provider';

export const EXPLORE_ALL_CARE_SERVICE = '/client-app-api/v1/all-care/explore-all-service';
export const EXPLORE_CARE_PROVIDER = '/client-app-api/v1/all-care/explore-care-provider';

export const MyFavouriteData = [
    { id: '1', image: require('../assets/gallery/favorite-1.jpg') },
    { id: '2', image: require('../assets/gallery/favorite-2.jpg') },
    { id: '3', image: require('../assets/gallery/favorite-3.jpg') },
    { id: '4', image: require('../assets/gallery/favorite-4.jpg') },
];

export const RegBannerData = [
    { id: '1', image: require('../assets/banner/grocery-store.jpg') },
    { id: '2', image: require('../assets/banner/medicine-store.jpg') },
    { id: '3', image: require('../assets/banner/food-shop.jpg') },
    { id: '4', image: require('../assets/banner/consultation-center.jpg') },
    { id: '5', image: require('../assets/banner/ambulance-service.jpg') },
    { id: '6', image: require('../assets/banner/medical-service-provider.jpg') },
    { id: '7', image: require('../assets/banner/banking-service.jpg') },
    { id: '8', image: require('../assets/banner/all-care-service.jpg') },
    { id: '9', image: require('../assets/banner/contact-us.jpg') },
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

export const CONTENT_SPACING = 15

const SAFE_BOTTOM =
    Platform.select({
        ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
    }) ?? 0

export const SAFE_AREA_PADDING = {
    paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
    paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
    paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
    paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
}

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 10;

export const SCREEN_WIDTH = Dimensions.get('window').width;

// export const SCREEN_HEIGHT = Platform.select < number > ({
//     android: Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom,
//     ios: Dimensions.get('window').height,
// }) as number;

export const SCREEN_HEIGHT = Platform.select({
    android: Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom,
    ios: Dimensions.get('window').height,
});

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;

// Control Button like Flash;
export const CONTROL_BUTTON_SIZE = 40;