/* eslint-disable jsdoc/no-undefined-types */
const { decorate, injectable, unmanaged } = require("inversify");

/**
 * @template M Model
 * @template T Attribute
 */
class SequelizeRepository {
    /**
     * @protected
     */
    model;

    /**
     * @param {import("sequelize").ModelStatic<M>} model
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * Builds a new model instance and calls save on it.
     *
     * @public
     * @param   {import("sequelize").Optional<T, import("sequelize/types/utils").NullishPropertiesOf<M>>} values
     * @param   {import("sequelize").CreateOptions<T>}                                                    [options]
     * @returns {Promise<M>}
     */
    async create(values, options) {
        return await this.model.create(values, options);
    }

    /**
     * Update multiple instances that match the where options. The promise returns an array with one or two
     * elements. The first element is always the number of affected rows, while the second element is the actual
     * affected rows (only supported in postgres and mssql with `options.returning` true.)
     *
     * @public
     * @param   {import("sequelize").Optional<T, import("sequelize/types/utils").NullishPropertiesOf<T>>} values
     * @param   {import("sequelize").UpdateOptions<T>}                                                    [options]
     * @returns {Promise<M>}
     */
    async update(values, options) {
        return await this.model.update(values, options);
    }

    /**
     * Search for a single instance. Returns the first instance found, or null if none can be found.
     *
     * @public
     * @param   {import("sequelize").FindOptions<T>} options
     * @returns {Promise<M>}
     */
    async findOne(options) {
        return await this.model.findOne(options);
    }

    /**
     * @typedef  {object} IValue
     * @property {any}    id
     *
     * Search for a single instance by its primary key. This applies LIMIT 1, so the listener will always be called with a single instance.
     * @public
     * @param   {IValue}     value
     * @returns {Promise<M>}
     */
    async findById(value) {
        return await this.model.findByPk(value.id);
    }

    /**
     * Search for multiple instances.
     *
     * @public
     * @param   {import("sequelize").FindOptions<T>} options
     * @returns {Promise<Array<M>>}
     */
    async findAll(options) {
        return await this.model.findAll(options);
    }

    /**
     * Search for multiple instances.
     *
     * @public
     * @param   {import("sequelize").FindAndCountOptions<T>} options
     * @returns {Promise<{rows: Array<M>, count: number }>}
     */
    async findAndCountAll(options) {
        return await this.model.findAndCountAll(options);
    }

    /**
     * Delete multiple instances, or set their deletedAt timestamp to the current time if paranoid is enabled.
     *
     * @public
     * @param   {import("sequelize").DestroyOptions<T>} options
     * @returns {Promise<number>} Promise The number of destroyed rows
     */
    async delete(options) {
        return await this.model.destroy(options);
    }

    /**
     * Create and insert multiple instances in bulk.
     * The success handler is passed an array of instances, but please notice that these may not completely represent the state of the rows in the DB. This is because MySQL and SQLite do not make it easy to obtain back automatically generated IDs and other default values in a way that can be mapped to multiple records. To obtain Instances for the newly created values, you will need to query for them again.
     *
     * @public
     * @param   {Array<import("sequelize").Optional<T, import("sequelize/types/utils").NullishPropertiesOf<T>>>} values
     * @param   {import("sequelize").BulkCreateOptions<Array<T>>}                                                [options]
     * @returns {Promise<Array<M>>}
     */
    async bulkCreate(values, options) {
        return await this.model.bulkCreate(values, options);
    }

    /**
     * Count number of records if group by is used
     *
     * @public
     * @param   {import("sequelize").CountOptions<any>}  [options]
     * @returns {Promise<M>} Returns count for each group and the projected attributes.
     */
    async count(options) {
        return await this.model.count(options);
    }
}

decorate(injectable(), SequelizeRepository);
decorate(unmanaged("model"), SequelizeRepository, 0);

module.exports = { SequelizeRepository };