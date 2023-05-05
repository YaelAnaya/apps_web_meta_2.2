const utils = require("../models/utils");
const ownerModel = require("../models/Owner");

const createOwner = async (req, res) => {
    const owner = ownerModel.create(req.body);
    if (owner === null) {
        res.status(400).json({ message: "Owner already exists" });
    }
    res.status(201).json(owner);
}

const updateOwner = async (req, res) => {
    const owner = ownerModel.update(req.params.RFC, req.body);
    if (owner === null) {
        res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owner);
}

const deleteOwner = async (req, res) => {
    const owner = ownerModel.remove(req.params.RFC);
    if (owner === null) {
        res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owner);
}

const getOwners = async (req, res) => {
    const owners = ownerModel.findAll();
    if (owners === undefined || owners.length === 0) {
        res.status(404).json({ message: "Owners not found" });
    }
    res.status(200).json(owners);
}

const getOwner = async (req, res) => {
    const owner = ownerModel.findByRFC(req.params.RFC);
    if (owner === undefined) {
        res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owner);
}

const getOwnershipsFromOwner = async (req, res) => {
    const ownerships = ownerModel.findOwnershipsFromOwner(req.params.RFC);
    if (ownerships === null) {
        res.status(404).json({ message: "Owner not found" });
        return;
    }
    res.status(200).json(ownerships);
}

const linkOwnershipToOwner = async (req, res) => {
    const { RFC, id } = req.params;
    const linked = utils.linkOwnerToOwnership(RFC, id);
    if (linked === false) {
        res.status(404).json({ message: "Owner or ownership not found" });
        return;
    }
    res.status(200).json(ownerModel.owners[ownerModel.owners.findIndex(owner => owner.RFC === RFC)]);
}

const unlinkOwnershipFromOwner = async (req, res) => {
    const { RFC, id } = req.params;
    const unlinked = utils.unlinkOwnerFromOwnership(RFC, id);
    if (unlinked === false) {
        res.status(404).json({ message: "Owner or ownership not found" });
        return;
    }
    res.status(200).json(ownerModel.owners[ownerModel.owners.findIndex(owner => owner.RFC === RFC)]);
}

module.exports = {
    createOwner,
    updateOwner,
    deleteOwner,
    getOwners,
    getOwner,
    getOwnershipsFromOwner,
    linkOwnershipToOwner,
    unlinkOwnershipFromOwner
}
