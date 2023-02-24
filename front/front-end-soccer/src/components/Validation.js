
const Validation = (values) => {
    let errors = {}

    if (!values.username) {
        errors.usernmae = "Name Required"
    } else if (values.username.length < 5) {
        errors.username = "Name must be longer than 5 characters"
    } 

    if(!values.email) {
        errors.email = "Email Required"
    } else if (!values.email.includes('@')) {
        errors.email = "Invalid Email"
    }

    if(!values.password) {
        errors.password = "Password Required"
    } else if (values.password.length < 7) {
        errors.password = "Password must be longer than 5 characters"
    }

    return errors;
}

export default Validation;