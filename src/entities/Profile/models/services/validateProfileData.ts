import {Profile, ValidateDataErrors} from '../types/ProfileSchema'

export const validateProfileData = (profile: Profile | undefined): ValidateDataErrors[] => {
    if(profile === undefined) {
        return [ValidateDataErrors.NO_DATA]
    }
    const errors: ValidateDataErrors[] = []
    const {
        first,
        lastname,
        age,
        country
    } = profile

    if(!first.length) {
        errors.push(ValidateDataErrors.INVALIDATE_FIRSTNAME)
    }
    if(!lastname.length) {
        errors.push(ValidateDataErrors.INVALIDATE_LASTNAME)
    }
    if(!country.length) {
        errors.push(ValidateDataErrors.INVALIDATE_COUNTRY)
    }
    if(!age || !Number.isInteger(age)) {
        errors.push(ValidateDataErrors.INVALIDATE_FIRSTNAME)
    }

    return errors
}