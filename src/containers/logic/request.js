// MOCKUP *******************************
let songsMockup = [
    {
        name: "Bittersweet",
        id: "1",
        genre: "R&B",
        author: "Lianne La Havas"
    },
    {
        name: "Marry the Night",
        id: "2",
        genre: "Pop",
        author: "Lady Gaga"
    },
    {
        name: "Star Shopping",
        id: "3",
        genre: "Alternative",
        author: "Lil Peep"
    },
    {
        name: "Telephone",
        id: "4",
        genre: "Pop",
        author: "Lady Gaga"
    }
];
// **************************************

export default function requestAPI(value) {
    let newArr = [];
    // async... await fetch
    for(let obj of songsMockup) {
        for(let prop in obj) {
            const x = obj[prop].toLowerCase();
            const y = value.toLowerCase();
            if(x === y) {
                newArr.push(obj);
            }
            
            continue;
        }
    }
    return newArr;
}