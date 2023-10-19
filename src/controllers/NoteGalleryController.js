const { HttpController } = require("../common/http/HttpController");
const { NoteGalleryService } = require("../services/NoteGalleryService");

class NoteGalleryController extends HttpController {
    /**
     * @private
     * @type {NoteGalleryService}
     */
    noteGalleryService;

    /**
     * @param {import("express").Application} express
     * @param {NoteGalleryService}            noteGalleryService 
     */
    constructor(express, noteGalleryService) {
        super(express)
        this.noteGalleryService = noteGalleryService;
    }

    setRoutes() {}
}

module.exports = { NoteGalleryController };
