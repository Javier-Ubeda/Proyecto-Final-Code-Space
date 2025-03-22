import { combineReducers } from "redux";
import ReducerDetails from '../../../Components/detailsListComponent/ReducersDetails'


const reducers = combineReducers({
    detail: ReducerDetails,
});

export default reducers