import Music from "../Model/Music";
import { Spot } from "../Model/Spot";

export const cards= [{
  name : "blue",
  sourceUrl : "https://th.bing.com/th/id/R.dbf87f0d8cbfd078ab6a589a5d921994?rik=1%2f6KliMpOAeh8A&pid=ImgRaw&r=0",
  index : 4
},
{
  musicName : "Breathin",
  name : "Ariana Grande",
  sourceUrl : "https://i.ebayimg.com/images/g/rY0AAOSw97djEo2C/s-l500.jpg",
  index : 9
},
{
  musicName : "Zombies",
  name : "gambino",
  sourceUrl : "https://th.bing.com/th/id/R.0b2d1a59bfda9b1a49ecb561e08535a8?rik=Xyc35OZU%2f6VOVw&pid=ImgRaw&r=0",
  index : 3
},
{
  musicName : "Bambina",
  name : "PNL",
  sourceUrl : "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png",
  index : 10
},
{
  musicName : "Freeze Raël",
  name : "Freeze Corleone",
  sourceUrl : "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png",
  index : 23
},
{
  musicName : "Autobahn",
  name : "Sch",
  sourceUrl : "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg",
  index : 44
},
{
  musicName : "Lakehouse",
  name : "Stratos",
  sourceUrl : "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png",
  index : 89
},

]

const spotArray: Spot[] = [
  new Spot("1", new Music("1", "Title 1", "Bio 1", "Image 1", "TrackPreviewUrl 1")),
  new Spot("2", new Music("2", "Title 2", "Bio 2", "Image 2", "TrackPreviewUrl 2")),
  new Spot("3", new Music("3", "Title 3", "Bio 3", "Image 3", "TrackPreviewUrl 3")),
  new Spot("4", new Music("4", "Title 4", "Bio 4", "Image 4", "TrackPreviewUrl 4")),
  new Spot("5", new Music("5", "Title 5", "Bio 5", "Image 5", "TrackPreviewUrl 5")),
];
export const spotArray2: Spot[] = [
  new Spot("1", new Music("6KNw3UKRp3QRsO7Cf4ASVE",
    "MOLLY - A COLORS SHOW",
    "Tame Impala",
    "https://i.scdn.co/image/ab67616d0000b2734299eb40408fc73ce8bf490a",
    "https://p.scdn.co/mp3-preview/4faf99856f15e03a09d50b91006efd3205606866?cid=774b29d4f13844c495f206cafdad9c86")
  ),
  new Spot("2", new Music("5yHoANSze7sGzhn9MUarH3",
    "Passat",
    "Silk Sonic, Bruno Mars, Anderson .Paak",
    "https://i.scdn.co/image/ab67616d0000b273e9df9b5a7df491536c51c922",
    "https://p.scdn.co/mp3-preview/0bb7472026a00790950fc231fe61963ef7cc867b?cid=774b29d4f13844c495f206cafdad9c86")
  ),
  new Spot("3", new Music("7suNqxRED5CrwyZSzYC0nT",
    "Extendo",
    "Kali Uchis",
    "https://i.scdn.co/image/ab67616d0000b273b856464c40a062d1723a21f2",
    "https://p.scdn.co/mp3-preview/5398121f6295965e3c7cad8a6dca5667ba7f4713?cid=774b29d4f13844c495f206cafdad9c86")
  ),
  new Spot("4", new Music("07JqNLmPUJSlcouGQoJlzq",
    "Addiction",
    "Harry Styles",
    "https://i.scdn.co/image/ab67616d0000b2739297f238f237431d56c67460",
    "https://p.scdn.co/mp3-preview/33d12e9e5a3dd3394b1649d515912260b01579dd?cid=774b29d4f13844c495f206cafdad9c86")
  ),
  new Spot("5", new Music("5Ylp75kdffyJSwISRPqEiL",
    "La Vidéo",
    "Harry Styles",
    "https://i.scdn.co/image/ab67616d0000b2738900d48677696015bf325b8b",
    "https://p.scdn.co/mp3-preview/4fff3f8d76a422f42cea39f001836a3d54937fc4?cid=774b29d4f13844c495f206cafdad9c86")
  )
];
