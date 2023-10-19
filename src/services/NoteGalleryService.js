const { Injectable } = require("../common/utils/AppDependency");
const { NoteGalleryRepository } = require("../repositories/NoteGalleryRepository");

class NoteGalleryService {
    /**
     * @private
     * @property {NoteGalleryRepository}
     */
    noteGalleryRepository;
    
    /**
     * @param {NoteGalleryRepository} noteGalleryRepository 
     */
    constructor(noteGalleryRepository) {
        this.noteGalleryRepository = noteGalleryRepository;
    }
}

Injectable(NoteGalleryService)([NoteGalleryRepository]);

module.exports = { NoteGalleryService };