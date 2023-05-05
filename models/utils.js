const ownersModel = require('./Owner');
const ownershipsModel = require('./Ownership');
const tenantsModel = require('./Tenant');

/**
 * Esta función se encarga de enlazar un propietario con una propiedad
 * @param {string} RFC El RFC del propietario
 * @param {string} id El id de la propiedad
 * @returns {boolean} true si se pudo enlazar, false si no
 * */
const linkOwnerToOwnership = (RFC, id) => {
    const owner = ownersModel.findByRFC(RFC);
    const ownership = ownershipsModel.findById(id);

    if (owner === undefined || ownership === undefined ) {
        return false;
    }

    ownership.owners.push({
        RFC: owner.RFC,
        name: owner.name,
        image: owner.image
    });
    owner.ownerships.push({
        id: ownership.id,
        description: ownership.description,
        tenant: ownership.tenant,
        images: ownership.images
    });
    return true;
}

/**
 * Esta función se encarga de enlazar un inquilino con una propiedad
 * @param {string} RFC El RFC del inquilino
 * @param {string} id El id de la propiedad
 * @returns {boolean} true si se pudo enlazar, false si no
 * */
const linkTenantToOwnership = (RFC, id) => {
    const tenant = tenantsModel.findByRFC(RFC);
    const ownership = ownershipsModel.findById(id);

    if (tenant === undefined || ownership === undefined ) {
        return false;
    }

    ownership.tenant = {
        RFC: tenant.RFC,
        name: tenant.name,
        image: tenant.image
    };
    tenant.ownerships.push({
        id: ownership.id,
        description: ownership.description,
        owners: ownership.owners,
        images: ownership.images
    });
    return true;
}

/**
 * Esta función se encarga de desenlazar un propietario con una propiedad
 * @param {string} RFC El RFC del propietario
 * @param {string} id El id de la propiedad
 * @returns {boolean} true si se pudo desenlazar, false si no
 * */
const unlinkOwnerFromOwnership = (RFC, id) => {
    const owner = ownersModel.findByRFC(RFC);
    const ownership = ownershipsModel.findById(id);

    if (owner === undefined || ownership === undefined) {
        return false;
    }

    ownership.owners = ownership.owners.filter(owner => owner.RFC !== RFC);
    owner.ownerships = owner.ownerships.filter(ownership => ownership.id !== id);
    return true;
}

/**
 * Esta función se encarga de desenlazar un inquilino con una propiedad
 * @param {string} RFC El RFC del inquilino
 * @param {string} id El id de la propiedad
 * @returns {boolean} true si se pudo desenlazar, false si no
 * */
const unlinkTenantFromOwnership = (RFC, id) => {
    const tenant = tenantsModel.findByRFC(RFC);
    const ownership = ownershipsModel.findById(id);

    if (tenant === undefined || ownership === undefined) {
        return false;
    }

    ownership.tenant = null;
    tenant.ownerships = tenant.ownerships.filter(ownership => ownership.id !== id);
    return true;
}


module.exports = {
    linkOwnerToOwnership,
    linkTenantToOwnership,
    unlinkOwnerFromOwnership,
    unlinkTenantFromOwnership
}