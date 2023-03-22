// import Music from "../../Model/Music";
// import { Spot } from "../../Model/Spot";
// import appReducer from "../../redux/reducers/appReducer";

// describe('test app reducer', () => {

//     let initialState = {
//         spot: [] as Spot[],
//         favoriteMusic: [] as Music[],
//         userCurrentMusic: null
//     }

//     it('should return initial state', () => {
//         expect(appReducer(undefined, {})).toEqual(initialState);
//     });

//     it('should handle ADD_FAVORITE_NOUNOURS', () => {
//         const nounours = new Spot("Chewie", 42, 10000, "https://monuri.png");
//         expect(
//             appReducer(initialState, {
//                 type: 'ADD_FAVORITE_NOUNOURS',
//                 nounours,
//             })
//         ).toEqual({
//             nounours: [],
//             favoriteNounours: [nounours],
//         });
//     });
