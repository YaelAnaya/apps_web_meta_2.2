const express = require('express');
const bodyParser = require('body-parser');

/**
 * Importación de los controladores
 * */
const app = express();
const port = 3000;

/**
 * Configuración de middlewares y rutas
 * */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Main route
 * */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * Importación de los controladores
 * */
const ownerController = require('./controllers/owner.controller');
const tenantController = require('./controllers/tenant.controller');
const ownershipController = require('./controllers/ownership.controller');

/**
 * Route -> Owner
 * */
app.get('/owners', ownerController.getOwners);
app.post('/owners', ownerController.createOwner);
app.put('/owners/:RFC/link/:id', ownerController.linkOwnershipToOwner);
app.put('/owners/:RFC/unlink/:id', ownerController.unlinkOwnershipFromOwner);
app.get('/owners/:RFC/ownerships', ownerController.getOwnershipsFromOwner);
app.get('/owners/:RFC', ownerController.getOwner);
app.patch('/owners/:RFC', ownerController.updateOwner);
app.delete('/owners/:RFC', ownerController.deleteOwner);


/**
 * Route -> Tenant
 */
app.get('/tenants', tenantController.getTenants);
app.get('/tenants/:RFC/ownerships', tenantController.getOwnershipsFromTenant);
app.get('/tenants/:RFC', tenantController.getTenant);
app.post('/tenants', tenantController.createTenant);
app.patch('/tenants/:RFC', tenantController.updateTenant);
app.put('/tenants/:RFC/link/:id', tenantController.linkOwnershipToTenant);
app.put('/tenants/:RFC/unlink/:id', tenantController.unlinkOwnershipFromTenant);
app.delete('/tenants/:RFC', tenantController.deleteTenant);

/**
 * Route -> Ownership
 */
app.get('/ownerships', ownershipController.getOwnerships);
app.get('/ownerships/:id', ownershipController.getOwnership);
app.get('/ownerships/:id/owners', ownershipController.getOwnersFromOwnership);
app.get('/ownerships/:id/tenant', ownershipController.getTenantFromOwnership);
app.post('/ownerships', ownershipController.createOwnership);
app.patch('/ownerships/:id', ownershipController.updateOwnership);
app.delete('/ownerships/:id', ownershipController.deleteOwnership);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});