import { Knex } from 'knex';

export class RegisterModel {

    registerUser(db: Knex.QueryInterface, username, password, firstName, lastName) {
        return db.table('users').insert({
            username,
            password,
            first_name: firstName,
            last_name: lastName
        });
    }


}
