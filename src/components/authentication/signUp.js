import { Auth } from 'aws-amplify';

async function signUp({ username, password, email, phone_number }) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
        return user;
    } catch (error) {
        console.log('error signing up:', error);
    }
}

export default signUp;