const express = require("express");
const {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getSingleContact);

router.post("/", createContact);

router.put("/:contactId", updateContact);

router.delete("/:contactId", deleteContact);

module.exports = router;
