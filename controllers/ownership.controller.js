const ownershipsModel = require('../models/Ownership');
const utils = require('../models/utils');

const createOwnership = (req, res) => {
    const ownership = ownershipsModel.create(req.body);
    if (ownership === null) {
        res.status(400).json({ message: "Ownership already exists" });
    }
    res.status(201).json(ownership);
}

const updateOwnership = (req, res) => {
    const ownership = ownershipsModel.update(req.params.id, req.body);
    if (ownership === null) {
        res.status(404).json({ message: "Ownership not found" });
    }
    res.status(200).json(ownership);
}

const deleteOwnership = (req, res) => {
    const ownership = ownershipsModel.remove(req.params.id);
    if (ownership === null) {
        res.status(404).json({ message: "Ownership not found" });
    }
    res.status(200).json(ownership);
}

const getOwnerships = (req, res) => {
    const ownerships = ownershipsModel.findAll();
    if (ownerships === undefined || ownerships.length === 0) {
        res.status(404).json({ message: "Ownerships not found" });
    }
    res.status(200).json(ownerships);
}

const getOwnership = (req, res) => {
    const ownership = ownershipsModel.findById(req.params.id);
    if (ownership === undefined) {
        res.status(404).json({ message: "Ownership not found" });
    }
    res.status(200).json(ownership);
}

const getOwnersFromOwnership = (req, res) => {
    const owners = ownershipsModel.findOwnersFromOwnership(req.params.id);
    if (owners === null) {
        res.status(404).json({ message: "Ownership not found" });
        return;
    }
    res.status(200).json(owners);
}

const getTenantFromOwnership = (req, res) => {
    const tenant = ownershipsModel.findTenantFromOwnership(req.params.id);
    if (tenant === null) {
        res.status(404).json({ message: "Ownership not found" });
        return;
    }
    res.status(200).json(tenant);
}

const linkOwnerToOwnership = (req, res) => {
    const { RFC, id } = req.params;
    const linked = utils.linkOwnerToOwnership(RFC, id);
    if (linked === false) {
        res.status(404).json({ message: "Owner or ownership not found" });
        return;
    }
    res.status(200).json(ownershipsModel.ownerships[ownershipsModel.ownerships.findIndex(ownership => ownership.id === id)]);
}

const linkTenantToOwnership = (req, res) => {
    const { RFC, id } = req.params;
    const linked = utils.linkTenantToOwnership(RFC, id);
    if (linked === false) {
        res.status(404).json({ message: "Tenant or ownership not found" });
        return;
    }
    res.status(200).json(ownershipsModel.ownerships[ownershipsModel.ownerships.findIndex(ownership => ownership.id === id)]);
}

const unlinkOwnerFromOwnership = (req, res) => {
    const { RFC, id } = req.params;
    const linked = utils.unlinkOwnerFromOwnership(RFC, id);
    if (linked === false) {
        res.status(404).json({ message: "Owner or ownership not found" });
        return;
    }
    res.status(200).json(ownershipsModel.ownerships[ownershipsModel.ownerships.findIndex(ownership => ownership.id === id)]);
}

const unlinkTenantFromOwnership = (req, res) => {
    const { RFC, id } = req.params;
    const linked = utils.unlinkTenantFromOwnership(RFC, id);
    if (linked === false) {
        res.status(404).json({ message: "Tenant or ownership not found" });
        return;
    }
    res.status(200).json(ownershipsModel.ownerships[ownershipsModel.ownerships.findIndex(ownership => ownership.id === id)]);
}

module.exports = {
    createOwnership,
    updateOwnership,
    deleteOwnership,
    getOwnerships,
    getOwnership,
    getOwnersFromOwnership,
    getTenantFromOwnership,
    linkOwnerToOwnership,
    linkTenantToOwnership,
    unlinkOwnerFromOwnership,
    unlinkTenantFromOwnership
}