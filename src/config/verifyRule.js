import i18n from "@/plugins/i18n";

const REQUIRED = value => !!value || i18n.t('required');

const TEL = value => {
    const pattern = /^[0-9]*$/;
    return pattern.test(value) || "Invalid phone.";
};

const MOBILE_PHONE = value => {
    const pattern = /^09[0-9]{8}$/;
    return pattern.test(value) || "Invalid phone.";
};

const EMAIL = value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
}

const AZ09 = value => {
    const pattern = /^[a-zA-Z0-9]*$/;
    return pattern.test(value) || "Invalid password.";
}

const emailRule = [
    REQUIRED,
    EMAIL,
    value => (value || "").length <= 30 || "Max 30 characters"
];

const passwordRule = [
    REQUIRED,
    AZ09,
    value => (value || "").length >= 6 || "Leaset 6 characters",
];

const requiredRule = [
    REQUIRED,
];

const phoneRule = [
    REQUIRED,
    MOBILE_PHONE
];


export default {
    REQUIRED,
    TEL,
    MOBILE_PHONE,
    EMAIL,
    AZ09,
    emailRule,
    passwordRule,
    requiredRule,
    phoneRule,
}