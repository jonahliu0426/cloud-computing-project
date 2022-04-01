import { Auth } from 'aws-amplify';

async function signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        return user;
    } catch (error) {
        console.error('error signing in', error);
    }
}

export default signIn;