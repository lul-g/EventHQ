const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

const createMany = {
  users: async (req, res) => {
    const num = req.body.num;
    try {
      let userArr = [];
      for (let i = 0; i < num; i++) {
        userArr.push(
          new User({
            firstName: Math.random().toString(36).slice(2, 7),
            lastName: Math.random().toString(36).slice(2, 7),
            bio: [
              Math.random().toString(36).slice(2, 7),
              Math.random().toString(36).slice(2, 7),
              Math.random().toString(36).slice(2, 7),
            ],
            location: Math.random().toString(36).slice(2, 7),
            username: Math.random().toString(36).slice(2, 7),
            email: Math.random().toString(36).slice(2, 7),
            password: Math.random().toString(36).slice(2, 7),
          })
        );
      }

      const insertedDocs = User.insertMany(userArr);
      return insertedDocs;
    } catch (err) {
      console.error(`Error retrieving data: ${err}`);
      res.status(500).json({ error: "Error retrieving data" });
    }
  },
  orgs: async (req, res) => {
    const num = req.body.num;
    try {
      let orgArr = [];
      for (let i = 0; i < num; i++) {
        orgArr.push(
          new Org({
            name: Math.random().toString(36).slice(2, 7),
            description: Math.random().toString(36).slice(2, 7),
            location: Math.random().toString(36).slice(2, 7),
            createdAt: new Date(),
          })
        );
      }

      const insertedDocs = Org.insertMany(orgArr);
      return insertedDocs;
    } catch (err) {
      console.error(`Error retrieving data: ${err}`);
      res.status(500).json({ error: "Error retrieving data" });
    }
  },
  events: async (req, res) => {
    try {
      let eventArr = [];
      for (let i = 0; i < req.body.num; i++) {
        eventArr.push(
          new Event({
            title: Math.random().toString(36).slice(2, 7),
            description: Math.random().toString(36).slice(2, 7),
            location: Math.random().toString(36).slice(2, 7),
            category: Math.random().toString(36).slice(2, 7),
            startDate: new Date().getDate(),
          })
        );
      }

      const insertedDocs = Event.insertMany(eventArr);
      return insertedDocs;
    } catch (err) {
      console.error(`Error retrieving data: ${err}`);
      res.status(500).json({ error: "Error retrieving data" });
    }
  },
};
module.exports = { createMany };
