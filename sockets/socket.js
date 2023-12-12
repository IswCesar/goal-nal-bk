const { io } = require("../index");
const {
    existRecord,
    saveRecord,
    updateRecord
} = require("../controllers/questionScore");
const { saveResponse } = require("../controllers/questionResponse")
const { existRoomRecord, saveRoomRecord, updateRoomRecord } = require("../controllers/room")
const QuestionScore = require("../models/questionScore");
const QuestionResponse = require("../models/questionResponse");
const Room = require("../models/room");

const mongoose = require('mongoose');

// Mensajes de Sockets
io.on("connection", (client) => {

    client.on("send-message", async(payload) => {

        console.log("Send message catched:")
        console.log(payload)

        let exist = await existRoomRecord(payload.test)

        const newRoom = {
            test: payload.test,
            contacts: [payload.student],
            status: payload.status
        }
        if (!exist) {
            let data = await saveRoomRecord(newRoom)
            io.emit('roomCreated', {
                data
            })

        } else {
            let data = await updateRoomRecord(payload)
            io.emit('roomCreated', {
                data
            })
        }
    });

    client.on("set-player", async(payload) => {
        console.log("set-player event catched on server")    
        io.emit('playerSetted', {
            payload
        })
    });

    client.on("character-setted", async(payload) => {
        io.emit('characterSetted', payload)
    });

    client.on("new-game", async(payload) => {
        io.emit('gameNew', payload)
    });

    client.on("start-game", async(payload) => {
        io.emit('gameStart', payload)
    });

    client.on("move-right", async(payload) => {
        io.emit('rightMoved', payload)
    });

    client.on("move-left", async(payload) => {
        io.emit('leftMoved', payload)
    });

    client.on("move-up", async(payload) => {
        io.emit('upMoved', payload)
    });

    client.on("move-down", async(payload) => {
        io.emit('downMoved', payload)
    });

    client.on("move-kick", async(payload) => {
        io.emit('kickMoved', payload)
    });

    client.on("stop-player", async(payload) => {
        io.emit('stopMoved', payload)
    });

    client.on("collide-ball", async(payload) => {
        io.emit('collideBall', payload)
    });
    client.on("stop-ball", async(payload) => {
        io.emit('ballStopped', payload)
    });

    client.on("goal-scored", async(payload) => {
        io.emit('scoredGoal', payload)
    });

});