const useValidation = () => {

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
            if (parseFloat(information?.alternative_contact_no.length) !== 11) {
                isInputValid = false
                errors.alternative_contact_no = 'Alternative Contact must be 11 digit!';
            }
        }

        if (information?.ref_contact !== '') {
            if (parseFloat(information?.ref_contact.length) !== 11) {
                isInputValid = false
                errors.ref_contact = 'Ref. Contact must be 11 digit!';
            }
        }

        setErrors(errors);
        return isInputValid;

    }

    function validatePatientInformation(information, setErrors) {
        let isInputValid = true;
        let errors = [];

        if (parseFloat(information?.patient_name.length) > 99 || information?.patient_name === '') {
            isInputValid = false
            errors.patient_name = 'নাম কমপক্ষে ৩ অক্ষরের এবং সর্বাধিক ৯৯ অক্ষরের হতে পারে!';
        }

        if (parseFloat(information?.contact.length) !== 11 || information?.contact === '' || !information?.contact.startsWith('0')) {
            isInputValid = false
            errors.contact = 'মোবাইল নম্বরটি অবশ্যই সঠিক ১১টি ডিজিট হতে হবে!';
        }

        if (information?.alternative_contact !== '') {
            if (parseFloat(information?.alternative_contact.length) !== 11 || !information?.alternative_contact.startsWith('0')) {
                isInputValid = false
                errors.alternative_contact = 'বিকল্প মোবাইল নম্বরটি অবশ্যই সঠিক ১১টি ডিজিট হতে হবে!';
            }
        }

        if (information?.address !== '') {
            if (parseFloat(information?.address.length) > 500) {
                isInputValid = false
                errors.address = 'ঠিকানাটি কমপক্ষে ৩ অক্ষরের এবং সর্বাধিক ৪৯৯ অক্ষরের হতে পারে!';
            }
        }

        if (information?.email !== '') {
            if (!validateEmail(information?.email) ) {
                isInputValid = false
                errors.email = 'অনুগ্রহ করে সঠিক ইমেইল ঠিকানা লিখুন!';
            }
        }

        setErrors(errors);
        return isInputValid;
    }

    function validateEmail(email) {
        // Regular expression for validating an email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    return {
        validateUserInformation,
        validatePatientInformation
    };
};

export default useValidation;