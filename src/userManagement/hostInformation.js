"use strict";
/**
 * Host constructor
 * constructor is called at init of role if role is "Host"
 * @see Role
 */
Object.defineProperty(exports, "__esModule", { value: true });
class HostInformation {
    parties;
    name;
    description;
    collegeAffiliation;
    socialMediaLinks;
    reviews;
    constructor(parties, name, description, collegeAffiliation, socialMediaLinks, reviews) {
        this.parties = parties;
        this.name = name;
        this.description = description;
        this.collegeAffiliation = collegeAffiliation;
        this.socialMediaLinks = socialMediaLinks;
        this.reviews = reviews;
    }
}
exports.default = HostInformation;
