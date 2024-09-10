const asyncHandler = require("express-async-handler");
const CONTACT = require("../models/contact");

const getAllContacts = asyncHandler(async function (req, res) {
  const contacts = await CONTACT.find({});

  return res.status(200).json(contacts);
});

const getSingleContact = asyncHandler(async function (req, res) {
  const contactId = req.params?.contactId;
  const contact = await CONTACT.findById(contactId);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  return res.status(200).json({ status: 200, body: contact });
});

const createContact = asyncHandler(async function (req, res) {
  const { name, email, phone } = req.body || {};

  /*
  This is also one way to handle the errors

    if (!name) {
      return res
        .status(400)
        .json({ status: 400, message: "Please enter a name" });
    } else if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: "Please enter a email" });
    } else if (!phone) {
      return res
        .status(400)
        .json({ status: 400, message: "Please enter a phone" });
    }

    */

  if (!name) {
    res.status(400);
    throw new Error("Please enter a name");
  } else if (!email) {
    res.status(400);
    throw new Error("Please enter a email");
  } else if (!phone) {
    res.status(400);
    throw new Error("Please enter a phone number");
  }

  const contact = await CONTACT.create({ name, email, phone });

  return res
    .status(201)
    .json({ status: 201, message: "New contact created", body: contact });
});

const updateContact = asyncHandler(async function (req, res) {
  const contactId = req.params?.contactId;
  const { name, email, phone } = req.body;

  const contact = await CONTACT.findById(contactId);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (!name) {
    res.status(400);
    throw new Error("Please enter a name");
  } else if (!email) {
    res.status(400);
    throw new Error("Please enter a email");
  } else if (!phone) {
    res.status(400);
    throw new Error("Please enter a phone number");
  }

  await CONTACT.findByIdAndUpdate(contactId, {
    name,
    email,
    phone,
  });

  return res.status(200).json({
    status: 200,
    message: "Contact updated successfully",
  });
});

const deleteContact = asyncHandler(async function (req, res) {
  const contactId = req.params?.contactId;
  const contact = await CONTACT.findByIdAndDelete(contactId);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  return res.status(200).json({
    status: 200,
    message: "Contact deleted successfully",
    body: contact,
  });
});

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
