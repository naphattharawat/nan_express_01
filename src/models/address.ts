import { Knex } from 'knex';

export class AddressModel {

    getProvince(db: Knex.QueryInterface) {
        return db.table('cchangwat')
            .select('changwatcode as code', 'changwatname as name');
    }

    getAmpur(db: Knex.QueryInterface, changwatCode) {
        return db.table('campur')
            .select('ampurcodefull as code', 'ampurname as name')
            .where('changwatcode', changwatCode);
    }

    getTambon(db: Knex.QueryInterface, changwatCode, ampurCode) {
        return db.table('ctambon')
            .select('tamboncode as code', 'tambonname as name')
            .where('ampurcode', ampurCode);
            // .where('changwatcode', changwatCode);
    }


}
