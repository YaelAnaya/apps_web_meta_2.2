/**
 * Se encarga de almacenar los datos de los Arrerntatarios.
 * */
const tenants = [
    {
        RFC: "JUAN123",
        name: "Juan Perez",
        ownerships: [
            {
                id: 1,
                description: "Casa en la playa",
            },
            {
                id: 2,
                description: "Casa en la montaña",
            }
        ],
        image: ""
    },
    {
        RFC: "PEDRO123",
        name: "Pedro Perez",
        ownerships: [
            {
                id: 3,
                description: "Casa en la ciudad",

            }
        ],
        image: ""
    },
];

/**
 * Crea un nuevo Arrendatario.
 * @param body Datos del Arrendatario
 * @returns {Object} Arrendatario creado
 * */
const create = (body) => {
    const { RFC, name, image } = body;
    if (tenants.find(tenant => tenant.RFC === RFC)) {
        return null;
    }
    tenants.push({ RFC, name, ownerships: [], image });
    return tenants[tenants.length - 1]
}

/**
 * Actualiza los datos de un Arrendatario.
 * @param {String} tenantRFC RFC del Arrendatario a actualizar
 * @param {Object} changes Datos del Arrendatario
 * @returns {Object} Arrendatario actualizado
 * */
const update = (tenantRFC, changes) => {
    const index = tenants.findIndex(tenant => tenant.RFC === tenantRFC);
    if (index === -1) {
        return null;
    }
    const tenant = tenants[index];
    tenants[index] = { ...tenant, ...changes };
    return tenants[index];
}

/**
 * Elimina un Arrendatario.
 * @param {String} RFC RFC del Arrendatario a eliminar
 * @returns {Object} Arrendatario eliminado
 * */
const remove = (RFC) => {
    const index = tenants.findIndex(tenant => tenant.RFC === RFC);
    if (index === -1) {
        return null;
    }
    const tenant = tenants[index];
    tenants.splice(index, 1);
    return tenant;
}

/**
 * Obtiene todos los Arrendatarios.
 * @returns {Array} Arrendatarios
 * @returns {null} Si no hay Arrendatarios
 * */
const findAll = () => {
    return tenants;
}

/**
 * Obtiene un Arrendatario por su RFC.
 * @param {String} RFC RFC del Arrendatario a buscar
 * @returns {Object} Arrendatario encontrado
 * */
const findByRFC = (RFC) => {
    return tenants.find(tenant => tenant.RFC === RFC);
}

/**
 * Obtiene las propiedades de un Arrendatario.
 * @param {String} RFC RFC del Arrendatario a buscar
 * @returns {Array} Arreglo de propiedades
 * */
const findOwnershipsFromTenant = (RFC) => {
    const tenant = findByRFC(RFC);
    if (tenant === undefined) {
        return null;
    }
    return tenant.ownerships;
}

module.exports = {
    tenants,
    create,
    update,
    remove,
    findAll,
    findByRFC,
    findOwnershipsFromTenant,
}