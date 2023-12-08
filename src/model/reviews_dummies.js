const crypto = require('crypto');

// Inserting sample data
db.reviews_co.insertMany([

    // EASTON AVE HALLOWEEN PARTY
    {
        _id: crypto.randomUUID(),
        user_id: "009e2eb3-7579-4f3a-a8b3-f5590b39734b",
        party_id: "b3df52a9-ebd7-4e70-8bdc-b5ec0fab6441",
        review_date: new Date("2023-11-05T00:00:00.000Z"),
        rating: 9,
        review_title: "Unforgettable Halloween Celebration",
        review_text: "The 'Easton Ave Halloween Post Party' was unforgettable! The atmosphere was buzzing with excitement, and the decorations transformed the venue into a true Halloween haunt. Music was on point, with a mix that kept the dance floor alive all night. It was well-organized, especially considering the BYOB policy, which worked out great. Dressing casual meant everyone was comfortable, and it was fantastic to see such creative costumes. Kudos to Phi Kappa for hosting such a successful event - can't wait for the next one!"
    },
    {
        _id: crypto.randomUUID(),
        user_id: "a394d751-68f6-4d89-8eaf-786551c7e0c6",
        party_id: "b3df52a9-ebd7-4e70-8bdc-b5ec0fab6441",
        review_date: new Date("2023-11-05T00:00:00.000Z"),
        rating: 8,
        review_title: 'Spooky Soiree Success',
        review_text: "The 'Easton Ave Halloween Post Party' was a hit! The vibe was electric with festive energy, and the eerie decorations added a layer of authenticity to the Halloween theme. The DJ played a fantastic selection of tracks that kept everyone grooving. The BYOB aspect was handled well, contributing to the merry atmosphere. The casual dress code was a plus, allowing everyone to show off their imaginative costumes comfortably. Hats off to the organizers for such a smooth event. Looking forward to the next bash!"
    },
    {
        _id: crypto.randomUUID(),
        user_id: "d9dd53d0-ac17-4a83-a771-d1e04818f33a",
        party_id: "b3df52a9-ebd7-4e70-8bdc-b5ec0fab6441",
        review_date: new Date("2023-11-05T00:00:00.000Z"),
        rating: 10,
        review_title: 'A Night to Remember',
        review_text: "The 'Easton Ave Halloween Post Party' was absolutely sensational! The atmosphere was charged with thrilling vibes, and the spooky decorations were top-notch, creating an immersive experience. The playlist was a perfect blend of classic and current hits that kept the crowd dancing till dawn. The BYOB policy added to the fun, and the casual dress code was ideal for party-goers to sport their unique costumes. A big shout-out to the hosts for organizing an event that will be talked about for ages. Eagerly awaiting the next celebration!"
    },
    {
        _id: crypto.randomUUID(),
        user_id: "d1e11055-a653-4b17-95d8-cd96c66796b6",
        party_id: "b3df52a9-ebd7-4e70-8bdc-b5ec0fab6441",
        review_date: new Date("2023-11-05T00:00:00.000Z"),
        rating: 4,
        review_title: 'Could Have Been Better',
        review_text: "The 'Easton Ave Halloween Post Party' had great potential with its promising theme, but unfortunately, it didn't live up to the hype. While the decorations were decent, the music selection was lackluster, with the same few songs repeating throughout the night. The venue was overcrowded, making it hard to enjoy the festivities fully. The BYOB concept was more of a hassle than a highlight, leading to some disappointment. I appreciated the effort put into organizing the event but hope for significant improvements next time."
    },
    {
        _id: crypto.randomUUID(),
        user_id: "14d34533-ef7d-4df5-ab53-c559d785f450",
        party_id: "b3df52a9-ebd7-4e70-8bdc-b5ec0fab6441",
        review_date: new Date("2023-11-05T00:00:00.000Z"),
        rating: 9,
        review_title: 'Spooktacular Night',
        review_text: "What a spooktacular event the 'Easton Ave Halloween Post Party' was! Every corner of the venue was thoughtfully decorated, creating a perfect Halloween atmosphere. The music was a fantastic mix of spooky tunes and dance floor anthems, ensuring the party vibe never died down. Kudos for the BYOB setup, it made for some interesting concoctions! The casual dress code really let everyone's creativity shine through their costumes. Definitely a night that set the bar high for Halloween parties!"
    },

    // TECHNO NIGHT
    {
        _id: crypto.randomUUID(),
        user_id: "009e2eb3-7579-4f3a-a8b3-f5590b39734b",
        party_id: "8763852a-bcad-4a9c-8a2b-a962255f2aad",
        review_date: new Date("2023-08-25T12:00:00.000Z"),
        rating: 9,
        review_title: 'Epic Night Out',
        review_text: "Techno Night was an absolute blast! The DJs were on fire, dropping beats that kept us moving all night long. The light show was mesmerizing, creating a truly otherworldly experience. The crowd was electric, and the glow theme brought everyone's outfits to a whole new level. The cash bar was a bit pricey, but overall, the night was unforgettable. Kudos to Beta Gamma for a well-hosted rave!"
    },
    {
        _id: crypto.randomUUID(),
        user_id: "e80634d5-b308-49c3-9675-291cf9a23061",
        party_id: "8763852a-bcad-4a9c-8a2b-a962255f2aad",
        review_date: new Date("2023-08-25T12:00:00.000Z"),
        rating: 8,
        review_title: 'Vibrant and Vivacious',
        review_text: "Last night's Techno Night was a vibrant fest of colors and sounds. The club was decked out in neon, and the music selection was top-tier. It was great to see a mix of techno genres, from classic tracks to the latest hits. The venue was at capacity, creating a true rave vibe. Although it got a bit crowded, the energy was contagious. Definitely a must-attend event for techno lovers!"
    },
    
]);
  
