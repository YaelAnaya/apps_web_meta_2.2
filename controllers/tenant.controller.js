const tenantModel = require('../models/Tenant');
const utils = require('../models/utils');

const createTenant = (req, res) => {
    const tenant = tenantModel.create(req.body);
    if (tenant === null) {
        res.status(400).json({ message: "Tenant already exists" });
        return;
    }
    res.status(201).json(tenant);
}

const updateTenant = (req, res) => {
    const tenant = tenantModel.update(req.params.RFC, req.body);
    if (tenant === null) {
        res.status(404).json({ message: "Tenant not found" });
        return;
    }
    res.status(200).json(tenant);
}

const deleteTenant = (req, res) => {
    const tenant = tenantModel.remove(req.params.RFC);
    if (tenant === null) {
        res.status(404).json({ message: "Tenant not found" });
        return;
    }
    res.status(200).json(tenant);
}

const getTenants = (req, res) => {
    const tenants = tenantModel.findAll();
    if (tenants === undefined || tenants.length === 0) {
        res.status(404).json({ message: "Tenants not found" });
        return;
    }
    res.status(200).json(tenants);
}

const getTenant = (req, res) => {
    const tenant = tenantModel.findByRFC(req.params.RFC);
    if (tenant === undefined) {
        res.status(404).json({ message: "Tenant not found" });
        return;
    }
    res.status(200).json(tenant);
}

const getOwnershipsFromTenant = (req, res) => {
    const ownerships = tenantModel.findOwnershipsFromTenant(req.params.RFC);
    if (ownerships === null) {
        res.status(404).json({ message: "Tenant not found" });
        return;
    }
    res.status(200).json(ownerships);
}

const linkOwnershipToTenant = (req, res) => {
    const { id, RFC } = req.params;
    const ownership = utils.linkTenantToOwnership(RFC, id);
    if (ownership === false) {
        res.status(404).json({ message: "Tenant or ownership not found" });
        return;
    }
    res.status(200).json(tenantModel.tenants);
}

const unlinkOwnershipFromTenant = (req, res) => {
    const { id, RFC } = req.params;
    const ownership = utils.unlinkTenantFromOwnership(RFC, id);
    if (ownership === false) {
        res.status(404).json({ message: "Tenant or ownership not found" });
        return;
    }
    res.status(200).json(tenantModel.tenants);
}

module.exports = {
    createTenant,
    updateTenant,
    deleteTenant,
    getTenants,
    getTenant,
    getOwnershipsFromTenant,
    linkOwnershipToTenant,
    unlinkOwnershipFromTenant
}