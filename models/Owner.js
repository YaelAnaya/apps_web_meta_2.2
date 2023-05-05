/**
 * Se encarga de almacenar los datos de los dueños de las propiedades.
 * */
const owners = [
    {
        RFC: "JOHN920202",
        name: "John Doe",
        ownerships: [],
        image: ""
    },
    {
        RFC: "JANE920202",
        name: "Jane Doe",
        ownerships: [],
        image: ""
    }
]

/**
 * Crea un nuevo dueño y lo agrega al arreglo de dueños
 * @param {Object} data Datos del dueño
 * @returns {Object} Dueño creado
 * */
const create = (data) => {
    const { RFC, name, ownerships, image } = data;
    if (owners.find(owner => owner.RFC === RFC)) {
        return null;
    }
    owners.push({ RFC, name, ownerships, image });
    return owners[owners.length - 1]
}

/**
 * Actualiza los datos de un dueño
 * @param {String} ownerRFC RFC del dueño a actualizar
 * @param {Object} changes Datos del dueño a actualizar
 * @returns {Object} Dueño actualizado
 * */
const update = (ownerRFC, changes) => {
    const index = owners.findIndex(owner => owner.RFC === ownerRFC);
    if (index === -1) {
        return null;
    }
    const owner = owners[index];
    owners[index] = { ...owner, ...changes };
    return owners[index];
}

/**
 * Elimina un dueño del arreglo de dueños.
 * @param {String} RFC RFC del dueño a eliminar
 * @returns {Object} Dueño eliminado
 * @returns {null} Si no se encuentra el dueño
 * */
const remove = (RFC) => {
    const index = owners.findIndex(owner => owner.RFC === RFC);
    if (index === -1) {
        return null;
    }
    const owner = owners[index];
    owners.splice(index, 1);
    return owner;
}

/**
 * Obtiene todos los dueños
 * @returns {Array} Arreglo de dueños
 * */
const findAll = () => {
    return owners;
}
/**
 * Obtiene un dueño por su RFC
 * @param {String} RFC RFC del dueño a buscar
 * @returns {Object} Dueño encontrado
 * */
const findByRFC = (RFC) => {
    return owners.find(owner => owner.RFC === RFC);
}
/**
 * Obtiene las propiedades de un dueño
 * @param {String} RFC RFC del dueño a buscar
 * @returns {Array} Arreglo de propiedades del dueño
 * */
const findOwnershipsFromOwner = (RFC) => {
    const owner = findByRFC(RFC);
    if (owner === undefined) {
        return null;
    }
    return owner.ownerships;
}


module.exports = {
    owners,
    create,
    update,
    remove,
    findAll,
    findByRFC,
    findOwnershipsFromOwner
}