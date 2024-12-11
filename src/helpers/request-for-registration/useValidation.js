const useValidation = () => {

    function validateRetailInformation(information, setErrors) {
        let isInputValid = true;
        let errors = [];

        if (information?.shop_name.length < 3 || information?.shop_name.length > 120) {
            isInputValid = false
            errors.shop_name = 'Shop Name must be at least 3 characters long and at most 120 characters long.';
        }

        if (information?.shop_address.length < 3 || information?.shop_address.length > 120) {
            isInputValid = false
            errors.shop_address = 'Address must be at least 3 characters long and at most 300 characters long.';
        }

        if (information?.shop_latitude.length < 1) {
            isInputValid = false
            errors.shop_latitude = 'Latitude  is required!';
        }

        if (information?.shop_longitude.length < 1) {
            isInputValid = false
            errors.shop_longitude = 'Longitude  is required!';
        }

        if (information?.contact_person.length < 3 || information?.contact_person.length > 100) {
            isInputValid = false
            errors.contact_person = 'Contact  Person name must be at least 3 characters long and at most 100 characters long.';
        }

        if (information?.contact_no.length !== 11 && information?.contact_no.length !== 16) {
            isInputValid = false
            errors.contact_no = 'Contact No. must be 11 digits long!';
        }

        if (information?.alternative_contact_no.length !== 11) {
            isInputValid = false
            errors.alternative_contact_no = 'Alterrnative Contact must be 11 digits long!!';
        }

        if (information?.shop_pic.length < 2 || information?.shop_pic.length > 4) {
            isInputValid = false
            errors.shop_pic = 'At least 2 image required and not more than 4';
        }

        if (information?.ref_contact.length !== 11 && information?.ref_contact.length !== 16) {
            isInputValid = false
            errors.ref_contact = 'Ref Contact No. must be 11 digits long!';
        }

        setErrors(errors);
        return isInputValid

    }

    function validateConsultationCenterInfo(information, setErrors) {
        let isInputValid = true;
        let errors = [];

        if (information?.center_name.length < 3 || information?.center_name.length > 120) {
            isInputValid = false
            errors.center_name = 'Center must be at least 3 characters long and at most 120 characters long.';
        }

        if (information?.center_address.length < 3 || information?.center_address.length > 120) {
            isInputValid = false
            errors.center_address = 'Address must be at least 3 characters long and at most 300 characters long.';
        }

        if (information?.shop_latitude.length < 1) {
            isInputValid = false
            errors.shop_latitude = 'Latitude  is required!';
        }

        if (information?.shop_longitude.length < 1) {
            isInputValid = false
            errors.shop_longitude = 'Longitude  is required!';
        }

        if (information?.contact_person.length < 3 || information?.contact_person.length > 100) {
            isInputValid = false
            errors.contact_person = 'Contact  Person name must be at least 3 characters long and at most 100 characters long.';
        }

        if (information?.contact_no.length !== 11 && information?.contact_no.length !== 16) {
            isInputValid = false
            errors.contact_no = 'Contact No. must be 11 digits long!';
        }

        if (information?.alternative_contact_no.length !== 11) {
            isInputValid = false
            errors.alternative_contact_no = 'Alterrnative Contact must be 11 digits long!!';
        }

        if (information?.shop_pic.length < 2 || information?.shop_pic.length > 4) {
            isInputValid = false
            errors.shop_pic = 'At least 2 image required and not more than 4';
        }

        if (information?.ref_contact.length !== 11 && information?.ref_contact.length !== 16) {
            isInputValid = false
            errors.ref_contact = 'Ref Contact No. must be 11 digits long!';
        }

        setErrors(errors);
        return isInputValid

    }

    function validateServiceProviderInfo(information, setErrors) {
        let isInputValid = true;
        let errors = [];

        if (information?.provider_name.length < 3 || information?.provider_name.length > 120) {
            isInputValid = false
            errors.provider_name = 'Name must be at least 3 characters long and at most 120 characters long.';
        }

        if (information?.provider_address.length < 3 || information?.provider_address.length > 120) {
            isInputValid = false
            errors.provider_address = 'Address must be at least 3 characters long and at most 300 characters long.';
        }

        if (information?.shop_latitude.length < 1) {
            isInputValid = false
            errors.shop_latitude = 'Latitude  is required!';
        }

        if (information?.shop_longitude.length < 1) {
            isInputValid = false
            errors.shop_longitude = 'Longitude  is required!';
        }

        if (information?.contact_person.length < 3 || information?.contact_person.length > 100) {
            isInputValid = false
            errors.contact_person = 'Contact  Person name must be at least 3 characters long and at most 100 characters long.';
        }

        if (information?.contact_no.length !== 11 && information?.contact_no.length !== 16) {
            isInputValid = false
            errors.contact_no = 'Contact No. must be 11 digits long!';
        }

        if (information?.alternative_contact_no.length !== 11) {
            isInputValid = false
            errors.alternative_contact_no = 'Alterrnative Contact must be 11 digits long!!';
        }

        if (information?.shop_pic.length < 2 || information?.shop_pic.length > 4) {
            isInputValid = false
            errors.shop_pic = 'At least 2 image required and not more than 4';
        }

        if (information?.ref_contact.length !== 11 && information?.ref_contact.length !== 16) {
            isInputValid = false
            errors.ref_contact = 'Ref Contact No. must be 11 digits long!';
        }

        setErrors(errors);
        return isInputValid

    }

    function validatePriceInformation(productPrice, setErrorsServer) {
        let isInputValid = true;
        let errors = [];

        if (isNaN(productPrice?.purchase_price) || productPrice?.purchase_price < 0) {
            isInputValid = false
            errors.purchase_price = 'Purchase Price Must be positive Number.';
        }

        if (isNaN(productPrice?.max_retail_price) || productPrice?.max_retail_price < 0) {
            isInputValid = false
            errors.max_retail_price = 'MRP Must be positive Number.';
        }

        if (isNaN(productPrice?.less) || productPrice?.less < 0) {
            isInputValid = false
            errors.less = 'Less Must be positive Number.';
        }

        // if (isNaN(productPrice?.less_amount) || productPrice?.less_amount < 0) {
        //     isInputValid = false
        //     errors.less_amount = 'Less Amount Must be positive Number.';
        // }

        if (isNaN(productPrice?.sale_price) || productPrice?.sale_price < 0) {
            isInputValid = false
            errors.sale_price = 'Sale Price Must be positive Number.';
        }

        if (isNaN(productPrice?.max_allowed) || productPrice?.max_allowed < 0) {
            isInputValid = false
            errors.max_allowed = 'Max Allowed Must be positive Number.';
        }

        setErrorsServer(errors);
        return isInputValid
    }

    function validateStoreData(chargeAndLess, setErrorsServer) {
        let isInputValid = true;
        let errors = [];

        if (isInvalid(chargeAndLess?.max_delivery_charge)) {
            isInputValid = false
            errors.max_delivery_charge = 'Max delivery charge must be positive number.';
        }

        if (isInvalid(chargeAndLess?.min_purchage_amount)) {
            isInputValid = false
            errors.min_purchage_amount = 'Min Order amount must be positive number.';
        }

        if (isInvalid(chargeAndLess?.min_delivery_charge)) {
            isInputValid = false
            errors.min_delivery_charge = 'Min delivery charge must be positive number.';
        }

        if (parseFloat(chargeAndLess?.min_delivery_charge) > parseFloat(chargeAndLess?.max_delivery_charge)) {
            isInputValid = false
            errors.min_delivery_charge = 'Min delivery charge be less or equal to Max delivery charge.';
        }

        if (isInvalid(chargeAndLess?.less)) {
            isInputValid = false
            errors.less = 'Less Must must be positive Number.';
        }

        if (isInvalid(chargeAndLess?.minimum_order_for_less)) {
            isInputValid = false
            errors.minimum_order_for_less = 'Min Order Amount for less must be positive number.';
        }

        if (isInvalid(chargeAndLess?.maximum_less)) {
            isInputValid = false
            errors.maximum_less = 'Max less must be positive number.';
        }

        if (isInvalid(chargeAndLess?.minimum_order_amount)) {
            isInputValid = false
            errors.minimum_order_amount = 'Min Order amount must be positive number.';
        }

        let ShopNotice = chargeAndLess?.shop_notice;

        if (ShopNotice.length > 500 || ShopNotice.length < 10) {
            isInputValid = false
            errors.shop_notice = 'Notice minimum 10 characters long, at most 500 characters long!';
        }

        setErrorsServer(errors);
        return isInputValid
    }

    function isInvalid(val) {
        return (isNaN(val) || parseFloat(val) < 0 || val === undefined || val == null || val.length <= 0) ? true : false;
    }

    function validateNotification(shopMessage, setErrorsServer) {
        let isInputValid = true;
        let errors = [];

        let ShopNotice = shopMessage?.popup_message || '';

        if (ShopNotice?.length > 500 || ShopNotice?.length < 10) {
            isInputValid = false
            errors.popup_message = 'Notification minimum 10 characters long, at most 500 characters long!';
        }

        setErrorsServer(errors);
        return isInputValid
    }

    function validateRequestToAddItem(information, setErrors) {
        let isInputValid = true;
        let errors = [];

        if (parseFloat(information?.product_title.length) < 3 || parseFloat(information?.product_title.length) > 180) {
            isInputValid = false
            errors.product_title = 'Shop Name must be at least 3 characters long and at most 180 characters long.';
        }

        if (parseFloat(information?.product_description.length) > 500 && information?.product_description !== '') {
            isInputValid = false
            errors.product_description = 'Description at most 500 characters long!';
        }

        if (information?.detail_product_image.length < 1 || information?.detail_product_image.length > 4) {
            isInputValid = false
            errors.detail_product_image = 'At least 1 image required and not more than 4';
        }

        setErrors(errors);
        return isInputValid
    }

    function validateUserInformation(information, setErrors) {
        let isInputValid = true;
        let errors = [];

        if (parseFloat(information?.customer_name.length) > 99 || information?.customer_name === '') {
            isInputValid = false
            errors.customer_name = 'Name must be at least 3 characters long and at most 99 characters long!';
        }

        if (parseFloat(information?.customer_address.length) > 500 || information?.customer_address === '') {
            isInputValid = false
            errors.customer_address = 'Address must be at least 3 characters long and at most 499 characters long!';
        }

        if (information?.alternative_contact_no !== '') {
            if (parseFloat(information?.alternative_contact_no.length) > 11 || parseFloat(information?.alternative_contact_no.length) < 11) {
                isInputValid = false
                errors.alternative_contact_no = 'Alternative Contact must be 11 digit!';
            }
        }
        setErrors(errors);
        return isInputValid;
    }

    function validateCareProviderInfo(information, setErrors) {
        let isInputValid = true;
        let errors = [];

        if (information?.provider_name.length < 3 || information?.provider_name.length > 120) {
            isInputValid = false
            errors.provider_name = 'নাম কমপক্ষে 3টি অক্ষর এবং সর্বাধিক 120টি অক্ষর দীর্ঘ হবে ৷';
        }

        if (information?.address.length < 3 || information?.address.length > 120) {
            isInputValid = false
            errors.address = 'ঠিকানা কমপক্ষে 3 অক্ষর এবং সর্বাধিক 300 অক্ষর দীর্ঘ হবে';
        }

        if (information?.shop_latitude.length < 1) {
            isInputValid = false
            errors.shop_latitude = 'Latitude  is required!';
        }

        if (information?.shop_longitude.length < 1) {
            isInputValid = false
            errors.shop_longitude = 'Longitude  is required!';
        }

        if (information?.contact_person.length < 3 || information?.contact_person.length > 100) {
            isInputValid = false
            errors.contact_person = 'যোগাযোগের ব্যক্তির নাম কমপক্ষে 3 অক্ষর এবং সর্বাধিক 100 অক্ষর দীর্ঘ হবে।';
        }

        if (information?.service_details.length < 3 || information?.service_details.length > 100) {
            isInputValid = false
            errors.service_details = 'পরিষেবার(Service) বিবরণ কমপক্ষে 3 অক্ষর এবং সর্বাধিক 300 অক্ষর দীর্ঘ হবে।';
        }

        if (information?.contact_no.length !== 11 && information?.contact_no.length !== 16) {
            isInputValid = false
            errors.contact_no = 'মোবাইল নম্বর 11 সংখ্যার হতে হবে!';
        }

        if (information?.alternative_contact_no.length !== 11) {
            isInputValid = false
            errors.alternative_contact_no = 'বিকল্প মোবাইল নম্বর 11 সংখ্যার হতে হবে!!';
        }

        if (information?.shop_pic.length < 2 || information?.shop_pic.length > 4) {
            isInputValid = false
            errors.shop_pic = 'কমপক্ষে 2টি ছবি প্রয়োজন এবং 4টির বেশি নয়৷';
        }

        if (information?.ref_contact.length !== 11 && information?.ref_contact.length !== 16) {
            isInputValid = false
            errors.ref_contact = 'Ref Contact No. must be 11 digits long!';
        }

        setErrors(errors);
        return isInputValid
    }

    return {
        validatePriceInformation,
        validateRetailInformation,
        validateConsultationCenterInfo,
        validateServiceProviderInfo,
        validateStoreData,
        validateRequestToAddItem,
        validateNotification,
        validateUserInformation,
        validateCareProviderInfo
    };
};

export default useValidation;