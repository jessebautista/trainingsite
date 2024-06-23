// src/pages/api/createAccount.js
import swell from 'swell-node';
swell.init('jesse-swell-internal-horizon1112', 'pk_test_e8uqpwFEn8HF2l7uvxaU0qK7FjDxxmlC');

export async function post({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const password = formData.get('password');

    try {
        const account = await swell.post('/accounts', {
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password,
            email_optin: false,
            type: 'individual'
        });

        return new Response(JSON.stringify(account), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
}
