import { combineReducers } from "redux";
import ReducerDetails from '../../../Components/detailsListComponent/ReducersDetails'


const reducers = combineReducers({
    games: ReducerDetails,
});

export default reducers