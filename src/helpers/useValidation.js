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
            if (parseFloat(information?.alternative_contact_no.length) !== 11 ) {
                isInputValid = false
                errors.alternative_contact_no = 'Alternative Contact must be 11 digit!';
            }
        }

        if (information?.ref_contact !== '') {
            if (parseFloat(information?.ref_contact.length) !== 11 ) {
                isInputValid = false
                errors.ref_contact = 'Ref. Contact must be 11 digit!';
            }
        }

        setErrors(errors);
        return isInputValid;

    }

    return {
        validateUserInformation,
    };
};

export default useValidation;