/**
 * Se encarga de almacenar los datos de las propiedades.
 * */
const ownerships = [
    {
        id: 'LM-40-213',
        description: 'Casa de playa',
        owners: [],
        tenant: "",
        images: []
    },
    {
        id: 'LM-40-214',
        description: 'Casa de campo',
        owners: [],
        tenant: "",
        images: []
    },
]
/**
 * Crea una nueva propiedad.
 * @param body Datos de la propiedad
 * @returns {Object} Propiedad creada
 */
const create = (body) => {
    const { id, description, owners, tenant } = body;
    if (ownerships.find(ownership => ownership.id === id)) {
        return null;
    }
    ownerships.push({ id, description, owners, tenant, images: [] });
    return ownerships[ownerships.length - 1];
}

/**
 * Actualiza los datos de una propiedad.
 * @param {String} id ID de la propiedad a actualizar
 * @param {Object} changes Datos de la propiedad
 * @returns {Object} Propiedad actualizada
 * */
const update = (id, changes) => {
    const index = ownerships.findIndex(ownership => ownership.id === id);
    if (index === -1) {
        return null;
    }
    const ownership = ownerships[index];
    ownerships[index] = { ...ownership, ...changes };
    return ownerships[index];
}
/**
 * Elimina una propiedad.
 * @param {String} id ID de la propiedad a eliminar
 * @returns {Object} Propiedad eliminada
 * */
const remove = (id) => {
    const index = ownerships.findIndex(ownership => ownership.id === id);
    if (index === -1) {
        return null;
    }
    const ownership = ownerships[index];
    ownerships.splice(index, 1);
    return ownership;
}

/**
 * Obtiene todas las propiedades.
 * @returns {Array} Todas las propiedades
 * */
const findAll = () => {
    return ownerships;
}

/**
 * Obtiene una propiedad por su ID.
 * @param {String} id ID de la propiedad a buscar
 * @returns {Object} Propiedad encontrada
 * */
const findById = (id) => {
    return ownerships.find(ownership => ownership.id === id);
}

/**
 * Obtiene los propietarios de una propiedad.
 * @param {String} id ID de la propiedad a buscar
 * @returns {Array} Propietarios de la propiedad
 * */
const findOwnersFromOwnership = (id) => {
    const ownership = findById(id);
    if (ownership === undefined) {
        return null;
    }
    return ownership.owners;
}

/**
 * Obtiene el inquilino de una propiedad.
 * @param {String} id ID de la propiedad a buscar
 * @returns {String} Inquilino de la propiedad
 * */
const findTenantFromOwnership = (id) => {
    const ownership = findById(id);
    if (ownership === undefined) {
        return null;
    }
    return ownership.tenant;
}

module.exports = {
    ownerships,
    create,
    update,
    remove,
    findAll,
    findById,
    findOwnersFromOwnership,
    findTenantFromOwnership,
};