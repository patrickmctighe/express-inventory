const express = require("express");
const router = express.Router();

// Require controller modules.
const guns_controller = require("../controllers/gunsController");
const maker_controller = require("../controllers/makersController");
const types_controller = require("../controllers/typesController");
const specs_controller = require("../controllers/specsController");

/// GUNS ROUTES ///
// GET catalog home page.
router.get("/", guns_controller.index);

// GET request for creating a Gun. NOTE This must come before routes that display Gun (uses id).
router.get("/gun/create", guns_controller.guns_create_get);

// POST request for creating Gun.
router.post("/gun/create", guns_controller.guns_create_post);

// GET request to delete Gun.
router.get("/gun/:id/delete", guns_controller.guns_delete_get);

// POST request to delete Gun.
router.post("/gun/:id/delete", guns_controller.guns_delete_post);

// GET request to update Gun.
router.get("/gun/:id/update", guns_controller.guns_update_get);

// POST request to update Gun.
router.post("/gun/:id/update", guns_controller.guns_update_post);

// GET request for one Gun.
router.get("/gun/:id", guns_controller.guns_detail);

// GET request for list of all Gun items.
router.get("/guns", guns_controller.guns_list);

/// MAKERS ROUTES ///

// GET request for creating Maker. NOTE This must come before route for id (i.e. display maker).
router.get("/maker/create", maker_controller.makers_create_get);

// POST request for creating Maker.
router.post("/maker/create", maker_controller.makers_create_post);

// GET request to delete Maker.
router.get("/maker/:id/delete", maker_controller.makers_delete_get);

// POST request to delete Maker.

router.post("/maker/:id/delete", maker_controller.makers_delete_post);

// GET request to update Maker.
router.get("/maker/:id/update", maker_controller.makers_update_get);

// POST request to update Maker.
router.post("/maker/:id/update", maker_controller.makers_update_post);

// GET request for one Maker.
router.get("/maker/:id", maker_controller.makers_detail);

// GET request for list of all Maker.
router.get("/makers", maker_controller.makers_list);

/// TYPES ROUTES ///

// GET request for creating a Type. NOTE This must come before route that displays Type (uses id).
router.get("/type/create", types_controller.types_create_get);

//POST request for creating Type.
router.post("/type/create", types_controller.types_create_post);

// GET request to delete Type.
router.get("/type/:id/delete", types_controller.types_delete_get);

// POST request to delete Type.
router.post("/type/:id/delete", types_controller.types_delete_post);

// GET request to update Type.
router.get("/type/:id/update", types_controller.types_update_get);

// POST request to update Type.
router.post("/type/:id/update", types_controller.types_update_post);

// GET request for one Type.
router.get("/type/:id", types_controller.types_detail);

// GET request for list of all Type.
router.get("/types", types_controller.types_list);

/// SPECS ROUTES ///
// GET request for creating a Specs. NOTE This must come before route that displays Specs (uses id).
router.get("/specs/create", specs_controller.specs_create_get);

//POST request for creating Specs.
router.post("/specs/create", specs_controller.specs_create_post);

// GET request to delete Specs.
router.get("/specs/:id/delete", specs_controller.specs_delete_get);

// POST request to delete Specs.
router.post("/specs/:id/delete", specs_controller.specs_delete_post);

// GET request to update Specs.
router.get("/specs/:id/update", specs_controller.specs_update_get);

// POST request to update Specs.
router.post("/specs/:id/update", specs_controller.specs_update_post);

// GET request for one Specs.
router.get("/specs/:id", specs_controller.specs_detail);

// GET request for list of all Specs.
router.get("/specs", specs_controller.specs_list);

module.exports = router;

