const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const getContacts = await fs.readFile(contactsPath, "utf8");
  const listContacts = JSON.parse(getContacts);
  return listContacts.find((el) => el.id === contactId);
}

async function removeContact(contactId) {
  const getContacts = await fs.readFile(contactsPath, "utf8");
  const listContacts = JSON.parse(getContacts);
  const filterContacts = listContacts.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
}

async function addContact(name, email, phone) {
  const getContacts = await fs.readFile(contactsPath, "utf8");
  const listContacts = JSON.parse(getContacts);
  const id = nanoid();
  listContacts.push({ name, email, phone, id });
  await fs.writeFile(contactsPath, JSON.stringify(listContacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
