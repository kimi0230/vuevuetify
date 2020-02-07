const emailRule = [
    value => !!value || "Required.",
    value => (value || "").length <= 30 || "Max 30 characters",
    value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
    }
];

const passwordRule = [
    value => !!value || "Required.",
    // value => (value || "").length <= 20 || "Max 20 characters",
    value => (value || "").length >= 6 || "Leaset 6 characters",
    value => {
        const pattern = /^[a-zA-Z0-9]*$/;
        return pattern.test(value) || "Invalid password.";
    }
];

const requiredRule = [
    value => !!value || "Required.",
]

export default {
    emailRule,
    passwordRule,
    requiredRule,
}