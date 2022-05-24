
interface Muppet {
    name: string
    twitter: string
    image: string
    followers: number
    tweets: number
}

const data: Muppet[] = [
    { "name": "Kermit the Frog", "twitter": "KermitTheFrog", "image": "/img/Eczv5-Jb_400x400.jpg", "followers": 397600, "tweets": 2270 },
    { "name": "Miss Piggy", "twitter": "MissPiggy", "image": "/img/zn-Qew_4_400x400.jpg", "followers": 250000, "tweets": 2595 },
    { "name": "Fozzie Bear", "twitter": "FozzieBear", "image": "/img/mWN4L0nF_400x400.jpg", "followers": 176500, "tweets": 1581 },
    { "name": "Elmo", "twitter": "elmo", "image": "/img/a_eRlunA_400x400.jpg", "followers": 400700, "tweets": 576 },
    { "name": "Gonzo", "twitter": "GonzotheGreat", "image": "/img/ljWB4vd0_400x400.jpg", "followers": 166900, "tweets": 1627 },
    { "name": "Scooter", "twitter": "GoferScooter", "image": "/img/17RaW44-_400x400.jpg", "followers": 76400, "tweets": 722 },
    { "name": "Rizzo", "twitter": "Rizzo", "image": "/img/oaRvzqJ3_400x400.jpg", "followers": 94600, "tweets": 790 },
    { "name": "Count von Count", "twitter": "CountVonCount", "image": "/img/DzhyYE8d_400x400.jpg", "followers": 219400, "tweets": 3473 },
    { "name": "Oscar the Grouch", "twitter": "OscarTheGrouch", "image": "/img/nhIaXRoF_400x400.jpg", "followers": 299800, "tweets": 161 },
    { "name": "Grover", "twitter": "Grover", "image": "/img/SMRmdbPX_400x400.jpg", "followers": 166200, "tweets": 171 }
];

export type { Muppet };
export default data;