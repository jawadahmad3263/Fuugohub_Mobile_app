import AsyncStorage from '@react-native-async-storage/async-storage';

 export const TOKEN = 'token'
 export const VERIFICATION_TOKEN = 'verificationToken'
export const getUserToken = async () => {
    try {
        return await AsyncStorage.getItem(TOKEN);
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
}

export const setUserToken = async (token) => {
    try {
        await AsyncStorage.setItem(TOKEN, token);
    } catch (error) {
        console.error('Error setting user token:', error);
    }
}

export const deleteUserToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN);
    } catch (error) {
        console.error('Error deleting user token:', error);
    }
}

export const getVerificationToken = async () => {
    try {
        return await AsyncStorage.getItem(VERIFICATION_TOKEN);
    } catch (error) {
        console.error('Error getting verification token:', error);
        return null;
    }
}
export const setVerificationToken = async (token) => {
    try {
        await AsyncStorage.setItem(VERIFICATION_TOKEN, token);
    } catch (error) {
        console.error('Error setting verification token:', error);
    }
}
export const removeVerificationToken = async () => {
    try {
        await AsyncStorage.removeItem(VERIFICATION_TOKEN);
    } catch (error) {
        console.error('Error removing verification token:', error);
    }
}

export const validateEmail = (email) => {
    if (!email) {
        return false
    }
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return reg.test(email)
}
export const validatePassword = (password) => {
    return password && password.length >= 8
}
export const validateName = (name) => {
    return name?.length >= 1
}
export const validateUsername = (username) => {
    if (!username) {
        return ''
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/
    return usernameRegex.test(username)
}
// export const validatePhone = (text) => {
//     return text?.length >= 5
// }
export const validatePhone = (text) => {
    // Ensure the length is between 7 and 13 characters, including the optional "+" sign
    if (text.length < 7 || text.length > 13) {
        return false
    }

    // Regular expression to validate phone number with optional "+" and digits
    const phoneRegex = /^\+?[0-9]\d{6,12}$/

    // Check if the phone number matches the regex
    return phoneRegex.test(text)
}

export const validateCode = (text) => {
    return text?.length === 6
}

export const createFormData = (data) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
        const value = data[key]
        if (Array.isArray(value)) {
            value.forEach((val) => {
                if (typeof val === 'object' && val.uri) {
                    formData.append(key, {
                        uri: val.uri,
                        type: val.type,
                        name: val.fileName ?? val.name,
                    })
                } else {
                    formData.append(key, val)
                }
            })
        } else if (typeof value === 'object' && value.uri) {
            formData.append(key, {
                uri: value.uri,
                type: value.type,
                name: value.fileName ?? value.name,
            })
        } else {
            formData.append(key, value)
        }
    })
    // Debugging FormData
    formData._parts.forEach((part) => {
        console.log(part[0] + ', ' + part[1])
    })

    return formData
}