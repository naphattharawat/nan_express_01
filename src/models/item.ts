import { Knex } from 'knex';

export class ItemModel {

    getItemType(db: Knex.QueryInterface) {
        return db.table('item_type');
    }

    getItemGroupALL(db: Knex.QueryInterface) {
        return db.table('item_group')
            .where('is_delete', 'N')
    }
    getItemGroup(db: Knex.QueryInterface, id) {
        return db.table('item_group')
            .where('itype_id', id)
            .where('is_delete', 'N')
    }

    saveItemGroup(db: Knex.QueryInterface, data) {
        return db.table('item_group').insert(data);
    }

    updateItemGroup(db: Knex.QueryInterface, data, id) {
        return db.table('item_group').update(data).where('id', id);
    }

    deleteItemGroup(db: Knex.QueryInterface,id) {
        // return db.table('item_group').delete().where('id', id);
        return db.table('item_group')
        .update('is_delete','Y')
        .where('id', id);
    }

}
